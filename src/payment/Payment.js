import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import {getRazorPayId, placeOrderFinal} from "../shopping/modules/Order/OrderAction";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: "Card",
    };
  }

  selectPayment = (compName, e) => {
    e.preventDefault();
    console.log("called component", compName);
    this.setState({ render: compName });
  };
  _renderPaymentComp() {
    switch (this.state.render) {
      case "NetBank":
        return <Checkout addressId={this.props.addressId}/>;
      case "Cash":
        return <Cash 
        addressId={this.props.addressId} 
        getRazorPayId={this.props.getRazorPayId} 
        razorPay={this.props.razorPay}
        placeOrderFinal={this.props.placeOrderFinal}  
        placedMessage={this.props.placedMessage}
        history={this.props.history}/>;
      case "BhimUpi":
        return <Checkout addressId={this.props.addressId}/>;
      case "Wallet":
        return <Checkout addressId={this.props.addressId}/>;
      case "Gift":
        return <Gift addressId={this.props.addressId}/>;
      case "RazorPay":
        return <Checkout addressId={this.props.addressId}/>;
      default:
        return <Checkout addressId={this.props.addressId}/>;
    }
  }

  activeClass = () => {
    let cl = "tablinks active";
    return cl;
  };

  defaultClass = () => {
    let cl = "tablinks";
    return cl;
  };

  render() {
    return (
      <>
        <div className="leftsection">
          <div className="body-style paymentsection">
            <div className="tab">
              <button
                className={
                  this.state.render === "Card"
                    ? this.activeClass()
                    : this.defaultClass()
                }
                onClick={(e) => this.selectPayment("Card", e)}
                id="defaultOpen"
              >
                CREDIT / DEBIT CARD{" "}
              </button>
              <button
                className={
                  this.state.render === "NetBank"
                    ? this.activeClass()
                    : this.defaultClass()
                }
                onClick={(e) => this.selectPayment("NetBank", e)}
              >
                {" "}
                NET BANKING{" "}
              </button>
              <button
                className={
                  this.state.render === "Cash"
                    ? this.activeClass()
                    : this.defaultClass()
                }
                onClick={(e) => this.selectPayment("Cash", e)}
              >
                {" "}
                CASH / CARD ON DELIVERY{" "}
              </button>
              <button
                className={
                  this.state.render === "BhimUpi"
                    ? this.activeClass()
                    : this.defaultClass()
                }
                onClick={(e) => this.selectPayment("BhimUpi", e)}
              >
                {" "}
                PHONEPAY / GOOGLEPAY / BHIM UPI{" "}
              </button>
              <button
                className={
                  this.state.render === "Wallet"
                    ? this.activeClass()
                    : this.defaultClass()
                }
                onClick={(e) => this.selectPayment("Wallet", e)}
              >
                {" "}
                WALLETS{" "}
              </button>
              <button
                className={
                  this.state.render === "RazorPay"
                    ? this.activeClass()
                    : this.defaultClass()
                }
                onClick={(e) => this.selectPayment("RazorPay", e)}
              >
                {" "}
                RAZORPAY{" "}
              </button>
              <button
                className={
                  this.state.render === "Gift"
                    ? this.activeClass()
                    : this.defaultClass()
                }
                onClick={(e) => this.selectPayment("Gift", e)}
              >
                {" "}
                GIFT CARD{" "}
              </button>
            </div>
            {this._renderPaymentComp()}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    razorPay : state.addressDetail.razorpayId,
    placedMessage: state.addressDetail.placedMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRazorPayId: () => dispatch(getRazorPayId()),
    placeOrderFinal: (addressId, paymentMode, razorPayId, history) => dispatch(placeOrderFinal(addressId, paymentMode, razorPayId, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

// class Card extends Component {

//   render(){
//     return (
//       <>
//       <div id="Card" className="tabcontent">
//                     <h3 className="credit-card">CREDIT/DEBIT CARD</h3>
//                     <label for="cardNumber" className="txt-clr">Card Number*</label>
//                     <div className="input-group">
//                       <input type="tel" className="form-control form-width" name="cardNumber" placeholder="" />
//                       <span className="input-group-addon"><i className="fa fa-credit-card card-inp"></i></span>
//                     </div>
//                     <label for="cardNumber" className="txt-clr">Name on Card*</label>
//                     <div className="input-group">
//                       <input type="text" className="form-control form-width" name="name" placeholder="" required autofocus />
//                     </div>
//                     <div className="input-group" style={{display: "flex"}}>
//                       <div className="col5">
//                         <label for="cardNumber" className="txt-clr">Expiry Month*</label><br />
//                         <select className="slct">
//                           <option value="volvo">Expiry Month</option>
//                           <option value="saab">01 (JAN)</option>
//                           <option value="opel">02 (FEB)</option>
//                           <option value="audi">03 (MARCH)</option>
//                           <option value="audi">04 (APR)</option>
//                           <option value="audi">05 (MAY)</option>
//                           <option value="audi">06 (JUNE)</option>
//                           <option value="audi">07 (JULY)</option>
//                           <option value="audi">08 (AUG)</option>
//                           <option value="audi">09 (SEP)</option>
//                           <option value="audi">10 (OCT)</option>
//                           <option value="audi">11 (NOV)</option>
//                           <option value="audi">12 (DEC)</option>
//                         </select>
//                       </div>
//                       <div className="col5">
//                         <label for="cardNumber" className="txt-clr">Expiry Year*</label><br />
//                         <select className="slct">
//                           <option value="volvo">Expiry Year</option>
//                           <option value="saab">2019</option>
//                           <option value="opel">2020</option>
//                           <option value="audi">2021</option>
//                           <option value="audi">2022</option>
//                           <option value="audi">2023</option>
//                           <option value="audi">2024</option>
//                           <option value="audi">2025</option>
//                           <option value="audi">2026</option>
//                           <option value="audi">2027</option>
//                           <option value="audi">2028</option>
//                           <option value="audi">2029</option>
//                           <option value="audi">2030</option>
//                         </select>
//                       </div>
//                     </div>

//                     <label for="cardCVC" className="txt-clr">CVV*</label><br/>
//                     <div className= "" style={{display: "flex"}}>
//                     <div className="col5">
//                     <input type="tel" className="form-control cvv-box" name="cardCVC" placeholder="" autocomplete="cc-csc" required />
//                     </div>
//                     <div className="col25">
//                       <img src="icon.png" className="card-cvv" />
//                     </div>

//                     <div className="col25 txt-clr" style= {{marginLeft: "10px"}}>
//                       <span> Last 3 digit printed on the back of the card </span>
//                       <br/>
//                     </div>
//                     </div>

//                     <br/>
//                     <div className="input-group">
//                     <button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red"> PAY NOW </button>
//                     </div>
//                   </div>
//       </>
//     )
//   }
// }

// // class PaymentNetBank extends Component {
// //   render(){
// //     return (
// //       <>
// //       </>
// //     )
// //   }
// // }

// class NetBank extends Component {
//   render(){
//     return (
//       <>

//         <div id="Netb" className="tabcontent">
//                     <h3 className="credit-card">NET BANKING</h3>
//                     <div className="input-group">
//                       <select className="selct">
//                         <option disabled>Choose Bank</option>
//                         <option value="saab">Airtel payments bank</option>
//                         <option value="opel">Andhra Bank</option>
//                         <option value="kuwait">Bank of Baharin and Kuwait</option>
//                         <option value="baroda">Bank of Baroda Corporate</option>
//                         <option value="retail">Bank of Baroda Retail Accounts</option>
//                       </select>
//                     </div>
//                     <div style={{marginbBottom: "20px"}}> We will redirect you to your bank website to authorize the payment.
//                     </div>
//                     <div className="input-group">
//                     <button type="submit" form="form1" value="Submit" className=" btn btn-raised btn-red"> PAY NOW </button>
//                     </div>

//                   </div>
//       </>
//     )
//   }
// }

class Cash extends Component {
  componentDidMount = () => {
    this.props.getRazorPayId();
  }

  render() {
    const {razorPay} = this.props;
    return (
      <>
        <div id="CashD" className="">
          <h3 className="credit-card">CASH / CARD ON DELIVERY</h3>
          <p style={{marginLeft:"35px"}}>Pay with Cash or Card when your order is delivered.</p>
          {/* <label for="cardNumber" className="txt-clr">
            Enter text as shown in above image
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-width"
              name="cardNumber"
              placeholder=""
              autocomplete="cc-number"
              required
              autofocus
            />
          </div> */}
          {this.props.addressId && razorPay ? <button
            type="submit"
            form="form1"
            value="Submit"
            className="btn btn-red"
            onClick={() => this.props.placeOrderFinal(this.props.addressId, "cash-on-delivery", razorPay, this.props.history)}
          >
            {" "}
            PAY ON DELIVERY{" "}
          </button> : <Link to="/placeOrder" type="button" className="btn btn-red">Select Address Again</Link>}     
        </div>
      </>
    );
  }
}

// class BhimUpi extends Component {
//   render(){
//     return (
//       <>
//          <div id="BHIM" className="tabcontent walletradio">
//                     <h3 className="credit-card">PHONEPE/GOOGLE PAY/BHIM UPI</h3>
//                     <label className="container"><img src="img/gpay.png" className="walletimg"/> Google pay
//                       <input type="radio" checked="checked" name="upi" value="googlepay" />
//                       <span className="checkmark"></span>
//                     </label>
//                     <hr/>
//                     <label className="container"><img src="img/phonepe.png" className="walletimg"/> Phone Pe
//                       <input type="radio" name="upi" value="phonepe" />
//                       <span className="checkmark"></span>
//                     </label>
//                     <hr/>
//                     <label className="container"><img src="img/upi.png" className="walletimg"/> UPI
//                       <input type="radio" name="upi" value="upi" />
//                       <span className="checkmark"></span>
//                     </label>
//                     <button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red"> PAY NOW </button>
//                   </div>
//       </>
//     )
//   }
// }

// class Wallet extends Component {
//   render(){
//     return (
//       <>
//          <div id="WALLET" className="tabcontent walletradio">
//                     <h3 className="credit-card">Select Wallet to pay</h3>
//                     <label className="container"><img src="img/razorpay.png" className="razorimg"/>
//                       <input type="radio" checked="checked" name="upi" value="razorpay"/>
//                       <span className="checkmark"></span>
//                     </label>
//                     <div> <p> We will redirect you to your wallet's website to authorize the payment. </p> </div>
//                     <button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red"> PAY NOW </button>
//                   </div>
//       </>
//     )
//   }
// }

class Gift extends Component {
  render() {
    return (
      <>
        <div id="Gift" className="">
          <h3 className="credit-card">ENTER GIFTCARD NUMBER</h3>
          <label for="cardNumber" className="txt-clr">
            Gift Card Number
          </label>
          <div className="input-group">
            <input
              type="tel"
              className="form-control form-width"
              name="cardNumber"
              placeholder=""
              autocomplete="cc-number"
              required
              autofocus
            />
          </div>
          <label for="cardNumber" className="txt-clr">
            Gift Card Pin
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-width"
              name="name"
              placeholder=""
              required
              autofocus
            />
          </div>
          <button
            type="submit"
            form="form1"
            value="Submit"
            className="btn btn-red"
          >
            {" "}
            ADD TO CREDIT{" "}
          </button>
        </div>
      </>
    );
  }
}

