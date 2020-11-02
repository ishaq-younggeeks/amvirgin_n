import React, { Component } from 'react'
import './subscription.css'
import Header from '../Header'
import $ from 'jquery'
import Footer from "../Footer";
import {Helmet} from "react-helmet";
import SubscriptionHeader from "./SubscriptionHeader"
import { connect } from 'react-redux';
import {subscribeListData} from "../../reducers/subscriptionReducer"

class Subscription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AVSubscription:false,
            SelectPack:false,
            EnterDetails:false,     
            Pay:false,
            render:'',
            isToggleOn:false,
            arr: [
                {id:1, name: "AmVirgin Subscription", isActive: false },
                {id:2, name: "Select Pack", isActive: true },
                {id:3, name: "Enter Details", isActive: true },
                {id:4, name: "Pay", isActive: true }
            ]
        }
    }   
    
    clickMe = (index) => {
        let tmp = this.state.arr;
        tmp[index].isActive = !tmp[index].isActive;
        this.setState({ arr: tmp });
    }   

    toggle = () => {
        this.setState(prevState => ({
            isToggleOn:!prevState.isToggleOn
        }))
    }

    activeClass = () => {
        switch(this.state.render){
        case 'Step2': return 'Step2'
        case 'Step3' : return 'Step3'
        case 'Step4': return 'Step4'
        default : return 'Step1'
        }
    }

    handleClick = (compName, e) => {
        this.setState({render:compName});
        //this.activeClass()        
    }

    _renderSubComp(){
        switch(this.state.render){
            case 'Step2': return <Step2 
                listingSubscriptionData={this.props.listingSubscriptionData}
                clickMe={this.clickMe}
                />
            case 'Step3' : return <Step3/>
            case 'Step4': return <Step4/>
            default : return <Step1
                clickMe={this.clickMe}
                toggle={this.toggle}
                isToggleOn={this.state.isToggleOn}
                listingSubscriptionData={this.props.listingSubscriptionData}
                arr={this.state.arr}
            />
        }
    }

    componentWillMount() {
        this.props.subscribeListData()
    }

    render() {
      console.log(this.props)
        return (
            <>  
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Amvirgin | Subscription</title>
                </Helmet>
        <Header/>
        <div className="loginbody subscribesection">     
          <div className="container">
                <Header/>
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
        )
    }
}

const mapStateToProps = (state) => {
    return  {
        listingSubscriptionData: state.subscriptionReducer.listingSubscriptionData,
    }
}

const mapDispatchToProps = (dispatch) => {
	return({
        subscribeListData:()=>dispatch(subscribeListData())

	});
}

export default connect(mapStateToProps,mapDispatchToProps)(Subscription);

class Step1 extends React.Component{
    constructor(props) {
        super(props);
    }

    seeAllPlans = () => {
        this.props.toggle()
        // this.props.clickMe()
    }

    render() {
        return (
            <>
                {this.props.isToggleOn === false ? <div className="row setup-content" id="step-1">
                    <div className="stepsection">
                        <div className="">
                            <h1 className="step1">STEP 1 OF 4</h1>
                            <h2  className="step2">Choose your plan.</h2>
                            <ul className="steponelist">
                                <li><img src="img/tick.png"/> No commitments, cancel anytime.</li>
                                <li><img src="img/tick.png"/>Everything on AmVirgin for one low price.</li>
                            </ul>
                            <button className="seeplanbtn btn nextBtn btn-lg " type="button" onClick={(arr) => this.seeAllPlans()}>See all plans</button>
                        </div>
                    </div>
                </div>:
                <Step2
                    listingSubscriptionData={this.props.listingSubscriptionData}
                />
                }
            </>
        )
    }
}

