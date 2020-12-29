import React, { Component } from "react";
import {
  approveReturn,
  disApproveReturn,
  getAllReturnOrders,
} from "./ReturnAction";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import Loader from "react-loader-spinner";
import "./Return.css";
import { data } from "jquery";

class Return extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    this.props.getAllReturnOrders();
  }

  searching = (e) => {
    e.preventDefault();
    this.setState({
      search:e.target.value
    })
  }

  render() {
    const { isFetching } = this.props;
    let allReturnOrders = Array.from(this.props.returnOrders).filter((data) => {
      if(this.state.search === "")
      return data;
      if(data.order.key == this.state.search){
        return data;
      }
    });
    return (
      <>
        <div style={{ marginTop: "5%", width: "100%" }}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <h2 style={{marginTop:"5px"}}>Return</h2>
          <div style={{display: "flex", alignItems:"center"}}><label htmlFor="search" className="search" style={{margin:"0 5px 0 0"}}>Search Here:</label>
            <form onSubmit={this.onSubmit}>
              <input
                type="search"
                name="search"
                id="search"
                onChange={this.searching}
                placeholder="Enter Order ID"
                style={{
                  width: "70%",
                  borderRadius: "5px",
                  height: "37px",
                  background: "#efefef",
                  padding: "10px",
                  margin: "5px 0",
                  border: "none",
                }}
              />
            </form>
          </div>
        </div>
        </div>
        <hr />
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Amount</th>
                <th>Return / Replacement</th>
                <th>Action</th>
              </tr>
            </thead>
            {!isFetching ? (
              <tbody>
                {allReturnOrders &&
                  allReturnOrders.map((data, i) => (
                    <tr key={i}>
                      <td>{data.customer.name}</td>
                      <td>{data.item.product.name}</td>
                      <td>{data.order.key}</td>
                      <td>{data.item.quantity}</td>
                      <td>{data.raised}</td>
                      <td>{data.reason}</td>
                      <td>{data.item.total}</td>
                      <td>{data.item.returnType}</td>
                      {data.status === "pending" ? (
                        <td>
                          <button
                            className="fas fa-check approve-btn"
                            onClick={() => {
                              this.props.approveReturn(data.key);
                              this.props.getAllReturnOrders();
                            }}
                          ></button>
                          <button
                            className="fa fa-close disApprove-btn"
                            onClick={() => {
                              this.props.disApproveReturn(data.key);
                              this.props.getAllReturnOrders();
                            }}
                          ></button>
                        </td>
                      ) : (
                        <td style={{ fontWeight: "bold" }}>N/A</td>
                      )}
                    </tr>
                  ))}
              </tbody>
            ) : (
              <tbody className="loaderHorizontal">
                <Loader
                  type="ThreeDots"
                  color="#000"
                  height={100}
                  width={100}
                  style={{ marginTop: "30px" }}
                />
              </tbody>
            )}
          </Table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    returnOrders: state.sellerReturn.returnOrders,
    isFetching: state.sellerReturn.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllReturnOrders: () => dispatch(getAllReturnOrders()),
    approveReturn: (key) => dispatch(approveReturn(key)),
    disApproveReturn: (key) => dispatch(disApproveReturn(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Return);
