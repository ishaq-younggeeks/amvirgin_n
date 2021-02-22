import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../../entertainment/modules/Header";
import SubMenu from "../Home/components/SubMenu";
import { getAllMyOrders } from "./ViewMyOrdersAction";
import ViewMyOrderDetails from "./ViewMyOrderDetails"

class ViewMyOrders extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    this.props.getAllMyOrders("1");
  };

  render() {
    const { allMyOrders } = this.props;
    console.log("My Orders :", allMyOrders);
    return (
      <>
        <Header />
        <SubMenu {...this.props} />
        <div style={{ margin: "2rem 2rem 0 2rem" }}>
          <h3 style={{ color: "#ce3838" }}>My Orders <span style={{color:"black"}}>{">"}</span></h3>
          <hr
            style={{
              color: "red",
              backgroundColor: "#ce3838",
              height: 1,
              borderColor: "#ce3838",
            }}
          />
        </div>
        {allMyOrders && allMyOrders.length
          ? allMyOrders.map((item1, i) => (
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
                      {item1.details.image ? (
                        <img
                          src={item1.details.image}
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
                      {item1.subOrders
                        ? item1.subOrders.map((item2) =>
                            item2.items
                              ? item2.items.map((item3) => (
                                  <p
                                    style={{
                                      fontSize: "18px",
                                      padding: "10px 0",
                                      fontWeight: "400px",
                                      marginLeft: "6rem",
                                    }}
                                  >
                                    {item3.product.name}
                                  </p>
                                ))
                              : null
                          )
                        : null}
                      <p
                        style={{
                          fontSize: "15px",
                          padding: "10px 0",
                          fontWeight: "400px",
                          marginLeft: "6rem",
                        }}
                      >
                        Quantity : {item1.details.quantity}
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          padding: "10px 0",
                          fontWeight: "400px",
                          marginLeft: "6rem",
                        }}
                      >
                        Total : ₹ {item1.details.total}
                      </p>
                    </div>
                    <div className="col-sm-4">
                      <p
                        style={{
                          fontSize: "17px",
                          padding: "10px 0",
                          fontWeight: "400px",
                        }}
                      >
                        Order # : {item1.details.number}
                      </p>
                      <p
                        style={{
                          fontSize: "17px",
                          padding: "10px 0",
                          fontWeight: "400px",
                        }}
                      >
                        Date : {item1.details.placed}
                      </p>
                      <p
                        style={{
                          fontSize: "17px",
                          padding: "10px 0",
                          fontWeight: "400px",
                        }}
                      >
                        Status : <span style={{ color:item1.details.status === "cancelled" ? "#ce3838" : "green" }}>{item1.details.status}</span>
                      </p>
                    </div>
                    <div className="col-sm-3">
                    <a href="#" onClick={() => localStorage.setItem("OrderNumber", item1.key + item1.details.status)}>
                      <Link to="/myprofile/myOrders/orderDetails">
                        <a href="#" className="btn btn-primary">
                          Order Details
                        </a>
                      </Link>
                    </a>
                    <a className="ml-3" href="#" onClick={() => localStorage.setItem("OrderNumber", item1.key)}>
                      <Link to="/myprofile/myOrders/review">
                        <a href="#" className="btn btn-primary">
                          Add a review
                        </a>
                      </Link>
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allMyOrders: state.MyOrders.myOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMyOrders: (page) => dispatch(getAllMyOrders(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMyOrders);
