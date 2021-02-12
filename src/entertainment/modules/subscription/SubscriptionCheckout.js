import React, { Component } from 'react';
import { connect } from 'react-redux';
import {subscriptionFinalFnc} from "../../reducers/subscriptionReducer";

class SubscriptionCheckout extends Component {
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
  console.log("react component called");
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
      "amount": this.props.total * 100, // 2000 paise = INR 20, amount in paisa
      "name": "AmVirgin",
      "order_id": this.props.razorPay,
      "image": process.env.PUBLIC_URL + "/img/default.png",
      "handler": (response) => {
        this.props.subscriptionFinalFnc(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature, this.props.razorPay, this.props.history);
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
        {this.props.razorPay ? <button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red" onClick={this.openCheckout}> PAY NOW </button>: null}
      </div>
    </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        razorPay: state.subscriptionReducer.subscriptionCheckout
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        subscriptionFinalFnc :(transactionId, paymentId, signature, orderId) => dispatch(subscriptionFinalFnc(transactionId, paymentId, signature, orderId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionCheckout);