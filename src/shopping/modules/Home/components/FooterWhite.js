import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../../categorystyle.css";
import { fetchData, productData } from "../shoppingHomeReducer";

class Footer extends Component {

  componentDidMount = () => {

  };

  render() {

    const { footerData } = this.props
    const { data } = footerData
    console.log("Footer", footerData)
    return (
      <footer className="specific">
        <div className="footerwhite">
          <div className="footersection">
            <div className="part1">
              <p className="head">
                <Link to="shop"> ONLINE SHOPPING </Link>
              </p>
              {data && data.length
                ? data.map((item) => (
                    <p>
                      <Link to="#" onClick={() => this.props.productData(item.key,{sortBy:"relevance",page:1},this.props.history)}>{item.name}</Link>
                    </p>
                  ))
                : null}
            </div>
            <div className="part1">
              <p className="head">
                <Link to="shop"> Useful Links </Link>
              </p>
              <p>
                {this.props.loggedIn ? (
                  <Link to="/myprofile/myOrders">Track Orders</Link>
                  ) : null}
              </p>
              <p>
                <Link to="/faq" target="_blank">FAQ</Link>
              </p>
              <p>
                <Link to="/shippingpolicy" target="_blank">Shipping</Link>
              </p>
              <p>
                <Link to="/cancellationpolicy" target="_blank">Cancellation</Link>
              </p>
              <p>
                <Link to="/returnpolicy" target="_blank">Returns</Link>
              </p>
              <p>
                <Link to="/privacypolicy" target="_blank">Privacy Policy</Link>
              </p>
              <p>
                  <Link to="/termsconditions" target="_blank">Terms & Conditions</Link>
              </p>
              <p>
                  <Link to="/aboutus" target="_blank">About Us</Link>
              </p>
              <p>
              <Link to="/contact">Contact Us</Link>
              </p>
            </div>
            <div className="part2">
              <p className="head">
                <Link to="shop"> EXPERIENCE OUR APP ON MOBILE </Link>
              </p>
              <div className="footerimg">
                <a href="https://play.google.com/store/apps/details?id=com.example.amvirgin" target="_blank">
                  {" "}
                  <img src={process.env.PUBLIC_URL + "/img/googleplay.png"} />
                </a>
              </div>
              <div className="footerimg">
                <Link to="#">
                  {" "}
                  <img src={process.env.PUBLIC_URL + "/img/appstore.png"} />{" "}
                </Link>
              </div>
            </div>
            <div className="part2">
              <img className="iconimg" src={process.env.PUBLIC_URL + "/img/original.png"} />
              <h6>100% ORIGINAL guarantee for all products </h6>
              <img className="iconimg" src={process.env.PUBLIC_URL + "/img/return.png"} />
              <h6>Return within 30days of receiving your order </h6>
              <img className="iconimg" src={process.env.PUBLIC_URL + "/img/truck.png"} />
              <h6>Get free delivery for every order above Rs. 1000 </h6>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("current state in footer", state.shopping.data)
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
