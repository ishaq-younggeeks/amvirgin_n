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

class Return extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getAllReturnOrders();
  }

  render() {
    const { isFetching } = this.props;
    return (
      <>
        <div className="row" style={{ padding: "20px", marginTop: "5%" }}>
        <div>
        <h2>Return</h2>
        </div>
          <Table
            striped
            bordered
            hover
            size="sm"
            style={{ marginRight: "22px", marginTop:"10px" }}
          >
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Description</th>
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
                {this.props.returnOrders &&
                  Array.from(this.props.returnOrders).map((data, i) => (
                    <tr key={i}>
                      <td>{data.customer.name}</td>
                      <td>{data.item.product.name}</td>
                      <td>{data.item.product.description}</td>
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
                              this.props.approveReturn([data.key])
                            }}
                          ></button>
                          <button
                            className="fa fa-close disApprove-btn"
                            onClick={() => {
                              this.props.disApproveReturn([data.key])
                            }}
                          ></button>
                          {data.key}
                        </td>
                      ) : (
                        <td style={{ fontWeight: "bold" }}>
                          N/A
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            ) : (
              <tbody>
                    <div className="loaderHorizontal">
                      <Loader
                        type="ThreeDots"
                        color="#000"
                        height={100}
                        width={100}
                      />
                    </div>
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
