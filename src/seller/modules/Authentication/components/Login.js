import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../sellerAuthAction";

import Logo from "../../assets/logo.png";

import "./Login.css";

class Login extends Component {
  state = {
    redirect: false,
    email: "",
    password: "",
    passwordHidden: true,
    emailError: "",
    passwordError: ""
  };

  handleRedirect = (e) => {
    this.setState({
      redirect: !this.state.redirect,
    });
  };
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    let emailError = "";
    let passwordError = "";
    
    if(!this.state.email.trim()){
      emailError = "Email cannot be blank";
    }
    else if(!/\S+@\S+\.\S+/.test(this.state.email)){
      emailError = "Invalid Email";
    }

    if(!this.state.password.trim()){
      passwordError = "Password cannot be blank";
    }

    if(emailError || passwordError){
      this.setState({
        emailError,
        passwordError
      });
      return false
    }

    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let isValid = this.validate();
    console.log("isValid", isValid)
    if(isValid){
    let creds = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(creds);
    this.setState({
      email: "",
      password: "",
      emailError: "",
      passwordError: ""
    });
  }
  };

  hiddenPasswordHandler = () => {
    this.setState({
      passwordHidden: !this.state.passwordHidden,
    });
  };


  render() {
    const { loginError, currentUser } = this.props;
    console.log("loginError", loginError);
    const token = localStorage.getItem("token");
    if (currentUser && token) {
      return <Redirect to="/seller/dashboard" />;
    }
    if (this.state.redirect) return <Redirect to="/seller/registration" />;
    return (
      <section className="login-page">
        <div className="login-box">
          <div className="logo">
            <a href="#0">
              <img src={Logo} alt="Logo" />
            </a>
          </div>
          <div
            className="card"
            style={{ backgroundColor: "#0000007a!important" }}
          >
            <h3 style={{ color: "#fff" }}>Seller Login</h3>
            <form noValidate onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" style={{ color: "#fff" }}>
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  required="true"
                  value={this.state.email}
                  onChange={this.handleOnChange}
                />
                <div className="error">
                <p>{this.state.emailError}</p>
                </div>
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group pwdgroup">
                <label htmlFor="password" style={{ color: "#fff" }}>
                  Password
                </label>
                <input
                  type={this.state.passwordHidden ? "password" : "text"}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  required="true"
                  minLength="6"
                  maxLength="20"
                  value={this.state.password}
                  onChange={this.handleOnChange}
                />
                <div className="error">
                <p>{this.state.passwordError}</p>
                </div>
                {this.state.passwordHidden ? (
                  <span onClick={this.hiddenPasswordHandler}>
                    <i className="far fa-eye-slash pwdeye"></i>
                  </span>
                ) : (
                  <span onClick={this.hiddenPasswordHandler}>
                    <i className="far fa-eye pwdeye"></i>
                  </span>
                )}
              </div>
              <div className="error">
                {loginError ? <p> {loginError}</p> : null}
                {!currentUser && !token && <p>Please Enter details to Login</p>}
              </div>
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </form>
            <br />
            <button className="btn btn-block" onClick={this.handleRedirect}>
              Registration
            </button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginError: state.sellerAuth.loginError,
    currentUser: state.sellerAuth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (creds) => dispatch(login(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
