import "./MyOrders.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { ViewOrderItem } from "./sellerOrderAction";
import { VIEW_ORDER } from "./sellerOrderConstant";
import { View } from "@react-pdf/renderer";

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderid: "",
    };
  }

  componentDidMount = () => {
    let id = localStorage.getItem("orderId");
    this.props.ViewOrderItem(id);
  };

  activeClass = () => {
    let cl = "btn btn-circle btn-primary";
    return cl;
  };

  defaultClass = () => {
    let cl = "btn btn-circle btn-default";
    return cl;
  };

  render() {
    const { viewOrder } = this.props;
    return (
      <div className="card ordercard ordertable" style={{ padding: "0px 0", height:"325px" }}>
        <div
          className=""
          style={{ background: "#efefefb8", padding: "10px 20px" }}
        >
          <button
            className="btn btn-outline-dark"
            onClick={this.props.history.goBack}
            style={{ marginRight: "10px" }}
          >
            <i className="fas fa-angle-double-left" /> Back
          </button>
        </div>
        {Object.keys(viewOrder).length ? (
          <div style={{ marginLeft: "10px" }}>
            <div style={{ color: "dodgerblue", marginTop: "20px" }}>
              Buyers Details:
            </div>
            <div>
              <div>Customer Name: {viewOrder.customer ? viewOrder.customer.name : null}</div>
            </div>
            <div>
              <div>Address: {viewOrder.address ? viewOrder.address.address : null}</div>
            </div>
            <div>
              <div>Contact: {viewOrder.address ? viewOrder.address.mobile : null}</div>
            </div>
            <div style={{ color: "dodgerblue", marginTop: "20px" }}>
              Order Details:
            </div>
            <table className="tablelist" style={{ width: "99.5%" }}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Product name</th>
                  <th>Product Category</th>
                  <th>Original price</th>
                  <th>Selling price</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{viewOrder ? viewOrder.key : null}</td>
                  <td>{viewOrder.items[0].product ? viewOrder.items[0].quantity : null}</td>
                  <td>{viewOrder ? viewOrder.placed : null}</td>
                  <td>{viewOrder.items[0].product ? viewOrder.items[0].product.name : null}</td>
                  <td>{viewOrder.items[0].product ? viewOrder.items[0].product.category : null}</td>
                  <td>{viewOrder.items[0].product ? viewOrder.items[0].product.originalPrice : null}</td>
                  <td>{viewOrder.items[0].product ? viewOrder.items[0].product.sellingPrice : null}</td>
                </tr>
                {/* {viewOrder.items.length
                  ? viewOrder.items.map((item) => {
                      return (
                        <tr key={item.product.key}>
                          <td>{item.customer ? item.customer.name : null}</td>
                          <td>{item.address ? item.address.address : null}</td>
                          <td>{item.customer ? item.customer.mobile : null}</td>
                          <td>{item.key}</td>
                          <td>{item.quantity}</td>
                          <td>{item.placed}</td>
                          <td>{item.product ? item.product.name : null}</td>
                          <td>{item.product ? item.product.category : null}</td>
                          <td>
                            {item.product ? item.product.originalPrice : null}
                          </td>
                          <td>
                            {item.product ? item.product.sellingPrice : null}
                          </td>
                        </tr>
                      );
                    })
                  : null} */}
              </tbody>
            </table>
          </div>
        ) : null}
        {/* {viewOrder.transitions?
    <div className="stepwizard col-md-offset-3" style={{background:"black",marginTop:"20px",}}>  
                    <div className="stepwizard-row setup-panel">
                        <div className="stepwizard-step">
                            <div   className={ viewOrder.transitions.Cancelled==='cancelled'?this.activeClass():this.defaultClass()}>1</div>
                            <p>placed</p>
                        </div>
                        <div className="stepwizard-step">
                            <div   className={ viewOrder.transitions.Cancelled==='cancelled'?this.activeClass():this.defaultClass()}>2</div>
                            <p>ready for dispatch</p>
                        </div>
                        <div className="stepwizard-step">
                            <div   className={ viewOrder.transitions.Dispatched==='dispatched'?this.activeClass():this.defaultClass()}>3</div>
                            <p>Dispatched</p>
                        </div>
                        <div className="stepwizard-step">
                            <div   className={ viewOrder.transitions.Cancelled==='cancelled'?this.activeClass():this.defaultClass()}>4</div>
                            <p>return</p>
                        </div>
                        
                    </div>
                </div> :null} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("view order", state.sellerOrders.viewOrder);
  return {
    viewOrder: state.sellerOrders.viewOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ViewOrderItem: (id) => dispatch(ViewOrderItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);
