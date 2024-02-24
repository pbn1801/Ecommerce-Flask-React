import React, { useContext, useState } from "react";
import './SignupPage.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserType } from "../../UserContext";


const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOverlay, setShowOverlay] = useState(true);
  const { setToken } = useContext(UserType)

  const navigate = useNavigate()

  const handleCreateAccout = () => {
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      alert("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match.");
    } else {
      axios.post('http://127.0.0.1:5000/dangky', {
        name: name,
        email: email,
        password: password
      })
      .then((response) => {
        const token = response.data.token
        sessionStorage.setItem("authToken", token)
        setToken(token)
        navigate('/')
      })
      .catch((error) => {
        console.log(error, "error");
        if (error.response && error.response.status === 409) {
          console.log(error.response.data)
          alert("Email already exists.");
        }
        if (error.response.status === 400) {
          alert("Ivalid email")
        }
      });
    }
  }
  const handleOverlayClick = () => {
    setShowOverlay(false);
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {showOverlay && (
      <div className="container d-flex align-items-center justify-content-center" onClick={handleOverlayClick}>
      <div className="overlay">
        <div className="signup-form" onClick={handleFormClick}>
          <h2>Đăng ký</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword2">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary btnSignUp" onClick={handleCreateAccout}>
              Create account
            </button>
            <div className="signin-nav">
              <p>Don'have an account? <Link className="signIn-text" to='/dangnhap'>Signin</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default SignupPage;

