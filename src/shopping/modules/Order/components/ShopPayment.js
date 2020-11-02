import React, { Component } from 'react'
import Header from '../../../../entertainment/modules/Header'
import $ from 'jquery'
import Footer from '../../Home/components/FooterWhite';
import {Helmet} from "react-helmet";
import Payment from '../../../../payment/Payment'
import PriceDetail from './PriceDetail';

export default class ShopPayment extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  componentDidMount() {
    
  }


  

  render() {

        return (
      <>  
        <Helmet>
                    <meta charSet="utf-8" />
                    <title>Amvirgin | Payment</title>
                </Helmet>
        <Header/>
        <div class="container addressbody">
          <h4>Choose Payment Mode</h4>
          <div class="addresspart">
            <Payment/>
            <Address/>
          </div>
        </div>
        

       
    <Footer />
      </>
    )
  }
}



class Address extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="rightsection paymentright">

    <div className="deliverydate">
      <h6>Delivered to</h6>
      <div className="addressfield paymentaddress">
        <div className="address-name">Preeti Malik</div>
        <div className="address-type"><span>OFFICE</span></div>
        <div className="address-address">
          <div className="address-field">B-11, First floor</div>
          <div> Sector 65</div>
          <span>Noida- </span>
          <span>201301</span>
          <div>Uttar Pradesh</div>
          <div className="address-mobile">
            <span>Mobile: </span>
            <span>7015037997</span>
          </div>
          <a href="address.html">Change Address</a>
        </div>
       
      </div>
    </div>

    <hr/>
    <PriceDetail displayButton={false}/>
    {/* <div className="pricedetails">
      <h3>Price Details</h3>
          
        <div className="priceproduct">
        <span>Order Total</span>
        <span className="desc">Rs.4,494</span>
        </div>

        <div className="priceproduct">
        <span>Delivery Charges</span>
        <span className="desc"> <del>149</del> <span className="redspan">FREE</span></span>
        </div>
        <hr/>
        <div className="priceproduct totalprice">
        <span>Total</span><span className="desc">Rs. 3,594</span>
        </div>
        
  
      </div> */}
    </div>
    )
  }
}

