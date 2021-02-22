import React, { Profiler } from 'react';
import "./setting.css";
import Modal from 'react-modal';
import {Link} from 'react-router-dom'

class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }
    render() {
        return (
            <div class="container-fliud emp-profile" style={{marginTop:'6%'}}>
                <div class="row">
                    <div class="col-md-12" >
                        <div style={{boxShadow:'0 0 10px #00000025',padding:'2%'}}>
                            <div class="row">
                                <div class="col-md-1" >
                                    <i className="fa fa-user fa-2x"></i>
                                </div>
                                <div class="col-md-9" >
                                    <h3>Account</h3>
                                    <p>View Your Display information,Login Details and primary Details </p>
                                </div>
                                <div class="col-md-2" >
                                    <Link to="/seller/dashboard/profile">
                                        <button className="linkbtn">View</button>
                                    </Link>
                                </div>
                            </div>  
                        </div>
                    </div>

                    <div class="col-md-12" >
                        <div style={{boxShadow:'0 0 10px #00000025',marginTop:'20px',padding:'2%'}}>
                            <div class="row">
                                <div class="col-md-1" >
                                    <i class="fas fa-briefcase fa-2x"></i>
                                </div>
                                <div class="col-md-9" >
                                    <h3>Business Detail</h3>
                                    <p>View your business details and bank details </p>
                                </div>
                                <div class="col-md-2" >
                                    <Link to="/seller/dashboard/BusinessDetail"> 
                                    <button className="linkbtn">View</button>
                                    </Link>
                                </div>
                            </div>  
                        </div>
                    </div>
                    
                    <div class="col-md-12" >
                        <div style={{boxShadow:'0 0 10px #00000025',marginTop:'20px',padding:'2%'}}>
                        <div class="row">
                            <div class="col-md-1" >
                                <i class="fa fa-file fa-2x"></i>
                            </div>
                            <div class="col-md-9" >
                                <h3>MOU</h3>
                                <p>The Memorandom of Understanding </p>
                            </div>
                            <div class="col-md-2" >
                                <Link to="/seller/dashboard/mou" {...this.props}>
                                    <button className="linkbtn">View</button>
                                </Link>
                            </div>
                        </div>
                        </div>
                    </div>

                </div>                   
            </div>
        )
    }
}
export default Setting