import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../../categorystyle.css";
import { fetchData, productData } from "../shoppingHomeReducer";

class Footer extends Component {
  
  componentDidMount = () => {
    this.props.fetchData();
    console.log("Footer :", this.props.footerData);
  };

  render() {
    return (
      <footer className="specific">
        <div className="footerwhite">
          <div className="footersection">
            <div className="part1">
              <p className="head">
                <Link to="shop"> ONLINE SHOPPING </Link>
              </p>
              {this.props.footerData
                ? Array.from(this.props.footerData).map((item) => (
                    <p>
                      <Link to="#">{item.name}</Link>
                    </p>
                  ))
                : null}
              <p>
                <Link to="#">Men</Link>
              </p>
              <p>
                <Link to="#">Women</Link>
              </p>
              <p>
                <Link to="#">Kids</Link>
              </p>
              <p>
                <Link to="#">Home &amp; Living</Link>
              </p>
              <p>
                <Link to="#">Discover</Link>
              </p>
              <p>
                <Link to="#">Gift Cards</Link>
              </p>
            </div>
            <div className="part1">
              <p className="head">
                <Link to="shop"> Useful Links </Link>
              </p>
              <p>
                <Link to="/contact">Contact Us</Link>
              </p>
              <p>
                <Link to="#">FAQ</Link>
              </p>
              <p>
                <Link to="/termsconditions">T&C</Link>
              </p>
              <p>
                <Link to="/termsconditions">Terms of use</Link>
              </p>
              <p>
                {this.props.loggedIn ? (
                  <Link to="/myprofile/myOrders">Track Orders</Link>
                ) : null}
              </p>
              <p>
                <Link to="#">Shipping</Link>
              </p>
              <p>
                <Link to="#">Cancellation</Link>
              </p>
              <p>
                <Link to="#">Returns</Link>
              </p>
              <p>
                <Link to="/privacypolicy">Privacy Policy</Link>
              </p>
            </div>
            <div className="part2">
              <p className="head">
                <Link to="shop"> EXPERIENCE OUR APP ON MOBILE </Link>
              </p>
              <div className="footerimg">
                <Link to="#">
                  {" "}
                  <img src={process.env.PUBLIC_URL + "img/googleplay.png"} />
                </Link>
              </div>
              <div className="footerimg">
                <Link to="#">
                  {" "}
                  <img src="img/appstore.png" />{" "}
                </Link>
              </div>
            </div>
            <div className="part2">
              <img className="iconimg" src="img/original.png" />
              <h6>100% ORIGINAL guarantee for all products </h6>
              <img className="iconimg" src="img/return.png" />
              <h6>Return within 30days of receiving your order </h6>
              <img className="iconimg" src="img/truck.png" />
              <h6>Get free delivery for every order above Rs. 1000 </h6>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.authReducer.loggedIn,
    footerData: state.shopping.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
    productData: (id, sortKey, currentPage, history) =>
      dispatch(productData(id, sortKey, currentPage, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
