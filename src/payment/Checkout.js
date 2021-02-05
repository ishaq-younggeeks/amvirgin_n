import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Razorpay from 'razorpay'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state ={
      amount:100
    }
  }
componentDidMount() {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);
  console.log("react component called")
}
  changeAmount = (e) => {
    this.setState({amount:e.target.value})
  }
  

  openCheckout = () => {
    let options = {
      "key": "rzp_test_YGKOT7VqhbtD2X",
      "key_secret": 'CZ54d9OJjs6hghmQuWGZmyaM',
      "amount": this.state.amount, // 2000 paise = INR 20, amount in paisa
      "name": "Merchant Name",
      "description": "Purchase Description",
      "image": "/your_logo.png",
      "handler": function (response){
        alert(response.razorpay_payment_id);
      },
      "prefill": {
        "name": "ishaq",
        "email": "df@razorpay.com"
      },
      "notes": {
        "address": "Hello World"
      },
      "theme": {
        "color": "#F37254"
      }
    };
    // let rzp = new Razorpay(options);
    // rzp.open();
    var rzp1 = new window.Razorpay(options);
        rzp1.open();
  }
  render() {
    return (
      <>
     <div id="Card" className=" ">
        <div> <p> We will redirect you to your Razorpay's website to authorize the payment. </p> </div>
        {this.props.addressId ?<button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red" onClick={this.openCheckout}> PAY NOW </button> : <Link to="/placeOrder" type="button" className="btn btn-red">Select Address Again</Link>}
      </div>
    </>
    );
  }
}

export default Checkout;