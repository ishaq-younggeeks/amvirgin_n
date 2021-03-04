import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

class Footer extends Component {
    render(){
        const {loggedIn} = this.props;
        return(
            <footer>
                <div className="footer">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-4 footerline">
                                    <ul style={{padding:'inherit'}}><h4 style={{color:'#fff'}}>Legal</h4>
                                        <li><Link style={{color:'#fff'}} to="/faq">FAQ</Link></li>
                                        <li><Link style={{color:'#fff'}} to="/privacypolicy">Privacy Policy</Link></li>
                                        <li><Link style={{color:'#fff'}} to="/termsconditions">Terms &amp; Conditions</Link></li>
                                        <li><Link style={{color:'#fff'}} to="/aboutus">About Us</Link></li>
                                        <li></li>
                                    </ul>
                                </div>
                                <div className="col-md-4 footerline">
                                    <ul style={{padding:'inherit'}}><h4 style={{color:'#fff'}}>Customer</h4>
                                        {loggedIn ? <li><Link style={{color:'#fff'}} to="/myprofile/edit">My Account</Link></li>: null}
                                        {!loggedIn ? <li><Link style={{color:'#fff'}} to="/login">Login / Register</Link></li>:null}
                                    </ul>
                                </div>
                                <div className="col-md-4 footerline">
                                    <ul style={{padding:'inherit'}}><h4 style={{color:'#fff'}}>Connect</h4>
                                    <li><Link style={{color:'#fff'}} to="/contact">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footerlogo"><a href="https://amvirgin.in/" target="_blank"><img src={process.env.PUBLIC_URL+"/img/logo2.png"} alt="amvirgin"/></a></div>
                                <img className="appstore" src={process.env.PUBLIC_URL+"/img/appstore.png"} alt="amvirgin"/>
                                <a href="https://play.google.com/store/apps/details?id=com.example.amvirgin" target="_blank"><img className="googleplay" src={process.env.PUBLIC_URL+"/img/googleplay.png"} alt="amvirgin"/></a>
                            </div>
                    </div>
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        loggedIn: state.authReducer.loggedIn,
    }
};

export default connect(mapStateToProps, null)(Footer);