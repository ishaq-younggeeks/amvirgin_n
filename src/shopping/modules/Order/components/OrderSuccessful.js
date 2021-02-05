import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../../../entertainment/modules/Header";

class OrderSuccessful extends Component {
  render() {
    const { placedMessage } = this.props;
    console.log("Order Successful :", placedMessage);
    return (
      <div>
        <Header />
        <div className="jumbotron text-center" style={{height:"100vh"}}>
          {placedMessage.status === 403 ? <i className="fa fa-exclamation-triangle" style={{fontSize:"200px", color:"darkred", marginTop:"12rem"}} aria-hidden="true"></i> : <i className="fa fa-check-circle" style={{fontSize:"200px", color:"green", marginTop:"12rem"}} aria-hidden="true"></i>}
          <h1 className="display-3" style={{marginTop:"2rem"}}>{placedMessage.status === 403 ? <h1>OOPS!</h1> : <h1>Thank You!</h1>}</h1>
          <p className="lead">
            <h3 style={{fontWeight:"bold"}}>{placedMessage.message}</h3>
          </p>
          <p className="lead">
            {placedMessage.orderNumber ? <strong>Order # {placedMessage.orderNumber}</strong> : null}
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
    placedMessage: state.addressDetail.placedMessage,
  };
};

export default connect(mapStateToProps, null)(OrderSuccessful);
