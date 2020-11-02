import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registration } from "../sellerAuthAction";

import Logo from "../../assets/logo.png";

import "./Registration.css";

class Registration extends Component {
  state = {
    redirect: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    otp: "",
    error: "",
    passwordHidden: true,
    confirmPasswordHidden: true
  };

  handleRedirect = e => {
    this.setState({
      redirect: !this.state.redirect
    });
  };

  hiddenPasswordHandler = () => {
    this.setState({
      passwordHidden: !this.state.passwordHidden
    });
  };

  confirmHiddenPasswordHandler = () => {
    this.setState({
      confirmPasswordHidden: !this.state.confirmPasswordHidden
    });
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      return this.setState({
        error: "Passwords do not match"
      });
    } else {
      this.setState({
        error: ""
      });
    }
    let phoneNumber = parseInt(this.state.phoneNumber, 10);
    let otp = parseInt(this.state.otp, 10);
    const registrationData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phoneNumber,
      otp
    };
    this.props.registration(registrationData);
    if (this.props.registrationError === "") {
      this.setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        otp: ""
      });
    }
  };

  render() {
    const { registrationError, currentUser } = this.props;
    const token = localStorage.getItem("token");
    if (currentUser && token) {
      return <Redirect to="/seller/dashboard" />;
    }
    if (this.state.redirect) return <Redirect to="/seller/login" />;
    return (
      <section className="signup-page">
        <div className="signup-box">
          <div className="logo">
            <a href="#0">
              <img src={Logo} alt="Logo" />
            </a>
          </div>
          <div className="card" style={{background:'#0000007a!important'}}>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="sellerName" style={{ color: "#fff" }}>
                  Seller Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sellerName"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" style={{ color: "#fff" }}>
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleOnChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="phone" style={{ color: "#fff" }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.handleOnChange}
                />
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
                  value={this.state.password}
                  onChange={this.handleOnChange}
                  maxLength="13"
                />
                {this.state.passwordHidden ? (
                  <span onClick={this.hiddenPasswordHandler}>
                    <i class="far fa-eye-slash pwdeye"></i>
                  </span>
                ) : (
                  <span onClick={this.hiddenPasswordHandler}>
                    <i class="far fa-eye pwdeye"></i>
                  </span>
                )}
              </div>
              <div className="form-group pwdgroup2">
                <label htmlFor="confirmPassword" style={{ color: "#fff" }}>
                  Confirm Password
                </label>
                <input
                  type={this.state.confirmPasswordHidden ? "password" : "text"}
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleOnChange}
                />
                {this.state.confirmPasswordHidden ? (
                  <span onClick={this.confirmHiddenPasswordHandler}>
                    <i class="far fa-eye-slash pwdeye2"></i>
                  </span>
                ) : (
                  <span onClick={this.confirmHiddenPasswordHandler}>
                    <i class="far fa-eye pwdeye2"></i>
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="otp" style={{ color: "#fff" }}>
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  placeholder="Enter OTP"
                  name="otp"
                  value={this.state.otp}
                  onChange={this.handleOnChange}
                />
              </div>
              <button className="btn btn-block" type="submit">
                SIGN UP
              </button>
            </form>
            <br />
            <div className="error">
              {registrationError ? <p> {registrationError}</p> : null}
              {this.state.error ? <p>{this.state.error}</p> : null}
            </div>
            <p>
              By registering on the AmVirgin Seller Web App, We consider that
              you are fine with all the{" "}
              <span style={{ color: "red" }}>terms & conditions </span>
              mentioned on our website.
            </p>
            <button className="btn btn-block" onClick={this.handleRedirect}>
              Login
            </button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    registrationError: state.sellerAuth.registrationError,
    currentUser: state.sellerAuth.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registration: creds => dispatch(registration(creds))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
