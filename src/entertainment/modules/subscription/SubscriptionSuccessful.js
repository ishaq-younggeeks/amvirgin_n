import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";

class SubscriptionSuccessful extends Component {
  render() {
    const { subscriptionFinal } = this.props;
    console.log("Order Successful :", subscriptionFinal);
    return (
      <div>
        <Header />
        <div className="jumbotron text-center" style={{height:"100vh"}}>
          <i className="fa fa-check-circle" style={{fontSize:"200px", color:"green", marginTop:"12rem"}} aria-hidden="true"></i>
          <p className="lead">
            <h3 style={{fontWeight:"bold", marginTop:"30px"}}>{subscriptionFinal.message}</h3>
          </p>
          <hr  style={{
              color: "grey",
              backgroundColor: "grey",
              height: 4,
              borderColor: "black",
            }}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subscriptionFinal: state.subscriptionReducer.subscriptionFinal,
  };
};

export default connect(mapStateToProps, null)(SubscriptionSuccessful);
