import "./MyOrders.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { ViewOrderItem } from "./sellerOrderAction";
import { VIEW_ORDER } from "./sellerOrderConstant";

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
      <div className="card ordercard ordertable" style={{ padding: "0px 0" }}>
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
            <div className="col col-auto">
              <div>Customer Name:{viewOrder.customer.name}</div>
            </div>
            <div style={{ color: "dodgerblue", marginTop: "20px" }}>
              Order Details:
            </div>
            <table className="tablelist" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Product name</th>
                  <th>Product Category</th>
                  <th>Original price</th>
                  <th>Selling price</th>
                </tr>
              </thead>

              <tbody>
                {viewOrder.items.length
                  ? viewOrder.items.map((item) => {
                      return (
                        <tr key={item.product.key}>
                          <td>{item.quantity}</td>
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
                  : null}
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
