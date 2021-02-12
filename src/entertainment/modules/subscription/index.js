import React, { Component } from "react";
import "./subscription.css";
import Header from "../Header";
import $ from "jquery";
import Footer from "../Footer";
import { Helmet } from "react-helmet";
import SubscriptionHeader from "./SubscriptionHeader";
import { connect } from "react-redux";
import {
  subscribeListData,
  susbcriptionCheckout,
} from "../../reducers/subscriptionReducer";
import { Link } from "react-router-dom";
import SubscriptionCheckout from "./SubscriptionCheckout";

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AVSubscription: false,
      SelectPack: false,
      EnterDetails: false,
      Pay: false,
      render: "",
      isToggleOn: false,
      arr: [
        { id: 1, name: "AmVirgin Subscription", isActive: false },
        { id: 2, name: "Select Pack", isActive: true },
        { id: 3, name: "Enter Details", isActive: true },
        { id: 4, name: "Pay", isActive: true },
      ],
    };
  }

  clickMe = (index) => {
    let tmp = this.state.arr;
    tmp[index].isActive = !tmp[index].isActive;
    this.setState({ arr: tmp });
  };

  toggle = () => {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  };

  activeClass = () => {
    switch (this.state.render) {
      case "Step2":
        return "Step2";
      case "Step3":
        return "Step3";
      case "Step4":
        return "Step4";
      default:
        return "Step1";
    }
  };

  handleClick = (compName, e) => {
    this.setState({ render: compName });
  };

  _renderSubComp() {
    switch (this.state.render) {
      case "Step2":
        return (
          <Step2
            listingSubscriptionData={this.props.listingSubscriptionData}
            clickMe={this.clickMe}
            {...this.props}
          />
        );
      case "Step3":
        return <Step3 {...this.props}/>;
      case "Step4":
        return <Step4 {...this.props}/>;
      default:
        return (
          <Step1
            loggedIn={this.props.loggedIn}
            clickMe={this.clickMe}
            toggle={this.toggle}
            isToggleOn={this.state.isToggleOn}
            listingSubscriptionData={this.props.listingSubscriptionData}
            arr={this.state.arr}
            susbcriptionCheckout={this.props.susbcriptionCheckout}
            user={this.props.user}
            {...this.props}
          />
        );
    }
  }

  componentDidMount() {
    this.props.subscribeListData();
  }

  render() {
    console.log(this.props);
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Amvirgin | Subscription</title>
        </Helmet>
        <Header />
        <div className="loginbody subscribesection">
          <div className="container">
            <Header />
            <div className="">
              <div className="container">
                <SubscriptionHeader
                  handleClick={this.handleClick}
                  activeClass={this.activeClass()}
                  clickMe={this.clickMe}
                  arr={this.state.arr}
                />
                <form role="form" action="" method="post" className="formpart">
                  <h3 className="titlebinge">Binge Watch</h3>
                  <p className="parabinge">All episodes without any limits</p>
                  {this._renderSubComp()}
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    loggedIn: state.authReducer.loggedIn,
    listingSubscriptionData: state.subscriptionReducer.listingSubscriptionData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeListData: () => dispatch(subscribeListData()),
    susbcriptionCheckout: (id) => dispatch(susbcriptionCheckout(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);

class Step1 extends React.Component {
  constructor(props) {
    super(props);
  }

  seeAllPlans = () => {
    this.props.toggle();
    this.props.clickMe("1");
  };

  render() {
    console.log("Step 1");
    return (
      <>
        {this.props.isToggleOn === false ? (
          <div className="row setup-content" id="step-1">
            <div className="stepsection">
              <div className="">
                <h1 className="step1">STEP 1 OF 4</h1>
                <h2 className="step2">Choose your plan.</h2>
                <ul className="steponelist">
                  <li>
                    <img src="img/tick.png" /> No commitments, cancel anytime.
                  </li>
                  <li>
                    <img src="img/tick.png" />
                    Everything on AmVirgin for one low price.
                  </li>
                </ul>
                <button
                  className="seeplanbtn btn nextBtn btn-lg "
                  type="button"
                  onClick={(arr) => this.seeAllPlans()}
                >
                  See all plans
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Step2
            listingSubscriptionData={this.props.listingSubscriptionData}
            clickMe={this.props.clickMe}
            loggedIn={this.props.loggedIn}
            susbcriptionCheckout={this.props.susbcriptionCheckout}
            user={this.props.user}
            {...this.props}
          />
        )}
      </>
    );
  }
}

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      selectedPack: "",
      duration: "",
      price: "",
      selectedPackIndex: "",
      activeIndex: "",
      activeExpiration: ""
    };
  }

  componentDidMount = () => {
    console.log("componentDidMount Calling!");
    const {user} = this.props;
    if(user && user.subscription && user.subscription.active){
      this.setState({
        selectedPackIndex: user.subscription ? user.subscription.plan.key - 1 : null,
        activeIndex: user.subscription ? user.subscription.plan.key - 1 : null,
        activeExpiration: user.subscription ? user.subscription.plan.duration.expires.slice(0,10).split('-').reverse().join('-') : null
      })
    }
  }

  next = () => {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
    this.props.clickMe("2");
  };

  render() {
    console.log("Step 2");
    return (
      <>
        {this.state.isToggleOn === false ? (
          <div className="row setup-content" id="step-2">
            <div className="stepsection">
              <div className="">
                <div className="">
                  {this.props.listingSubscriptionData !== undefined &&
                    this.props.listingSubscriptionData.map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          <label
                            for="size_1"
                            className={`pricelabel + ${
                              index === this.state.selectedPackIndex
                                ? "active-pack"
                                : ""
                            }`}
                            onClick={(e) =>
                              this.setState({
                                selectedPack: item.key,
                                duration: item.duration,
                                price: item.originalPrice,
                                selectedPackIndex: index,
                              })
                            }
                          >
                            <h2 className="price">₹{item.originalPrice}</h2>
                            <h4 className="month">{item.duration} Days</h4>
                            <h6 className="rate">{item.name}</h6>
                            {index === this.state.activeIndex ? <div className="label-hello"><span className="text-danger font-weight-bold">Valid till : </span>{this.state.activeExpiration}</div> : null}
                            <i className={`${index === this.state.activeIndex ? "fa fa-check-circle  text-success hello-check" : ""}`}></i>
                          </label>
                        </React.Fragment>
                      );
                    })}
                </div>
                <button
                  className="btn nextBtn btn-lg pull-right "
                  type="button"
                  disabled={this.state.selectedPackIndex === this.state.activeIndex}
                  onClick={() => this.next()}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Step3
            price={this.state.price}
            selectedPack={this.state.selectedPack}
            duration={this.state.duration}
            clickMe={this.props.clickMe}
            loggedIn={this.props.loggedIn}
            susbcriptionCheckout={this.props.susbcriptionCheckout}
            {...this.props}
          />
        )}
      </>
    );
  }
}

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
    };
  }

  step3Toggle = () => {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
    this.props.clickMe("3");
    this.props.susbcriptionCheckout(this.props.selectedPack);
  };

  render() {
    console.log("Step 3");
    console.log("Logged In :", this.props.loggedIn);
    return (
      <>
        {this.state.isToggleOn === false ? (
          <div className="row setup-content" id="step-3">
            <div className="stepsection">
              <div className="">
                <div
                  className="selectpack"
                  style={{ marginLeft: this.props.loggedIn ? "40%" : "" }}
                >
                  <div className="dataselect">
                    <h1>Selected Pack</h1>
                  </div>
                  <h3>{this.props.duration} Days</h3>
                  <h3 className="bggolden">Total ₹ {this.props.price}</h3>
                </div>
                {!this.props.loggedIn ? (
                  <>
                    {/* <div className="form-group dataformat">
                                    <input maxlength="200" type="text" required="required" className="form-control" placeholder="Please Enter Mobile/Email address" />
                                </div>
                                <div className="form-group dataformat">
                                    <input maxlength="200" type="password" required="required" className="form-control" placeholder="Password" />
                                </div>
                                <div className="form-group dataformat">
                                    <input maxlength="200" type="password" required="required" className="form-control" placeholder="Confirm Password" />
                                </div>
                                <div className="form-group dataformat">
                                    <input type="text" required="required" className="form-control" placeholder="Age" />
                                </div>
                                <div className="form-group dataformat">
                                    <input type="checkbox" id="tnc" class="checksubs" name="" value=""/>
                                    <label for="tnc" className="checkfield"> I agree to <a href="#"> Terms of use</a> & <a href="#">Privacy policy</a> </label><br/>
                                </div>
                                <div className="loginwithsocial">
                                    <h2 className="logwithhead">Or log in with</h2>
                                    <div className="divsocial">
                                        <button className="fbbtn"><img src="img/facebooklogo.png" /><span>Facebook</span></button>
                                    </div>
                                    <div className="divsocial">
                                        <button className="gbtn"><img src="img/google.png" /><span>Google</span>
                                        </button>
                                    </div>
                                </div> */}
                    <div
                      className="form-group dataformat"
                      style={{ marginTop: "3rem" }}
                    >
                      <Link to="/login">
                        <h2
                          className="hoverlogin"
                          style={{ color: "darkgoldenrod", fontWeight: "bold" }}
                        >
                          Please Login / Register to continue.
                        </h2>
                      </Link>
                    </div>
                  </>
                ) : null}
                {/* <button className="btn nextBtn btn-lg pull-left" type="button" onClick={() => this.step3Toggle()}>Next</button> */}
                {this.props.loggedIn ? (
                  <button
                    className="btn nextBtn btn-lg pull-right"
                    type="button"
                    onClick={() => this.step3Toggle()}
                  >
                    Next
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <Step4 total={this.props.price}{...this.props}/>
        )}
      </>
    );
  }
}

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: "",
    };
  }

  selectPayment = (compName, e) => {
    e.preventDefault();
    this.setState({ render: compName });
  };
  _renderPaymentComp() {
    switch (this.state.render) {
      case "NetBank":
        return <NetBank total={this.props.total}{...this.props}/>;
      case "BhimUpi":
        return <BhimUpi total={this.props.total}{...this.props}/>;
      case "Wallet":
        return <Wallet total={this.props.total}{...this.props}/>;
      default:
        return <Card total={this.props.total}{...this.props}/>;
    }
  }

  render() {
    console.log("Step 4");
    return (
      <>
        <div className="row setup-content" id="step-4">
          <div className="stepsection">
            <div className="">
              <div className="container">
                <div className="addresspart">
                  <div className="leftsection">
                    <div className="body-style paymentsection">
                      <div className="tab">
                        <button
                          className="tablinks tab-one"
                          onClick={(e) => this.selectPayment("Card", e)}
                          id="defaultOpen"
                        >
                          CREDIT / DEBIT CARD{" "}
                        </button>
                        <button
                          className="tablinks"
                          onClick={(e) => this.selectPayment("NetBank", e)}
                        >
                          {" "}
                          NET BANKING{" "}
                        </button>
                        <button
                          className="tablinks"
                          onClick={(e) => this.selectPayment("BhimUpi", e)}
                        >
                          {" "}
                          PHONE PE / GOOGLE PAY / BHIM UPI{" "}
                        </button>
                        <button
                          className="tablinks"
                          onClick={(e) => this.selectPayment("Wallet", e)}
                        >
                          {" "}
                          WALLETS{" "}
                        </button>
                      </div>

                      {this._renderPaymentComp()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

class Card extends Component {
  render() {
    return (
      <>
        <div id="Card" className="tabcontent">
          <h3 className="credit-card">CREDIT / DEBIT CARD</h3>
          {/* <label for="cardNumber" className="txt-clr">Card Number*</label>
                    <div className="input-group">
                      <input type="tel" className="form-control form-width" name="cardNumber" placeholder="" />
                      <span className="input-group-addon"><i className="fa fa-credit-card card-inp"></i></span>
                    </div>
                    <label for="cardNumber" className="txt-clr">Name on Card*</label>
                    <div className="input-group">
                      <input type="text" className="form-control form-width" name="name" placeholder="" required autofocus />
                    </div>
                    <div className="input-group" style={{display: "flex"}}>
                      <div className="col5">
                        <label for="cardNumber" className="txt-clr">Expiry Month*</label><br />
                        <select className="slct">
                          <option value="volvo">Expiry Month</option>
                          <option value="saab">01 (JAN)</option>
                          <option value="opel">02 (FEB)</option>
                          <option value="audi">03 (MARCH)</option>
                          <option value="audi">04 (APR)</option>
                          <option value="audi">05 (MAY)</option>
                          <option value="audi">06 (JUNE)</option>
                          <option value="audi">07 (JULY)</option>
                          <option value="audi">08 (AUG)</option>
                          <option value="audi">09 (SEP)</option>
                          <option value="audi">10 (OCT)</option>
                          <option value="audi">11 (NOV)</option>
                          <option value="audi">12 (DEC)</option>
                        </select>
                      </div>
                      <div className="col5">
                        <label for="cardNumber" className="txt-clr">Expiry Year*</label><br />
                        <select className="slct">
                          <option value="volvo">Expiry Year</option>
                          <option value="saab">2019</option>
                          <option value="opel">2020</option>
                          <option value="audi">2021</option>
                          <option value="audi">2022</option>
                          <option value="audi">2023</option>
                          <option value="audi">2024</option>
                          <option value="audi">2025</option>
                          <option value="audi">2026</option>
                          <option value="audi">2027</option>
                          <option value="audi">2028</option>
                          <option value="audi">2029</option>
                          <option value="audi">2030</option>
                        </select>
                      </div>
                    </div>
                    
                    <label for="cardCVC" className="txt-clr">CVV*</label><br/>
                    <div className= "" style={{display: "flex"}}>
                    <div className="col5">
                    <input type="tel" className="form-control cvv-box" name="cardCVC" placeholder="" autocomplete="cc-csc" required />
                    </div>
                    <div className="col25">
                      <img src="icon.png" className="card-cvv" />
                    </div>
                  
                    <div className="col25 txt-clr" style= {{marginLeft: "10px"}}>
                      <span> Last 3 digit printed on the back of the card </span>
                      <br/>
                    </div>
                    </div>
              
                    <br/>
                    <div className="input-group">
                    <button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red"> PAY NOW </button>
                    </div>*/}
          <SubscriptionCheckout
            addressId={this.props.addressId}
            total={this.props.total}
            razorPay={this.props.razorPay}
            prefillMethod={"card"}
            paymentMethod={"2"}
            placeOrderFinal={this.props.placeOrderFinal}
            {...this.props}
          />
          ;
        </div>
      </>
    );
  }
}

// class PaymentNetBank extends Components {
//   render(){
//     return (
//       <>
//       </>
//     )
//   }
// }

class NetBank extends Component {
  render() {
    return (
      <>
        <div id="Netb" className="tabcontent">
          <h3 className="credit-card">NET BANKING</h3>
          {/*<div className="input-group">
                      <select className="selct">
                        <option disabled>Choose Bank</option>
                        <option value="saab">Airtel payments bank</option>
                        <option value="opel">Andhra Bank</option>
                        <option value="kuwait">Bank of Baharin and Kuwait</option>
                        <option value="baroda">Bank of Baroda Corporate</option>
                        <option value="retail">Bank of Baroda Retail Accounts</option>
                      </select>
                    </div>
                    <div style={{marginbBottom: "20px"}}> We will redirect you to your bank website to authorize the payment. 
                    </div>
                    <div className="input-group">
                    <button type="submit" form="form1" value="Submit" className=" btn btn-raised btn-red"> PAY NOW </button>
                    </div> */}
          <SubscriptionCheckout
            addressId={this.props.addressId}
            total={this.props.total}
            razorPay={this.props.razorPay}
            prefillMethod={"netbanking"}
            paymentMethod={"2"}
            placeOrderFinal={this.props.placeOrderFinal}
            {...this.props}
          />
          ;
        </div>
      </>
    );
  }
}

class BhimUpi extends Component {
  render() {
    return (
      <>
        <div id="BHIM" className="tabcontent walletradio">
          <h3 className="credit-card">PHONEPE / GOOGLE PAY / BHIM UPI</h3>
          {/*<label className="container"><img src="img/gpay.png" className="walletimg"/> Google Pay 
                      <input type="radio" checked="checked" name="upi" value="googlepay" />
                      <span className="checkmark"></span>
                    </label>
                    <hr/>
                    <label className="container"><img src="img/phonepe.png" className="walletimg"/> Phone Pe
                      <input type="radio" name="upi" value="phonepe" />
                      <span className="checkmark"></span>
                    </label>
                    <hr/>
                    <label className="container"><img src="img/upi.png" className="walletimg"/> UPI
                      <input type="radio" name="upi" value="upi" />
                      <span className="checkmark"></span>
                    </label>
                    <button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red"> PAY NOW </button> */}
          <SubscriptionCheckout
            addressId={this.props.addressId}
            total={this.props.total}
            razorPay={this.props.razorPay}
            prefillMethod={"upi"}
            paymentMethod={"2"}
            placeOrderFinal={this.props.placeOrderFinal}
            {...this.props}
          />
          ;
        </div>
      </>
    );
  }
}

class Wallet extends Component {
  render() {
    return (
      <>
        <div id="WALLET" className="tabcontent walletradio">
          <h3 className="credit-card">Select Wallet to pay</h3>
          {/*   <label className="container"><img src="img/razorpay.png" className="razorimg"/> 
                      <input type="radio" checked="checked" name="upi" value="razorpay"/>
                      <span className="checkmark"></span>
                    </label>
                    <div> <p> We will redirect you to your wallet's website to authorize the payment. </p> </div>
                    <button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red"> PAY NOW </button> */}
          <SubscriptionCheckout
            addressId={this.props.addressId}
            total={this.props.total}
            razorPay={this.props.razorPay}
            prefillMethod={"wallet"}
            paymentMethod={"2"}
            placeOrderFinal={this.props.placeOrderFinal}
            {...this.props}
          />
          ;
        </div>
      </>
    );
  }
}
