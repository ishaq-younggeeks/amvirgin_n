import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import LoginWithSocial from './LoginWithSocial';
import cookie from 'react-cookies';
import { connect } from "react-redux";
import { userActions } from "../../../actions";
import Modal from 'react-modal';
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
        //const token = cookie.load('cred')
        var otp = this.state.otp;
        this.props.OtpVerify(otp );
    }
    
    handleOTPChange = event => {
        this.setState({
            otp: event.target.value
        })
    }

    // handleBlur = (e) => {
    //     const num = e.target.value;
    //    // this.setState({ mobile: `${num}` })
    //     this.props.sendOtp(num);
    // }
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
            if(user.name && user.password && user.email && user.checkbox && user.mobile){
                let num = this.state.mobile
                this.props.sendOtp(num)
                this.setState({modalIsOpen: true})
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
            otp:parseInt(this.state.otp),
            checkbox:this.state.checkbox
        };
        if(user.password === user.password_confirmation && this.state.checkbox === true){
            if(user.name && user.password && user.email && user.checkbox && user.mobile){
                this.props.register(user);
            }
        }
    }

    toggle = () => {
        this.setState({
            checkbox:!this.state.checkbox
        })
    }

    render(){
        const { success, registering,failure,otpmodel } = this.props;
        const { user, submitted } = this.state;
        return(
            <div className="back">
                <div className="halfleft"><h6 className="title">Register</h6></div>
                <div className="halfleft">
                    <Link className="flipbutton halfright" id="registerButton" onClick={this.flip.bind(this)} to="#">Sign in →</Link>
                </div>
                <form className="loginsignupform">
                    <LoginWithSocial />
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
                        {submitted && !user.email &&
                            <div className="alert error alert-danger">Email is required</div>
                        }
                    </div>
                    <div className="input-field">
                        {/* <input type="text" name="mobile" value={this.state.mobile} onChange={this.onChange} onBlur={this.handleBlur} id="number" required/> */}
                        <input type="text" name="mobile" value={this.state.mobile} onChange={this.onChange} id="number" required/>
                        <label htmlFor="number">Mobile Number *</label>
                        {submitted && !user.mobile &&
                            <div className="alert error alert-danger">Mobile is required</div>
                        }
                    </div>
                    <div className="input-field">
                    <PasswordField toggle="#password-field2" htmlFor="password-field2" name="password" value={this.state.password} onChange={this.onChange} id="password-field2" eye_name="current_password" text="Password *"/>
                        {/* <input type="password" name="password" value={this.state.password} onChange={this.onChange} id="password-field2" /> */}
                        {/* <label htmlFor="password-field2">Password *</label>
                        <span toggle="#password-field2" className="fa fa-fw fa-eye-slash field-icon toggle-password" onClick={this.togglePassword}></span> */}
                        {submitted && !user.password &&
                            <div className="alert error alert-danger">Password is required</div>
                        }
                    </div>
                    <div className="input-field">
                    <PasswordField toggle="#password" htmlFor="confirm_password-field2" name="password_confirmation" value={this.state.password} onChange={this.onChange} id="confirm_password-field2" eye_name="confirm_password" text="Confirm Password *"/>
                         {/* <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.onChange} id="confirm_password-field2"  />
                        <label htmlFor="confirm_password-field2">Confirm Password *</label>
                        <span toggle="#password" className="fa fa-fw fa-eye-slash field-icon" ></span> */}
                        {submitted && !user.password_confirmation &&
                            <div className="alert error alert-danger">Confirm Password is required</div>
                        }
                    </div>
                    <input type="checkbox" name="checkbox" className="checkcheck" onClick={() => this.toggle()} value={this.state.checkbox}/>
                    <span className="agreeinput"> I understand and agree to the 
                        <Link to="!#"> Terms & Conditions</Link> and 
                        <Link to="!#"> Private Policy</Link>
                    {submitted && !user.checkbox &&
                        <div style={{color:"#ce3838"}}>Checkbox is required</div>
                    }
                    </span><br />
                    <div style={{ clear: 'both' }}></div>
                    <input type="button" onClick={(e) => this.handleRegisterSubmit(e)} value="Register"/>
                    {registering && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    { success ? success : null}
                    {failure ? failure : ''}
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
                {/* <!--otp Popup--> */}
                <div className="modal" role="dialog" style={{ display: this.props.otpmodel ? "block" : "none",top:'170px' }}>
                    <div className="modal-dialog otp_confirm">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content model-box">
                            <div className="modal-body otpmodel text-center">
                                <i className="fa fa-times" onClick={this.removeotp} style={{ position: "absolute", right: "12px", top: "12px" }}></i>
                                <form className="form-signin otp" onSubmit={this.otpverify}>
                                    <div className="form-group col-xs-12 col-sm-7 col-md-7 col-lg-7 ">
                                        <input 
                                            type="text" 
                                            value={this.state.otp} 
                                            className="form-control" 
                                            onChange={this.handleOTPChange} 
                                            placeholder="Enter OTP" 
                                            required 
                                            autoFocus 
                                        />
                                       
                                    </div>
                                    <div className="form-group col-xs-12 col-sm-5 col-md-5 col-lg-5  ">
                                        <button className=" verify-button " type="submit">Verify </button>
                                    </div>
                                </form>
                                {/* <div className="footer-pay">
                                    <a onClick={this.resendotp} href="javascript:void(0)">Resend OTP</a>
                                </div> */}

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
                <input type="text" placeholder="OTP" autoFocus onChange={this.handleOTPChange} value={this.state.otp} required/>
                <button style={{padding:"5px 25px 5px 25px", backgroundColor:"#ce3838", color:"white", borderRadius:"5px", border:"none", marginTop:"30px"}} type="submit">Submit</button>
                {registering && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                { success ? success : null}
                {failure ? failure : ''}               
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
    const {registering,success,failure,otpmodel } = state.registrationReducer;
    const { loggedIn  } = state.LoginReducer;
    return { registering,success,failure,otpmodel,loggedIn }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: body => dispatch(userActions.Register(body)),
        sendOtp: num => dispatch(userActions.sendOtp(num)),
        otphide:() => dispatch(userActions.otphide()),
        OtpVerify:otp => dispatch(userActions.OtpVerify(otp)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);