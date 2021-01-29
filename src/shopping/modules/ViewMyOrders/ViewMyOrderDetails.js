import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../../entertainment/modules/Header";
import SubMenu from "../Home/components/SubMenu";
import {viewMyOrderDetails, getShippingAddress} from "./ViewMyOrdersAction";

class ViewMyOrderDetails extends Component {
  constructor() {
    super();
    this.state = {
      OrderNumber: "",
    };
  }

  componentDidMount = () => {
    let orderNumber = localStorage.getItem("OrderNumber");
    this.props.viewMyOrderDetails(orderNumber);
  };

  render() {
      const {myOrderDetails} = this.props;
      console.log("Order Details : ", myOrderDetails);
      console.log("Address :", myOrderDetails.details)
    return (
      <>
        <Header />
        <SubMenu {...this.props} />
        <div style={{ margin: "2rem 2rem 0 2rem" }}>
          <h3 style={{ color: "#ce3838" }}>
            <Link to="/myprofile/myOrders/" style={{ color: "#9e2e2e" }}>
              My Orders
            </Link>
            <span style={{ color: "black" }}> {">"}</span> Order Details
            <span style={{ color: "black" }}>{">"}</span>
          </h3>
          <hr
            style={{
              color: "red",
              backgroundColor: "#ce3838",
              height: 1,
              borderColor: "#ce3838",
            }}
          />
        </div>
        <div
          className="col-sm-12"
          style={{ margin: "0 0 2rem 3rem", width: "95%" }}
        >
          <div className="whitepbox">
            <div
              className="row"
              style={{ height: "170px", alignItem: "center" }}
            >
              <div className="col-sm-1">
                {myOrderDetails.image ? (
                        <img
                          src={myOrderDetails.image}
                          style={{
                            width: "9rem",
                            objectFit: "cover",
                            height: "150px",
                            margin: "2px 0 0 3rem",
                          }}
                        />
                      ) : 
                      (
                        <img
                          src={process.env.PUBLIC_URL + "/img/default.png"}
                          style={{
                            width: "9rem",
                            objectFit: "cover",
                            height: "150px",
                            margin: "2px 0 0 3rem",
                          }}
                        />
                      )}
              </div>
              <div className="col-sm-4">
                  {myOrderDetails.subOrders ? myOrderDetails.subOrders.map((item) => item.items ? item.items.map((item1) => <h3 style={{
                    color: "#ce3838",
                    fontSize: "19px",
                    padding: "10px 0",
                    fontWeight: "bold",
                    marginLeft: "6rem",
                  }}>{item1.product.name}</h3>):null):null}
                <p
                  style={{
                    fontSize: "15px",
                    padding: "10px 0",
                    fontWeight: "400px",
                    marginLeft: "6rem",
                  }}
                >
                  Quantity : {myOrderDetails.details ? myOrderDetails.details.quantity : null}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    padding: "10px 0",
                    fontWeight: "400px",
                    marginLeft: "6rem",
                  }}
                >
                  Total : ₹ {myOrderDetails.details ? myOrderDetails.details.total : null}
                </p>
              </div>
              <div className="col-sm-5">
                <p
                  style={{
                    fontSize: "15px",
                    padding: "10px 0",
                    fontWeight: "400px",
                  }}
                >
                  Order # : {myOrderDetails.details ? myOrderDetails.details.number : null}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    padding: "10px 0",
                    fontWeight: "400px",
                  }}
                >
                  Order Status : {myOrderDetails.details ? myOrderDetails.details.status : null}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    padding: "10px 0",
                    fontWeight: "400px",
                  }}
                >
                  Payment Mode : {myOrderDetails.details ? myOrderDetails.details.paymentMode : null}
                </p>
              </div>
              <div className="col-sm-2">
                <Link>
                  <a href="#" className="btn btn-primary">
                    Cancel Order
                  </a>
                </Link>
              </div>
            </div>
            <hr />
            <div
              className="row"
              style={{ height: "230px", alignItem: "center" }}
            >
              <div className="col-sm-6">
                <h4
                  style={{
                    color: "#ce3838",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginLeft: "3rem",
                  }}
                >
                  SHIPPING DETAILS : 
                </h4>
                <p
                  style={{
                    fontSize: "18px",
                    marginBottom:"25px",
                    fontWeight: "400px",
                    marginLeft: "3rem",
                  }}
                >
                  {myOrderDetails.details ? myOrderDetails.details.address.shipping.name : null}<br/>
                  {myOrderDetails.details ? myOrderDetails.details.address.shipping.address : null}<br/>
                  {myOrderDetails.details ? myOrderDetails.details.address.shipping.pinCode : null}
                </p>
                <h4
                  style={{
                    color: "#ce3838",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginLeft: "3rem",
                  }}
                >
                  MOBILE : 
                </h4>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "400px",
                    marginLeft: "3rem",
                  }}
                >
                  {myOrderDetails.details ? myOrderDetails.details.address.shipping.mobile : null}<br/>
                </p>
              </div>
            </div>
            <hr />
            <div
              className="row"
              style={{ height: "230px", alignItem: "center" }}
            >
              <div className="col-sm-6">
                <h4
                  style={{
                    color: "#ce3838",
                    fontSize: "22px",
                    fontWeight: "bold",
                    marginLeft: "3rem",
                  }}
                >
                  PRICE DETAILS : 
                </h4>
                <p
                  style={{
                    fontSize: "18px",
                    padding: "10px 0",
                    fontWeight: "400px",
                    marginLeft: "4rem",
                  }}
                >
                  Price Subtotal : ₹ {myOrderDetails.details ? myOrderDetails.details.subTotal : null}
                </p>
                <p
                  style={{
                    color: "red",
                    fontSize: "18px",
                    padding: "10px 0",
                    fontWeight: "400px",
                    marginLeft: "4rem",
                  }}
                >
                  Tax : ₹ {myOrderDetails.details ? myOrderDetails.details.tax : null}
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    padding: "10px 0",
                    fontWeight: "400px",
                    marginLeft: "4rem",
                  }}
                >
                  Delivery Fee : Free
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    padding: "10px 0",
                    fontWeight: "400px",
                    marginLeft: "4rem",
                  }}
                >
                  Total Amount : ₹ {myOrderDetails.details ? myOrderDetails.details.total : null}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ))
          : null} */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      myOrderDetails: state.MyOrders.myOrderDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewMyOrderDetails: (orderNumber) => dispatch(viewMyOrderDetails(orderNumber)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps)(ViewMyOrderDetails);


