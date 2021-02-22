import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../entertainment/modules/Header";
import SubMenu from "../Home/components/SubMenu";

const AddReview = () => {
  return (
    <div>
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
        </div>
    </div>
  );
};

export default AddReview;


