import React, { Component } from "react";
import Header from "../../../../entertainment/modules/Header";
import $ from "jquery";
import Footer from "../../Home/components/FooterWhite";
import { Helmet } from "react-helmet";
import Payment from "../../../../payment/Payment";
import PriceDetail from "./PriceDetail";
import { connect } from "react-redux";
import { getAddressDetail } from "../OrderAction";
import { Link } from "react-router-dom";
class ShopPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.addressDetail();
  }

  render() {
    const { addressdata } = this.props;
    console.log("Address Details :", addressdata);
    console.log("Address ID :", this.props.location.addressId);
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Amvirgin | Payment</title>
        </Helmet>
        <Header />
        <div class="container addressbody">
          <h4>Choose Payment Mode</h4>
          <div class="addresspart">
            <Payment addressId={this.props.location.addressId}/>
            <Address
              addressdata={addressdata}
              addressId={this.props.location.addressId}
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addressdata: state.addressDetail.addressDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addressDetail: () => dispatch(getAddressDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPayment);

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="rightsection paymentright">
        {Object.keys(this.props.addressdata).length ? 
          this.props.addressdata
            .filter((id) => id.key === this.props.addressId)
            .map((item) => (
              <div className="deliverydate">
                <h6>Deliver to</h6>
                <div className="addressfield paymentaddress" style={{height:"280px"}}>
                  <div className="address-name">
                    {item.name ? item.name : null}
                  </div>
                  <div className="address-type">
                    <span>{item.type ? item.type : null}</span>
                  </div>
                  <div className="address-address">
                    <div className="address-field">
                      {item.address ? item.address : null}
                    </div>
                    <div>{item.locality ? item.locality : null}</div>
                    <span>{item.city.name ? item.city.name : null}</span>
                    <br />
                    <span>{item.pinCode ? item.pinCode : null}</span>
                    <div>{item.state.name ? item.state.name : null}</div>
                    <div className="address-mobile">
                      <span>Mobile: </span>
                      <span>{item.mobile ? item.mobile : null}</span>
                    </div>
                    <a href="#">
                      <Link to="/placeOrder" type="button" className="btn btn-red">Change Address</Link>
                    </a>
                  </div>
                </div>
              </div>
            )
        ) : null}
        <hr />
        <PriceDetail displayButton={false} />
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
    );
  }
}
