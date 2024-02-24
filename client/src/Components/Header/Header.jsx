import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserType } from "../../UserContext";
import axios from "axios";
import cart_icon from '../Image/cart_icon.png'


const Header = () => {
  const { user, setUser, token, setToken} = useContext(UserType)
 
  useEffect(() => {
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

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <b>GoodBook</b>
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
                <Link className="nav-link active" to='/'>Trang chủ</Link>
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
            <form className="d-flex" role="search">
              <input
                className="form-control me-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
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
                    <Link to='/giohang' className="nav-link active nav-cart-img"><img src={cart_icon} alt="" /></Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mb-2 ms-auto mb-lg-0">
              <li className="nav-item">
                  <Link  to='/dangnhap' className="nav-link active">Đăng nhập</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link active" to='/dangky'>Đăng ký</Link>
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
