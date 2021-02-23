import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../../entertainment/modules/Header";
import SubMenu from "../Home/components/SubMenu";
import { viewMyOrderDetails, orderCancellation } from "./ViewMyOrdersAction";
import Modal from "react-modal";
import "./ViewMyOrders.css";

class ViewMyOrderDetails extends Component {
  constructor() {
    super();
    this.state = {
      OrderNumber: "",
      modalIsOpen: false,
      cReason: "",
      cReasonError: "",
      statusClass: "c4"
    };
  }

  componentDidMount = () => {
    let orderNumberStatus = localStorage.getItem("OrderNumber");
    console.log("Status :", orderNumberStatus);
    let num = orderNumberStatus.charAt(0);
    this.props.viewMyOrderDetails(num);
    let status = orderNumberStatus.substring(1);
    console.log("Status", status); 
    if(status === "placed"){
      this.setState({
        statusClass: "c0"
      })
    }
    if(status === "dispatched"){
      this.setState({
        statusClass: "c1"
      })
    }
    if(status === "out-for-delivery"){
      this.setState({
        statusClass: "c2"
      })
    }
    if(status === "delivered"){
      this.setState({
        statusClass: "c3"
      })
    }
    if(status === "cancelled"){
      this.setState({
        statusClass: "c5"
      })
    }
  };
  
  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  closeModal = (e) => {
    e.preventDefault();
    this.setState({
      modalIsOpen: false,
    });
  };

  customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  cancellationOnChange = (e) => {
    e.preventDefault();
    this.setState({
      cReason: e.target.value,
    });
  };

  validate = () => {
    let cReasonError = "";
    if (!this.state.cReason.trim()) {
      cReasonError = "Field cannot be empty!";
    }

    if (cReasonError) {
      this.setState({
        cReasonError,
      });
      return false;
    }
    return true;
  };

  onCancelRSubmit = (e) => {
    e.preventDefault();
    let isValid = this.validate();
    if (isValid) {
      let id = localStorage.getItem("OrderNumber");
      this.props.orderCancellation(id, this.state.cReason);
      this.setState({
        cReason: "",
        cReasonError: "",
      });
    }
  };

