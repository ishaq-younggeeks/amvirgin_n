import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

class Header extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Amvirgin | Shop</title>
        </Helmet>
        <nav
          className="navbar navbar-expand-lg navclass specific videohead"
          id="navbar"
        >
          <Link className="navbar-brand" to="/shop">
            <img
              className="logoheader"
              src={process.env.PUBLIC_URL + "/img/logo.png"}
              alt="amvirgin"
              id="logo"
            />
          </Link>
          <button className="mobbtn">
            <span className="mobicon" onClick="openNav()">
              <img
                className="mobmenuicon"
                src={process.env.PUBLIC_URL + "/img/mobmenu.png"}
                alt="menu"
              />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Sign In
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="#">
                  Chatmate
                </Link>
              </li> */}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item upp2">
                <div className="nav-item searchbtn">
                  <div className="container">
                    <form className="searchbox" method="post">
                      <input
                        type="search"
                        placeholder="Search......"
                        name="search"
                        className="searchbox-input"
                        onkeyup="buttonUp();"
                      />
                      <span className="searchbox-icon">
                        <i className="fa fa-search"></i>
                      </span>
                    </form>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop/cart">
                  <img
                    className="cart upp2"
                    src={process.env.PUBLIC_URL + "/img/cart.png"}
                    alt=""
                  />
                </Link>
              </li>
              <Link className="nav-link" to="/login">
                <li className="nav-item">
                  <img
                    className="userimage upp2"
                    src={process.env.PUBLIC_URL + "/img/user.png"}
                    alt=""
                  />
                  Sign in
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
