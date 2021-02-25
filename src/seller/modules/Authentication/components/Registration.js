import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registration } from "../sellerAuthAction";
import Modal from 'react-modal';
import Logo from "../../assets/logo.png";
import {sendSellerOtp} from "../../../../seller/modules/Authentication/sellerAuthAction"
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
    confirmPasswordHidden: true,
    nameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    cpasswordError: "",
    otpError: "",
    modalIsOpen: false
  };

  handleOTPChangeRegister = event => {
    this.setState({
        otp: event.target.value
    })
}


  handleRedirect = (e) => {
    this.setState({
      redirect: !this.state.redirect,
    });
  };

  hiddenPasswordHandler = () => {
    this.setState({
      passwordHidden: !this.state.passwordHidden,
    });
  };

  confirmHiddenPasswordHandler = () => {
    this.setState({
      confirmPasswordHidden: !this.state.confirmPasswordHidden,
    });
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  openModal = () => {
    console.log("Calling Open");
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal = () => {
    console.log("Calling Close");
    this.setState({
      modalIsOpen: false
    });
  }

  customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
};


  validate = () => { 
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let passwordError = "";
    let cpasswordError = "";
    let otpError = "";

    if (!this.state.name.trim()) {
      nameError = "Name cannot be blank";
    }

    if (!this.state.email.trim()) {
      emailError = "Email cannot be blank";
    } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      emailError = "Invalid Email";
    }

    if (!this.state.phoneNumber.trim()) {
      phoneError = "Phone Number cannot be blank";
    }
    else if (!/^[0-9]{10}$/.test(this.state.phoneNumber)) {
      phoneError = "Invalid Phone Number";
    }

    if (!this.state.password.trim()) {
      passwordError = "Password cannot be blank";
    }

    if(!this.state.confirmPassword.trim()){
      cpasswordError = "Confirm Password cannot be blank";
    }
    else if (this.state.password !== this.state.confirmPassword) {
      cpasswordError = "Passwords do not match";
    }

    if(nameError || emailError || phoneError || passwordError || cpasswordError){
      this.setState({
        nameError,
        emailError,
        phoneError,
        passwordError,
        cpasswordError,
      });
      return false
    }

    return true;
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let isValid = this.validate();
    if (isValid) {
      if (this.state.password !== this.state.confirmPassword) {
        return this.setState({
          error: "Passwords do not match",
        });
      } else {
        this.setState({
          error: "",
        });
      }

      let phoneNumber = parseInt(this.state.phoneNumber, 10);
      this.props.sendSellerOtp(phoneNumber);
      // let otp = parseInt(this.state.otp, 10);
      // const registrationData = {
      //   name: this.state.name,
      //   email: this.state.email,
      //   password: this.state.password,
      //   phoneNumber,
      //   otp,
      // };

      // this.props.registration(registrationData);
      // if (this.props.registrationError === "") {
      //   this.setState({
      //     name: "",
      //     email: "",
      //     password: "",
      //     confirmPassword: "",
      //     phoneNumber: "",
      //     otp: "",
      //     phoneError: "",
      //   });
      // }
    }
  };

  handleOtpSubmit = (e) => {
    e.preventDefault();
    let phoneNumber = parseInt(this.state.phoneNumber, 10);
     let otp = parseInt(this.state.otp, 10);
      const registrationData = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        phoneNumber,
        otp,
      };

      this.props.registration(registrationData);
      if (this.props.registrationError === "") {
        this.setState({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          otp: "",
          phoneError: "",
        });
      }
  }

  render() {
    const { registrationError, currentUser, otpmodel, otpError } = this.props;
    console.log("Register :", otpmodel, registrationError, currentUser, otpError);
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
          <div className="card" style={{ background: "#0000007a!important" }}>
            <form noValidate onSubmit={this.handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="sellerName" style={{ color: "#fff" }}>
                  Seller Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sellerName"
                  placeholder="Name"
                  required="true"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleOnChange}
                />
                <div className="error">
                  <p>{this.state.nameError}</p>
                </div>
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
                  required="true"
                  maxLength="10"
                  value={this.state.phoneNumber}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="error">
              <p>{this.state.phoneError}</p>
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
                  value={this.state.password}
                  onChange={this.handleOnChange}
                  minLength="6"
                  maxLength="20"
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
              <div className="error">
              <p>{this.state.passwordError}</p>
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
                  required="true"
                  value={this.state.confirmPassword}
                  onChange={this.handleOnChange}
                  minLength="6"
                  maxLength="20"
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
              <div className="error">
              <p>{this.state.cpasswordError}</p>
              </div>
              {/* <div className="form-group">
                <label htmlFor="otp" style={{ color: "#fff" }}>
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  placeholder="Enter OTP"
                  name="otp"
                  required="true"
                  value={this.state.otp}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="error">
              <p>{this.state.otpError}</p>
              </div> */}
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
        <Modal
                isOpen={otpmodel && this.openModal}
                onRequestClose={this.closeModal}
                style={this.customStyles}
                ariaHideApp={false}
                >
                <h4 style={{color:"#ce3838"}}>Please Enter OTP :</h4>
                <hr style={{color:"#ce3838", borderColor:"#ce3838"}}/>
                <form onSubmit={this.handleOtpSubmit}>    
                <input type="text" placeholder="OTP" autoFocus onChange={(e) => this.setState({otp: e.target.value}) } value={this.state.otp} required/>
                <button style={{padding:"5px 25px 5px 25px", backgroundColor:"#ce3838", color:"white", borderRadius:"5px", border:"none", marginTop:"30px"}} type="submit">Submit</button>
                {/* {registering && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                } */}
                {/* { success ? success : null} */}
                </form>
                {registrationError ? registrationError : ''}     
                {otpError ? otpError : ''}         
                </Modal>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    registrationError: state.sellerAuth.registrationError,
    currentUser: state.sellerAuth.currentUser,
    otpmodel: state.sellerAuth.otpModel,
    otpError: state.sellerAuth.otpError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registration: (creds) => dispatch(registration(creds)),
    sendSellerOtp: num => dispatch(sendSellerOtp(num)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
