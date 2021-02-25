import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Razorpay from 'razorpay'

class Checkout extends Component {
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

  openCheckout = (e) => {
    e.preventDefault()
    let options = {
      "key": 'rzp_test_iRpMdLQpCCvhrE',
      "key_secret": 'Hb1DIYDKOL54Gyfbj7sMsJVf',
      "amount": this.props.total * 100, // 2000 paise = INR 20, amount in paisa
      "name": "AmVirgin",
      "order_id": this.props.razorPay,
      "image": process.env.PUBLIC_URL + "/img/default.png",
      "handler": (response) => {
        console.log("err rzpy", response)
        this.props.placeOrderFinal(this.props.addressId, this.props.paymentMethod, response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature, this.props.history);
      },
      "prefill": {
        "name": this.state.name,
        "email": this.state.email,
        "method": this.props.prefillMethod,
      },
      "notes": {
        "address": "Hello World"
      },
      "theme": {
        "color": "#F37254"
      },
      "modal":{
        "ondismiss":() => {
          // window.location.replace("fgyj")
          window.location.reload()
          // document.querySelector(".razorpay-backdrop").style.display = "none";
        }
    }
    };

    var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response){
          console.log("calling error razpy",response)
          console(response.error.code);
        
  });
  }
  render() {
    console.log("Razorpay Order ID :", this.props.razorPay);
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