class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn:false
        }
    }

    next = () => {
        this.setState(prevState => ({
            isToggleOn:!prevState.isToggleOn
        }))
    }

    render() {
        return (
            <>
                {this.state.isToggleOn === false ? 
                    <div className="row setup-content" id="step-2">
                        <div className="stepsection">
                            <div className="">
                                <div className=""> 
                                    {this.props.listingSubscriptionData!== undefined && this.props.listingSubscriptionData.map((item,index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <input type="radio" name="size" id="size_1" value="200" />
                                                <label for="size_1" className="pricelabel">
                                                    <h2 className="price">₹{item.originalPrice}</h2>
                                                    <h4 className="month">1 month</h4>
                                                    <h6 className="rate">@{item.duration}</h6>
                                                </label>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                                <button className="btn nextBtn btn-lg pull-right " type="button" onClick={() => this.next()}>Continue</button>
                            </div>
                        </div>
                    </div>
                :<Step3/>}
            </>
        )
    }
}

class Step3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn:false
        }
    }

    step3Toggle = () => {
        this.setState(prevState => ({
            isToggleOn:!prevState.isToggleOn
        }))
    }

    render(){
        return (
            <>
                {this.state.isToggleOn === false ? 
                    <div className="row setup-content" id="step-3">
                        <div className="stepsection">
                            <div className="">
                                <div className="selectpack">
                                    <div className="dataselect">
                                        <h1>Selected Pack</h1>
                                    </div>
                                    <h3>3 Months</h3>
                                    <h3 className="bggolden">Total ₹ 300</h3>
                                </div>
                                <div className="form-group dataformat">
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
                                </div>
                                <button className="btn nextBtn btn-lg pull-right" type="button" onClick={() => this.step3Toggle()}>Next</button>
                            </div>
                        </div>
                    </div>
                :<Step4/>
                }
                 
            </>
        )
    }
}

class Step4 extends Component {
  constructor(props){
    super(props)
    this.state={
      render:''
    }
  }

  selectPayment = (compName, e) => {
    e.preventDefault();
    this.setState({render:compName});        
}
_renderPaymentComp(){
    switch(this.state.render){
        case 'NetBank': return <NetBank/>
        case 'BhimUpi' : return <BhimUpi/>
        case 'Wallet': return <Wallet/>
        default : return <Card/>
    }
}

  render(){
      return (<>
           <div className="row setup-content" id="step-4">
      <div className="stepsection">
        <div className="">
            
          <div className="container">
            <div className="addresspart">
              <div className="leftsection">
                <div className="body-style paymentsection">
                  <div className="tab">
                    <button className="tablinks tab-one" onClick={(e) => this.selectPayment( 'Card',e)} id="defaultOpen" >CREDIT/ DEBIT CARD </button>
                    <button className="tablinks" onClick={(e) => this.selectPayment('NetBank',e)}> NET BANKING </button>
                    <button className="tablinks" onClick={(e) => this.selectPayment('BhimUpi',e)}> PHONEPAY/GOOGLEPAY/BHIM UPI </button>
                    <button className="tablinks" onClick={(e) => this.selectPayment('Wallet',e)}> WALLETS </button>
                
                  </div>
              
                  
                  {this._renderPaymentComp()}

              
                 
                 

                  </div>
                </div>
            
                
          </div>

          </div>
       
        </div>
      </div>
    </div>
        </>)
  }
}

class Card extends Component {

  render(){
    return (
      <>
      <div id="Card" className="tabcontent">
                    <h3 className="credit-card">CREDIT/DEBIT CARD</h3>
                    <label for="cardNumber" className="txt-clr">Card Number*</label>
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
                    </div>
                  </div>
      </>
    )
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
  render(){
    return (
      <>
        
        <div id="Netb" className="tabcontent">
                    <h3 className="credit-card">NET BANKING</h3>
                    <div className="input-group">
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
                    </div>

                  </div>
      </>
    )
  }
}


class BhimUpi extends Component {
  render(){
    return (
      <>
         <div id="BHIM" className="tabcontent walletradio">
                    <h3 className="credit-card">PHONEPE/GOOGLE PAY/BHIM UPI</h3>
                    <label className="container"><img src="img/gpay.png" className="walletimg"/> Google pay 
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
                    <button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red"> PAY NOW </button>
                  </div>
      </>
    )
  }
}

class Wallet extends Component {
  render(){
    return (
      <>
         <div id="WALLET" className="tabcontent walletradio">
                    <h3 className="credit-card">Select Wallet to pay</h3>
                    <label className="container"><img src="img/razorpay.png" className="razorimg"/> 
                      <input type="radio" checked="checked" name="upi" value="razorpay"/>
                      <span className="checkmark"></span>
                    </label>
                    <div> <p> We will redirect you to your wallet's website to authorize the payment. </p> </div>
                    <button type="submit" form="form1" value="Submit" className="btn btn-raised btn-red"> PAY NOW </button>
                  </div>
      </>
    )
  }
}

