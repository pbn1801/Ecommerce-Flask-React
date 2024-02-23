import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserType } from "../../UserContext";
import axios from "axios";


const Header = ({ onSearch }) => {
  const { user, setUser, token, setToken} = useContext(UserType)
  const [searchTerm, setSearchTerm] = useState('');

 
  useEffect(() => {
    console.log(token)
    if (token) {   
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:5000/user', {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          })
          setUser(response.data)
        } catch (error) {
          console.log("Error fetching user info: ", error);
        }
      }
      fetchUser()
    }
  }, [token])

  const handleLogout = () => {
    sessionStorage.removeItem("authToken")
    setToken(null)
    setUser(null)
  }

  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm)
    // console.log(searchTerm);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Wikipedia_logo_Book_of_Records.svg/864px-Wikipedia_logo_Book_of_Records.svg.png" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 me-2">
              <li className="nav-item">
                <Link className="nav-link active" to='/'>
                  <i className="fa-solid fa-house"></i>
                  <span>Trang chủ</span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Danh mục sản phẩm
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Sách tiếng Việt
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sách tư duy 
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sách doanh nhân
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sách kỹ năng làm việc
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form onSubmit={handleSubmit} className="d-flex" role="search">
              <input
                className="form-control me-1 header-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            {user ? (
                <ul className="navbar-nav mb-2 ms-auto mb-lg-0">
                <li className="nav-item">
                    <Link  to='' className="nav-link active">{user.name}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to='' onClick={handleLogout}>Đăng xuất</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Giỏ hàng
                  </a>
                </li>
              </ul>
            ) : (
            <ul className="navbar-nav mb-2 ms-auto mb-lg-0 logInOut">
              <li className="nav-item">
                  <Link  to='/dangnhap' className="nav-link active login">Đăng nhập</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link active logout" to='/dangky'>Đăng ký</Link>
              </li>
            </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