  render() {
    const { myOrderDetails, cancelReasonRes } = this.props;
    console.log("Order Details : ", myOrderDetails);
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
                ) : (
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
                            <h3
                              style={{
                                color: "#ce3838",
                                fontSize: "19px",
                                padding: "10px 0",
                                fontWeight: "bold",
                                marginLeft: "6rem",
                              }}
                            >
                             "product name"
                            </h3>

                <p
                  style={{
                    fontSize: "15px",
                    padding: "10px 0",
                    fontWeight: "400px",
                    marginLeft: "6rem",
                  }}
                >
                  Quantity :{" "}
                  {myOrderDetails.details
                    ? myOrderDetails.details.quantity
                    : null}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    padding: "10px 0",
                    fontWeight: "400px",
                    marginLeft: "6rem",
                  }}
                >
                  Total : ₹{" "}
                  {myOrderDetails.details ? myOrderDetails.details.total : null}
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
                  Order # :{" "}
                  {myOrderDetails.details
                    ? myOrderDetails.details.number
                    : null}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    padding: "10px 0",
                    fontWeight: "400px",
                  }}
                >
                  Order Status : {" "}
                  {myOrderDetails.details
                    ? myOrderDetails.details.status
                    : null}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    padding: "10px 0",
                    fontWeight: "400px",
                  }}
                >
                  Payment Mode :{" "}
                  {myOrderDetails.details
                    ? myOrderDetails.details.paymentMode
                    : null}
                </p>
              </div>
              <div className="col-sm-2">
                {myOrderDetails.details &&
                myOrderDetails.details.status != "cancelled" ? (
                  <Link>
                    <a
                      href="#"
                      className="btn btn-primary"
                      onClick={() => this.openModal()}
                    >
                      Cancel Order
                    </a>
                  </Link>
                ) : (
                  <h4 style={{ color: "#ce3838", fontWeight: "bold" }}>
                    Your Order has been cancelled!
                  </h4>
                )}
              </div>
            </div>
            <hr />
            <div
              className="row"
              style={{ height: "300px", alignItem: "center" }}
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
                  ORDER TRACKING :
                </h4>
              </div>
              {this.state.statusClass !== "c5" ?
              <div className="row shop-tracking-status" style={{width:"80%", margin:"0 0 0 9rem"}}>
                  <div className="col-md-12">
                    <div className="order-status">
                      <div
                        className="order-status-timeline list-group"
                        style={{ width: "100%" }}
                      >
                        <div className={this.state.statusClass + ' ' + 'order-status-timeline-completion'}></div>
                      </div>

                      <div className="image-order-status image-order-status-new active img-circle">
                        <span className="status">Placed</span>
                        <div className="icon"></div>
                      </div>
                      <div className="image-order-status image-order-status-active active img-circle">
                        <span className="status">Dispatched</span>
                        <div className="icon"></div>
                      </div>
                      <div className="image-order-status image-order-status-intransit active img-circle">
                        <span className="status">Out-for-Delivery</span>
                        <div className="icon"></div>
                      </div>
                      <div className="image-order-status image-order-status-completed active img-circle">
                        <span className="status">Completed</span>
                        <div className="icon"></div>
                      </div>
                    </div>
                </div>
              </div>: <div className="row shop-tracking-status" style={{width:"80%", margin:"0 0 0 9rem"}}>
                  <div className="col-md-12">
                    <div className="order-status">
                      <div
                        className="order-status-timeline list-group"
                        style={{ width: "100%" }}
                      >
                        <div className={'c5 order-status-timeline-cancelled'}></div>
                      </div>

                      <div className="image-order-status image-order-status-new active img-circle">
                        <span className="status">Placed</span>
                        <div className="icon"></div>
                      </div>
                      <div className="image-order-status image-order-status-completed active img-circle">
                        <span className="status">Cancelled</span>
                        <div className="icon"></div>
                      </div>
                    </div>
                </div>
              </div>}
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
                    marginBottom: "25px",
                    fontWeight: "400px",
                    marginLeft: "3rem",
                  }}
                >
                  {myOrderDetails.details
                    ? myOrderDetails.details.address.shipping.name
                    : null}
                  <br />
                  {myOrderDetails.details
                    ? myOrderDetails.details.address.shipping.address
                    : null}
                  <br />
                  {myOrderDetails.details
                    ? myOrderDetails.details.address.shipping.pinCode
                    : null}
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
                  {myOrderDetails.details
                    ? myOrderDetails.details.address.shipping.mobile
                    : null}
                  <br />
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
                  Price Subtotal : ₹{" "}
                  {myOrderDetails.details
                    ? myOrderDetails.details.subTotal
                    : null}
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
                  Tax : ₹{" "}
                  {myOrderDetails.details ? myOrderDetails.details.tax : null}
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
                  Total Amount : ₹{" "}
                  {myOrderDetails.details ? myOrderDetails.details.total : null}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={this.customStyles}
            ariaHideApp={false}
          >
            <h4 style={{ color: "#ce3838" }}>Cancellation Reason :</h4>
            <hr style={{ color: "#ce3838", borderColor: "#ce3838" }} />
            <form noValidate onSubmit={this.onCancelRSubmit}>
              <input
                type="text"
                placeholder="Your Cancellation Reason"
                autoFocus
                onChange={this.cancellationOnChange}
                value={this.state.cReason}
                required
              />
              <p style={{ color: "red" }}>{this.state.cReasonError}</p>
              <button
                style={{
                  padding: "5px 25px 5px 25px",
                  backgroundColor: "#ce3838",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  marginTop: "30px",
                }}
                type="submit"
              >
                Submit
              </button>
            </form>
            {cancelReasonRes ? (
              <p style={{ color: "#ce3838" }}>{cancelReasonRes}</p>
            ) : null}
          </Modal>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myOrderDetails: state.MyOrders.myOrderDetails,
    cancelReasonRes: state.MyOrders.cancelReason,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewMyOrderDetails: (orderNumber) =>
      dispatch(viewMyOrderDetails(orderNumber)),
    orderCancellation: (orderId, reason) =>
      dispatch(orderCancellation(orderId, reason)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMyOrderDetails);
