import React, { useContext, useState } from 'react'
import './SigninPage.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserType } from '../../UserContext'

const SigninPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const {setToken} = useContext(UserType)
  const [showOverlay, setShowOverlay] = useState(true);

  const navigate = useNavigate()

  const handleSignIn = () => {
    if(email === ''){
      alert("Email cannot be blank!")
    }
    else if(password === ''){
      alert("Password cannot be blank!")
    }
    else{
      const user = {
        email: email,
        password: password
      }
      axios.post('http://127.0.0.1:5000/dangnhap', user)
      .then((response) => {
        const token = response.data.token
        sessionStorage.setItem("authToken", token);
        setToken(token)
        navigate('/')
      })
      .catch(function(error)  {
        console.log(error, "error");
        if (error.response.status === 401) {
          alert("Invalid information!")
        }
      })
    }
  }

  const handleOverlayClick = () => {
    setShowOverlay(false);
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };


  return (
    <div>
      {showOverlay && (
        <div className="container d-flex align-items-center justify-content-center" onClick={handleOverlayClick}>
        <div className="overlay">
          <div className="signin-form" onClick={handleFormClick}>
            <h2>Đăng nhập</h2>
            <form>
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
              <div className="forgot-passowrd">
                <a href="#" style={{ textDecoration: 'none' }}>Forgot password?</a>
              </div>
              <button type="button" className="btn btn-primary btnSingIn" onClick={handleSignIn}>
                Sign in
              </button>
              <div className="signup-nav">
                <p>Don'have an account? <Link className='signup' to='/dangky'>Signup</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default SigninPage