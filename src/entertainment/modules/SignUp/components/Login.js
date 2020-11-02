import React, { Component } from "react";
import $ from 'jquery';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../actions";
import LoginWithSocial from './LoginWithSocial';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        submitted: false,
        loginBtn:false,
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
    this.setState({loginBtn:!this.state.loginBtn})
  }


  handleChange = e => {
    const { name, value } = e.target;
  this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password, otp } = this.state;
    if(username && password || otp){
      if(this.state.loginBtn===false){
        if(!isNaN(username)){ 
          localStorage.setItem("username", username.trim())
          this.props.login({ type:2, mobile: username.trim(), password:password.trim() })
      }else if(isNaN(username)){
          this.props.login({ type:1, email: username.trim().toLowerCase(), password:password.trim() })
      }
    }
    else if(this.state.loginBtn===true){
      if(!isNaN(username)){
          localStorage.setItem("username", username.trim())
          this.props.login({ type:3, mobile: username.trim(), otp:otp.trim() })
      }
    }
    }
  };

  componentDidUpdate(prevProps,prevState){
    if(prevProps.loggedIn!==this.props.loggedIn){
    this.forceUpdate();
    }
  }

  render() {
    const { notRegister, loggingIn } = this.props;
    const { username, password, submitted } = this.state;
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
      if(!this.props.loggedIn){ 
        return (
          <div className="front">
            <div className="halfleft"><h6 className="title">Sign in</h6></div>
            <div className="halfleft">
                <Link className="flipbutton halfright" id="loginButton" to="#" onClick={this.flip.bind(this)}>Register →</Link>
            </div>
            <form className="loginsignupform">
                <LoginWithSocial />
                <hr className="hrsign" />
                <h4 className="signwith">or sign in with</h4>
    
                <div style={{width: '43%',marginBottom: '30px',marginLeft: '65px'}} onClick={() => this.handleForOtp()}>
                    {this.state.loginBtn  ? loginWithPwd : loginWithOtp}
                </div>
    
                <div className="input-field">
                    <input type="text" name="username" value={this.state.username} id="emailorname" onChange={this.handleChange} required/>
                    <label htmlFor="emailorname">{this.state.loginBtn ? "Mobile Number" : "Email or Mobile Number"} *</label>
                    {submitted && !username &&
                      <div className="alert error alert-danger">Email or Mobile is required</div>
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
            
                <div className="input-field" style={{display: this.state.loginBtn ? 'block' : 'none' }}>
                    <input type="text" ref="otp" id="otp-field"  />
                    <label htmlFor="otp-field">OTP *</label>
                </div>
                
                {/* <input type="checkbox" className="checkcheck" name="termscondition" value=""/>
                    <span className="agreeinput"> I understand and agree to the 
                        <Link to="!#">Terms & Conditions</Link> and 
                        <Link to="!#">Private Policy</Link>
                    </span><br /> */}
                    <Link to="!#" className="forgotpwd">Forgot Password? </Link>
                <input type="button" className="signinbtn" value="Sign in" onClick={this.handleSubmit}/>
                {loggingIn &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                {notRegister ? notRegister : null}
            </form>
        </div>
        ); 
      }
      else{
        return <Redirect to="/" />
    }
  }
}

const mapStateToProps = state => {
  const { notRegister,loggingIn,loggedIn  } = state.LoginReducer;
  return { notRegister,loggingIn,loggedIn };
}
const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(userActions.login(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
