import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../../entertainment/modules/Header";
import SubMenu from "../Home/components/SubMenu";
import { getAllMyOrders } from "./ViewMyOrdersAction";
import ViewMyOrderDetails from "./ViewMyOrderDetails"
import OrderList from './OrderList';
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
        {}
        {allMyOrders && allMyOrders.length
          ? allMyOrders.map((item, i) => (
            <OrderList  items={item}/>
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
