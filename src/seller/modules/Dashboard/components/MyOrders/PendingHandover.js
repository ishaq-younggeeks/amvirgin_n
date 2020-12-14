import React, { Component } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import { Helmet } from "react-helmet";
import Modal from "react-modal";
import "./MyOrders.css";

import { downloadLabel, downloadManifest } from "./global";
import { date } from "yup";
import { data } from "jquery";

export default class PendingHandover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      numrow: "",
      fetchError: null,
      searching: null,
      items: [],
      search: false,
      pagination: 10,
      bulkArray: [],
      selectAll: false,
      modalIsOpen1: false,
      modalIsOpen2: false,
      courier: "",
      bill: "",
      dispatchDate: new Date,
      courierError: "",
      billError: "",
      dispatchDateError: "",
      orderId: "",
    };

    this.openModal1 = this.openModal1.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.closeModal1 = this.closeModal1.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
  }

  onchangeBulkHandler = (e, orderid) => {
    let bulk_list = this.state.bulkArray;
    let check = e.target.checked;
    if (check) {
      this.setState(
        {
          bulkArray: [...this.state.bulkArray, orderid],
        },
        console.log("list state", this.state)
      );
    } else {
      var index = this.state.bulkArray.indexOf(orderid);
      if (index > -1) {
        bulk_list.splice(index, 1);
        this.setState(
          {
            bulkArray: bulk_list,
          },
          console.log("list state", this.state)
        );
      }
    }
  };

  selectAllOrder = (e) => {
    let bulk_array;
    bulk_array = this.props.ordersList.map((item, index) => {
      return item.key;
    });
    let check = e.target.checked;
    if (check) this.setState({ selectAll: true, bulkArray: bulk_array });
    else this.setState({ selectAll: true, bulkArray: [] });
  };

  changeStatus = () => {
    this.props.changeOrderStatus(this.state.bulkArray, "dispatched");
    this.setState({ bulkArray: [] });
  };

  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  openModal1() {
    this.setState({
      modalIsOpen1: true,
    });
  }

  closeModal1() {
    this.setState({
      modalIsOpen1: false,
    });
  }

  openModal2() {
    this.setState({
      modalIsOpen2: true,
      modalIsOpen1: false,
    });
  }

  closeModal2() {
    this.setState({
      modalIsOpen2: false,
      courier: "",
      bill: "",
      dispatchDate: "",
      courierError: "",
      billError: date,
      dispatchDateError: "",
    });
  }

  validate = () => {
    let courierError = "";
    let billError = "";
    let dispatchDateError = "";

    if (!this.state.courier.trim()) {
      courierError = "Field cannot be blank";
    }
    if (!this.state.bill.trim()) {
      billError = "Field cannot be blank";
    }
    if (!/^((19|20)?[0-9]{2})[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])*$/.test(this.state.dispatchDate)) {
      dispatchDateError = "Field cannot be blank";
    }

    if (courierError || billError || dispatchDateError) {
      this.setState({
        courierError,
        billError,
        dispatchDateError,
      });
      return false;
    }
    return true;
  };

  handleOnChangeModal = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitModal = (e, key) => {
    e.preventDefault();
    let isValid = this.validate();
    if (isValid) {
      let status = "dispatched";
      let shippingMethod = "seller";
      let courierName = this.state.courier;
      let airwayBillNumber = this.state.bill;
      let dispatchedOn = this.state.dispatchDate;
      let date = new Date(); 
      let hours = date.getHours();
      let min = date.getMinutes();
      let seconds = date.getSeconds();
      let time = hours + ":" + min + ":" + seconds;
      dispatchedOn = dispatchedOn + " " + time;
      // this.props.changeOrderStatus(
      //   [key],
      //   status,
      //   shippingMethod,
      //   courierName,
      //   airwayBillNumber,
      //   dispatchedOn
      // );
      console.log("Date ", dispatchedOn );
      this.closeModal2();
    }
  };

  render() {
    return (
      <React.Fragment>
        <hr />
        {/* <div className="row" style={{ marginLeft: "15px" }}>
          <div style={{ padding: "5px" }}>Action in Bulk</div>

          <button
            className="btn btn-outline-primary"
            onClick={this.changeStatus}
            style={{ marginLeft: "10px" }}
            disabled={this.state.bulkArray.length === 0 ? true : false}
          >
            Mark Dispatched
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => downloadLabel(this.state.bulkArray)}
            style={{ marginLeft: "10px" }}
            disabled={this.state.bulkArray.length === 0 ? true : false}
          >
            Reprint Label
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => downloadManifest(this.state.bulkArray)}
            style={{ marginLeft: "10px" }}
            disabled={this.state.bulkArray.length === 0 ? true : false}
          >
            Manifest <i className="fas fa-download" />
          </button>
        </div> */}
        <div className="row" style={{ padding: "20px" }}>
          <Filter
            metaData={this.props.metaData}
            maxPage={this.props.maxPage}
            myOrderList={this.props.myOrderList}
            activeState={this.props.activeState}
            {...this.props}
          />

          <br />
          <br />
          <table className="tablelist" style={{ width: "100%" }}>
            <thead>
              <tr>
                {/* <th>
                  <input
                    type="checkbox"
                    style={{ width: "15px" }}
                    onChange={this.selectAllOrder}
                  ></input>
                </th> */}
                <th>OrderId</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.props.ordersList &&
                Array.from(this.props.ordersList).map((data, i) =>
                  i <= this.state.pagination - 1 ? (
                    <tr key={data.key}>
                      {/* <td className="checkbox">
                        <input
                          type="checkbox"
                          style={{ width: "15px" }}
                          onChange={(e) =>
                            this.onchangeBulkHandler(e, data.key)
                          }
                          checked={
                            this.state.bulkArray.indexOf(data.key) === -1
                              ? false
                              : true
                          }
                        ></input>
                      </td> */}
                      <td>{data.key}</td>
                      <td>{data.quantity}</td>
                      <td>{data.orderDate}</td>
                      <td>{data.status}</td>
                      <td>
                        <button
                          className="btn toolnewtip"
                          onClick={() => {
                            localStorage.setItem("orderId", data.key);
                          }}
                        >
                          <Link to="/seller/dashboard/vieworders">
                            <i className="fas fa-eye" />
                            <span className="tooltiptext">View</span>
                          </Link>
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => {
                            this.setState({ orderId: data.key });
                            this.openModal1();
                          }}
                          style={{ marginLeft: "10px" }}
                        >
                          Mark Dispatched
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => downloadLabel([data.key])}
                          style={{ marginLeft: "10px" }}
                        >
                          Reprint Label
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => downloadManifest([data.key])}
                          style={{ marginLeft: "10px" }}
                        >
                          Manifest <i className="fas fa-download" />
                        </button>
                      </td>
                    </tr>
                  ) : null
                )}
            </tbody>
          </table>
          <div>
            <Modal
              isOpen={this.state.modalIsOpen1}
              onRequestClose={this.closeModal1}
              style={this.customStyles}
              ariaHideApp={false}
            >
              <div className="dispatch-btn">
              
                <h3>Dispatch Options :</h3>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "10px 12px",
                  }}
                  onClick={this.openModal2}
                >
                  Fullfilment By Merchant
                </button>
                <button
                  style={{
                    margin: "8px 10px",
                    padding: "10px 48px",
                  }}
                  onClick={() => {
                    this.props.changeOrderStatus(
                      [this.state.orderId],
                      "dispatched",
                      "seller-smart"
                    );
                    this.closeModal1();
                  }}
                >
                  By Amvirgin
                </button>
                <button
                  style={{ padding: "10px 60px" }}
                  onClick={this.closeModal1}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              isOpen={this.state.modalIsOpen2}
              onRequestClose={this.closeModal2}
              style={this.customStyles}
              ariaHideApp={false}
            >
              <div>
                <h3>Fullfilment by Merchant :</h3>
              </div>
              <div>
                <form
                  noValidate
                  onSubmit={(e) =>
                    this.handleSubmitModal(e, this.state.orderId)
                  }
                >
                  <label
                    style={{ marginTop: "15px" }}
                    htmlFor="courier-name"
                    className="courier-name"
                  >
                    Courier Name :
                  </label>
                
                  <input
                    type="text"
                    name="courier"
                    id="courier-name"
                    placeholder="Enter Courier Name"
                    maxLength="50"
                    value={this.state.courier}
                    onChange={this.handleOnChangeModal}
                  />
                  <div className="error">
                    <p>{this.state.courierError}</p>
                  </div>
                  <label
                    style={{ marginTop: "15px" }}
                    htmlFor="airway-bill"
                    className="airway-bill"
                  >
                    Airway Bill Number :
                  </label>
                  <input
                    type="number"
                    name="bill"
                    id="airway-bill"
                    placeholder="Enter Airway Bill Number"
                    maxLength="50"
                    value={this.state.bill}
                    onChange={this.handleOnChangeModal}
                  />
                  <div className="error">
                    <p>{this.state.billError}</p>
                  </div>
                  <label
                    style={{ marginTop: "15px" }}
                    htmlFor="dispatch-date"
                    className="dispatch-date"
                  >
                    Dispatch Date :
                  </label>
                  <input
                    type="date"
                    name="dispatchDate"
                    id="dispatch-date"
                    required
                    value={this.state.dispatchDate}
                    onChange={this.handleOnChangeModal}
                  />
                  <div className="error">
                    <p>{this.state.dispatchDateError}</p>
                  </div>
                  <div className="dispatch-btn">
                    <button
                      style={{
                        marginTop: "12px",
                        padding: "10px 26px",
                      }}
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      style={{
                        marginLeft: "10px",
                        marginTop: "10px",
                        padding: "10px 32px",
                      }}
                      onClick={this.closeModal2}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
        <div id="qr" style={{ display: "none" }}></div>
      </React.Fragment>
    );
  }
}
