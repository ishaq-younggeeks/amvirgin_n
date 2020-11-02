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
      <div className="container-fliud emp-profile" style={{ marginTop: "6%" }}>
        <div className="row">
          <h3>Ask for queries</h3>
          <div style={{right:"20px",position:"absolute"}}>
          <Link className="btn btn-outline-dark" to="/seller/dashboard/support/myticket">My Ticket</Link>
          </div>
        </div>
        <hr/>
        <div className="supportitext">
          <p>Select type of category related issues </p>
        </div>  
        <div className="issuetable">
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