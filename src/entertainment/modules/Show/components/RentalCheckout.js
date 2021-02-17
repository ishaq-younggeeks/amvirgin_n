import React, { Component } from 'react';
import { connect } from 'react-redux';
import {rentVideoSuccess} from "./ShowAction";

class RentalCheckout extends Component {
  constructor(props) {
    super(props)
    this.state ={
      amount: 0,
      name: "",
      email: "",
      method: ""
    }
  }
  
componentDidMount() {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);
  let name = localStorage.getItem("name");
  let email = localStorage.getItem("email");
  this.setState({name, email});
}
  changeAmount = (e) => {
    this.setState({amount:e.target.value})
  }

  openCheckout = () => {
    let options = {
      "key": 'rzp_test_iRpMdLQpCCvhrE',
      "key_secret": 'Hb1DIYDKOL54Gyfbj7sMsJVf',
      "amount": this.props.total * 100 || 1000, // 2000 paise = INR 20, amount in paisa
      "name": "AmVirgin",
      "order_id": this.props.razorPay.rzpOrderId,
      "image": process.env.PUBLIC_URL + "/img/default.png",
      "handler": (response) => {
        this.props.rentVideoSuccess(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature, this.props.razorPay.transactionId, 20, this.props.history);
      },
      "prefill": {
        "name": this.state.name,
        "email": this.state.email,
        "method": this.props.prefillMethod,
      },
      "notes": {
        "address": "NA"
      },
      "theme": {
        "color": "#F37254"
      }
    };
    var rzp1 = new window.Razorpay(options);
        rzp1.open();
  }
  render() {

    console.log("Razorpay Order ID :", this.props.razorPay);
    return (
      <>
     <div>
        <div> <p> We will redirect you to your Razorpay's website to authorize the payment. </p> </div>
        {this.props.razorPay && this.props.razorPay.rzpOrderId ? <button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red" onClick={this.openCheckout}> PAY NOW </button>: null}
      </div>
    </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        razorPay: state.ShowVideos.razorPay
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        rentVideoSuccess :(paymentId, orderId, signature, transactionId, videoKey, history) => dispatch(rentVideoSuccess(paymentId, orderId, signature, transactionId, videoKey, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalCheckout);