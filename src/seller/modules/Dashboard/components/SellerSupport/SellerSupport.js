import React, { Profiler } from "react";
import axios from "axios";
import "../../Dashboard.css";
import {Link} from 'react-router-dom'
import "./Support.css"
import { baseURL } from "../../../../../credential.json";
import CreateTicket from './CreateTicket';
import Modal from "react-modal";
import {connect} from 'react-redux';
import {saveTicketDetails,clearSavedStatus} from './SellerSupportAction';

class SellerSupport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false,
      issue:""
    };
  }

  openCreateTicket = (issuetype) => {

    this.setState({open:!this.state.open,issue:issuetype})
    this.props.clearSavedStatus()

  }


  render() {
    
    return (
      <div>
        <div className="row" style={{marginTop:"5%", marginLeft: "4px", alignItems:"center"}}>
          <h2>Ask for queries</h2>
          <div className="c-btn btn btn-outline-dark" style={{right:"20px",position:"absolute"}}>
          <Link to="/seller/dashboard/support/myticket">My Ticket</Link>
          </div>
        </div>
        <hr className="hr"/>
        <div>
          <h5>Select type of category related issues </h5>
        </div>  
        <div className="issuetable" style={{ marginLeft:"0px"}}>
          <div >
            <p>Order </p>
            <div><button className="btn btn-primary" onClick={() => this.openCreateTicket("Order")}>create ticket</button></div>
          </div>
          <div >
            <p>Listing </p>
            <div><button className="btn btn-primary" onClick={() => this.openCreateTicket("Listing")}>create ticket</button></div>
          </div>
          <div >
            <p>Payments </p>
            <div><button className="btn btn-primary" onClick={() => this.openCreateTicket("Payments")}>create ticket</button></div>
          </div>
          <div >
            <p>Promotions </p>
            <div><button className="btn btn-primary" onClick={() => this.openCreateTicket("Promotions")}>create ticket</button></div>
          </div>
          <div >
            <div>
            <p>Logistic </p>
            <div><button className="btn btn-primary" onClick={() => this.openCreateTicket("Logistic")}>create ticket</button></div>
            </div>
          </div>
          <div >
            <p>Others </p>
            <div><button className="btn btn-primary" onClick={() => this.openCreateTicket("Others")}>create ticket</button></div>
          </div>
        </div>
        
        {this.state.open?<CreateTicket openCreateTicket={this.openCreateTicket} open={this.state.open} issue={this.state.issue}{...this.props}/>:null}
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    sellerDetails:state.sellerAuth.currentUser,
    savedStatus: state.sellerSupport.savedStatus,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveTicketDetails:(data)=> dispatch(saveTicketDetails(data)),
    clearSavedStatus:() => dispatch(clearSavedStatus())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SellerSupport)