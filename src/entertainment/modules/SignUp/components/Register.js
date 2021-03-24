import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import LoginWithSocial from './LoginWithSocial';
import cookie from 'react-cookies';
import { connect } from "react-redux";
import { userActions } from "../../../actions";
import Modal from 'react-modal';
import "./style.css";
import Loader from "react-loader-spinner";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                mobile: "",
                otp:'',
                checkbox: false,
                modalIsOpen: false
            },
            submitted: false
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.otpmodel !== this.props.otpmodel){
            this.setState({
                modalIsOpen: this.props.otpmodel
            })
        }
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
    resendotp = () => {
        const { numb } = this.refs;
        this.props.ResendOtp({
            "phone": numb.value,
        });
    }
    removeotp = () => {
        this.props.otphide()
    }
    otpverify = (e) => {
        e.preventDefault();
        var otp = this.state.otp;
        this.props.OtpVerify(otp );
    }
    
    handleOTPChangeRegister = event => {
        if(event.target.value.length <= 4)
        this.setState({
            otp: event.target.value
        })
    }

    onChange = (e) => {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        if(name==="mobile"){
            this.setState({mobile:`${value}`})
        }
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

    handleRegisterSubmit = (e) => {
        e.preventDefault();
        this.setState({submitted: !this.state.submitted});
        const user = { 
            name:this.state.user.name,
            email:this.state.user.email,
            password:this.state.user.password,
            password_confirmation:this.state.user.password_confirmation,
            mobile:this.state.mobile,
            otp:parseInt(this.state.otp),
            checkbox:this.state.checkbox
        };

        if(user.password === user.password_confirmation && this.state.checkbox === true){
            if(user.name && user.password && user.email && user.checkbox && user.mobile && user.mobile.length === 10 && (/\S+@\S+\.\S+/.test(user.email))){
                console.log("Calling");
                let num = this.state.mobile
                this.props.sendOtp(num)
            }
        }
    }

    handleOtpSubmit = (e) => {
        e.preventDefault();
        this.setState({submitted: !this.state.submitted});
        const user = { 
            name:this.state.user.name,
            email:this.state.user.email,
            password:this.state.user.password,
            password_confirmation:this.state.user.password_confirmation,
            mobile:this.state.mobile,
            otp:this.state.otp,
            checkbox:this.state.checkbox
        };
        if(user.password === user.password_confirmation && this.state.checkbox === true){
            if(user.name && user.password && user.email && user.checkbox && user.mobile && user.mobile.length === 10 && user.otp.length === 4){
                this.props.register(user);
                this.setState({
                    user:{}
                })
            }
        }
    }

    handleChangeCheckbox = (e) => {
        if(e.target.checked)
        this.setState({
            checkbox: true
        })
        else {
            this.setState({
                checkbox: false
            })
        }
    }

    render(){
        const { success, registering, failure, otpmodel, submittingOtp } = this.props;
        const { user, submitted } = this.state;
        return(
            <div className="back">
                <div className="halfleft"><h6 className="title">Register</h6></div>
                <div className="halfleft">
                    <Link className="flipbutton halfright" id="registerButton" onClick={this.flip.bind(this)} to="#">Sign in →</Link>
                </div>
                <form className="loginsignupform">
                    <LoginWithSocial loginWithSocial={this.props.loginWithSocial}/>
                    <hr className="hrsign" />
                    <h4 className="signwith">or Register with</h4>
                    <div className="input-field">
                        <input type="text" name="name" value={this.state.name} onChange={this.onChange} id="fullname" required />
                        <label htmlFor="fullname">Full Name *</label>
                        {submitted && !user.name &&
                            <div className="alert error alert-danger">Name is required</div>
                        }
                    </div>
                    <div className="input-field">
                        <input type="email" name="email" value={this.state.email} onChange={this.onChange} id="email" required/>
                        <label htmlFor="email">Email *</label>
                        {submitted && !user.email ?
                            <div className="alert error alert-danger">Email is required</div> : submitted && (!/\S+@\S+\.\S+/.test(user.email)) ? <div className="alert error alert-danger">Invalid Email</div> : null
                        }
                    </div>
                    <div className="input-field">
                        <input type="number" name="mobile" min="0" value={this.state.mobile} onChange={this.onChange} id="number" required/>
                        <label htmlFor="number">Mobile Number *</label>
                        {submitted && !user.mobile ?
                            <div className="alert error alert-danger">Mobile is required</div> : submitted && (user.mobile.length !== 10) ? <div className="alert error alert-danger">Mobile number must be of 10 digits</div> : null 
                        }
                    </div>
                    <div className="input-field">
                    <PasswordField toggle="#password-field2" htmlFor="password-field2" name="password" value={this.state.password} onChange={this.onChange} id="password-field2" eye_name="current_password" text="Password *"/>
                        {submitted && !user.password &&
                            <div className="alert error alert-danger">Password is required</div>
                        }
                    </div>
                    <div className="input-field">
                    <PasswordField toggle="#password" htmlFor="confirm_password-field2" name="password_confirmation" value={this.state.password} onChange={this.onChange} id="confirm_password-field2" eye_name="confirm_password" text="Confirm Password *"/>
                        {submitted && !user.password_confirmation ?
                            <div className="alert error alert-danger">Confirm Password is required</div> : submitted && user.password_confirmation != user.password ?  <div className="alert error alert-danger">Password do not match</div> :null
                        }
                    </div>
                    <input type="checkbox" name="checkbox" className="checkcheck" onClick={this.handleChangeCheckbox} value={this.state.checkbox}/>
                    <span className="agreeinput"> I understand and agree to the 
                        <Link to="!#"> Terms & Conditions</Link> and 
                        <Link to="!#"> Private Policy</Link>
                    {submitted && !this.state.checkbox &&
                        <div style={{color:"#ce3838"}}>Checkbox is required</div>
                    }
                    </span><br />
                    <div style={{ clear: 'both' }}></div>
                    <button className="signinbtn submitbutton" onClick={(e) => this.handleRegisterSubmit(e)} disabled={registering}>Register
                    <span className="loaderwithbutton">{registering &&
                   <Loader
                   type="ThreeDots"
                   color="#00BFFF"
                   height={20}
                   width={30}
                   timeout={5000}
                   /> 
                }</span>
                </button>
                    {success ? <p style={{color:"green"}}>{success}</p> : null}
                </form>

                <div className="modal fade in" role="dialog" style={{ display: this.props.signuploader ? "block" : "none" }}>
                    <div className="modal-dialog loader-modal" >
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <figure><img src="/img/loading.gif" className="pay-icon" alt="" /></figure>
                            </div>
                        </div>
                    </div>
                </div>
            
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={this.customStyles}
                ariaHideApp={false}
                >
                <h4 style={{color:"#ce3838"}}>Please Enter OTP :</h4>
                <hr style={{color:"#ce3838", borderColor:"#ce3838"}}/>
                <form onSubmit={this.handleOtpSubmit}>    
                <input type="number" placeholder="Enter 4 digit OTP" autoFocus onChange={this.handleOTPChangeRegister} value={this.state.otp} required/>
                <div className="d-flex">
                <button style={{display:"flex", padding:"5px 25px 5px 25px", backgroundColor:"#ce3838", color:"white", borderRadius:"5px", border:"none", marginTop:"30px"}} type="submit" disabled={submittingOtp}>Submit <span className="loaderwithbutton">{submittingOtp &&
                   <Loader
                   type="ThreeDots"
                   color="#00BFFF"
                   height={12}
                   width={20}
                   timeout={4000}
                   /> 
                }</span></button>
                <button style={{padding:"5px 25px 5px 25px", backgroundColor:"#ce3838", color:"white", borderRadius:"5px", border:"none", margin:"30px 0 0 10px"}} onClick={this.handleRegisterSubmit}>Resend OTP</button>
                </div>
                <div>
                {failure ? <p style={{color:"red"}}>{failure}</p> : null}
                </div>
                </form>
                </Modal>
                {/* <!-- End otp Popup--> */}
                            </div>
        );
    }
}

