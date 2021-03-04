import React, { Component } from "react";
import $ from 'jquery';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../actions";
import LoginWithSocial from './LoginWithSocial';
import Modal from 'react-modal';
import Loader from "react-loader-spinner";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        otp: '',
        submitted: false,
        loginBtn:false,
        modalIsOpen: false,
        modalIsOpen1: false,
        changePassword: '',
    };
}

  togglePassword = () => {
      $(".toggle-password").toggleClass("fa-eye fa-eye-slash");
      var input = $($(".toggle-password").attr("toggle"));
      if (input.attr("type") === "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
  }

  flip(){
      document.querySelector("#flipper").classList.toggle("flip");
  }

  handleForOtp = () => {
    this.props.clearState({
      loginResponse:{}
    })
    this.setState({loginBtn:!this.state.loginBtn})
  }

  handleChange = e => {
    const { name, value } = e.target;
  this.setState({ [name]: value });
  };

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

  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  }

  openModal1 = () => {
    this.setState({
      modalIsOpen1: true,
    });
  }

  closeModal1 = () => {
    this.setState({
      modalIsOpen1: false,
    });
  }

  handleOTPChange = event => {
    this.setState({
        otp: event.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      changePassword: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password, otp } = this.state;
    console.log("state :", username, password, otp);
    if(username && password || otp){
      if(this.state.loginBtn===false){
        console.log("Logging Button False!")
        if(!isNaN(username)){ 
          localStorage.setItem("username", username.trim())
          this.props.login({ type:2, mobile: username.trim(), password:password.trim() })
      }else if(isNaN(username)){
          this.props.login({ type:1, email: username.trim().toLowerCase(), password:password.trim() })
      }
    }
    else if(this.state.loginBtn===true){
      console.log("Logging Button True!")
      console.log(isNaN(username))
      if(!isNaN(username)){
          console.log("Inside Logging Button True Username", username)
          localStorage.setItem("username", username.trim())
          this.props.sendOtp(username.trim(),"login")
          // this.setState({modalIsOpen: true})
      }
    }
    }
  };

  handleOtpSubmitLogin = (e) => {

    console.log("working on click")
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, otp } = this.state;
    if(this.state.loginBtn===true){
      console.log("Logging Button True!")
      console.log(isNaN(username))
      if(!isNaN(username)){
          console.log("Inside Logging Button True Username", username)
          localStorage.setItem("username", username.trim())
          this.props.login({ type:3, mobile: username.trim(), otp:otp.trim() })
      }
    }
  }

  handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    let registered = this.state.changePassword;
    console.log(registered);
    if(!isNaN(registered)){ 
    this.props.forgotPwd("mobile", this.state.changePassword);
    }
    else 
    this.props.forgotPwd("email", this.state.changePassword);
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.loggedIn!==this.props.loggedIn){
    this.forceUpdate();
    }

    if(prevProps.otpModal!==this.props.otpModal){
      this.setState({modalIsOpen:this.props.otpModal})
    }
  }

  render() {
    const { notRegister, loggingIn, otpmodel,loggedIn, wrongOTP, forgotPwdRes,loginResponse } = this.props;
    const { username, password, submitted } = this.state;
    console.log("Forgot Password Res :", this.props)
    const loginWithOtp = (
      <div>
          <button type="button" className="changeBtn" size="large">Login With OTP</button>
      </div>
      )
      const loginWithPwd = (
          <div>
              <button type="button" className="changeBtn" size="large">Login With Password</button>
          </div>
      )
      if(loggedIn){
        return <Redirect to="/"/>
      }
        return (
          <div className="front">
            <div className="halfleft"><h6 className="title">Sign in</h6></div>
            <div className="halfleft">
                <Link className="flipbutton halfright" id="loginButton" to="#" onClick={this.flip.bind(this)}>Register →</Link>
            </div>
            <form className="loginsignupform">
                <LoginWithSocial loginWithSocial={this.props.loginWithSocial}/>
                <hr className="hrsign" />
                <h4 className="signwith">or sign in with</h4>
    
                <div style={{width: '43%',marginBottom: '30px',marginLeft: '65px'}} onClick={() => this.handleForOtp()}>
                    {this.state.loginBtn  ? loginWithPwd : loginWithOtp}
                </div>
    
                <div className="input-field">
                    <input type="text" name="username" value={this.state.username} id="emailorname" onChange={this.handleChange} required/>
                    <label htmlFor="emailorname">{this.state.loginBtn ? "Mobile Number" : "Email or Mobile Number"} *</label>
                    {submitted && !username &&
                      <div className="alert error alert-danger">{this.state.loginBtn ? "Mobile is required" : "Email or Mobile is required"} *</div>
                  }
                </div>
                
                <div className="input-field" style={{display: this.state.loginBtn ? 'none' : 'block' }}>
                    <input type="password"name="password" value={this.state.password}  id="password-field" onChange={this.handleChange} required/>
                    <label htmlFor="password-field">Password *</label>
                    <span toggle="#password-field" className="fa fa-fw fa-eye-slash field-icon toggle-password" onClick={this.togglePassword}></span>
                    {submitted && !password &&
                        <div className="alert error alert-danger">Password is required</div>
                    }
                </div>
                <Modal
                isOpen={this.state.modalIsOpen}
                style={this.customStyles}
                ariaHideApp={false}
                >
                <h4 style={{color:"#ce3838"}}>Please Enter OTP 2 :</h4>
                <hr style={{color:"#ce3838", borderColor:"#ce3838"}}/>
                <form onSubmit={this.handleOtpSubmitLogin}>    
                <input type="number" placeholder="OTP" autoFocus onChange={this.handleOTPChange} value={this.state.otp} required maxLength="4"/>
                <button style={{padding:"5px 25px 5px 25px", backgroundColor:"#ce3838", color:"white", borderRadius:"5px", border:"none", marginTop:"30px"}} type="submit">Submit</button>
                </form>
                {wrongOTP ? <p style={{color:"#ce3838"}}>{wrongOTP}</p> : null}
                </Modal>

                <Modal
                isOpen={this.state.modalIsOpen1}
                onRequestClose={this.closeModal1}
                style={this.customStyles}
                ariaHideApp={false}
                >
                <h4 style={{color:"#ce3838"}}>Please Enter Registered Mobile / Email :</h4>
                <hr style={{color:"#ce3838", borderColor:"#ce3838"}}/>
                <form onSubmit={this.handlePasswordChangeSubmit}>    
                <input type="text" placeholder="Registered Mobile / Email" autoFocus onChange={this.handlePasswordChange} value={this.state.changePassword} required/>
                <button style={{padding:"5px 25px 5px 25px", backgroundColor:"#ce3838", color:"white", borderRadius:"5px", border:"none", marginTop:"30px"}} type="submit">Submit</button>
                </form>
                {notRegister ? <p style={{color:"#ce3838"}}>{notRegister}</p> : null}
                {forgotPwdRes ? <p style={{color: "#ce3838"}}>{forgotPwdRes}</p> : null}
                </Modal>
                    <a href="#" onClick={this.openModal1}><p className="forgotpwd">Forgot Password?</p></a>
                <button  className="signinbtn submitbutton"  onClick={this.handleSubmit} disabled={loggingIn}>
                  sign in
                  <span className="loaderwithbutton">{loggingIn &&
                   <Loader
                   type="ThreeDots"
                   color="#00BFFF"
                   height={20}
                   width={30}
                   /> 
                }</span>
                  </button>
               {loginResponse?<p style={{color:"red"}}>{loginResponse.message}</p> : null}
                {notRegister ? <p style={{color:"white"}}>{notRegister}</p> : null}
            </form>
        </div>
        );
      }

}

const mapStateToProps = state => {

  const { notRegister,loggingIn, wrongOTP, forgotPwdRes,loginResponse,otpModal} = state.LoginReducer;
  const {loggedIn} = state.authReducer
  console.log("etfewte",state.LoginReducer)
  return { notRegister,loggingIn,loggedIn, wrongOTP, forgotPwdRes,loginResponse,otpModal };
}
const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(userActions.login(creds)),
    loginWithSocial:(params) => dispatch(userActions.loginWithSocial(params)),
    sendOtp: (num,type) => dispatch(userActions.sendOtp(num,type)),
    forgotPwd: (type, reg) => dispatch(userActions.forgotPwd(type, reg)),
    clearState:(state) => dispatch(userActions.clearState(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
