import React, { Component } from "react";
// import './Payment.css';
import { Link } from "react-router-dom";

const  AdvtNavigation = (props) => {
    return (
      <React.Fragment>
        <div class="row tabin ">
          <div className="col-md-10">
            <Link
              to="/seller/dashboard/advertisement"
              className={
                props.activeTab1 ? "btn tablinks active" : "btn tablinks"
              }
            >
              Advertisement Home
            </Link>
            <Link
              to="/seller/dashboard/advertisement/create-advt"
              className={
                props.activeTab2 ? "btn tablinks active" : "btn tablinks"
              }
            >
              Create Advertisement
            </Link>
          </div>
        </div>
        <hr className="navhr" />
      </React.Fragment>
    );
}

export default  AdvtNavigation;