class PasswordField extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hide: true
        }
    }

    hideSwitch = ev => {
        let name=this.props.eye_name;
        $("span[name$="+name+"]").toggleClass("fa-eye fa-eye-slash");
        this.setState({ hide: !this.state.hide })
    }

    render() {
        const { hide } = this.state
        return (<>
               <input type={hide ? 'password' : 'text'} name={this.props.name} value={this.props.value} onChange={this.props.onChange} id={this.props.id} required/>
        <label htmlFor={this.props.htmlFor}>{this.props.text}</label>
               <span toggle={this.props.toggle} className="fa fa-fw fa-eye-slash field-icon toggle-password" name={this.props.eye_name} onClick={this.hideSwitch}></span>
               </>
        )
    }
}



const mapStateToProps = (state) => {
    const {registering, success, failure, otpmodel, submittingOtp } = state.registrationReducer;
    const { loggedIn  } = state.LoginReducer;
    return {registering, success, failure, otpmodel, submittingOtp, loggedIn }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: body => dispatch(userActions.Register(body)),
        sendOtp: num => dispatch(userActions.sendOtp(num)),
        otphide:() => dispatch(userActions.otphide()),
        OtpVerify:otp => dispatch(userActions.OtpVerify(otp)),
        loginWithSocial:(params) => dispatch(userActions.loginWithSocial(params)),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);