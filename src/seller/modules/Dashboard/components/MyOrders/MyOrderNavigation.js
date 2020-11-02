import React, { Component } from 'react'
import {Link} from 'react-router-dom'

 const  MyOrderNavigation = (props) => {
  
    return (
      <React.Fragment>
        <div class="row tabin">
          <div className="col-md-10">
            <Link
              to="/seller/dashboard/myorders?activeState=placed"
              className={
                props.activeTab1 ? "btn tablinks active" : "btn tablinks"
              }
            >
              My Orders
            </Link>
            <Link
              to="/seller/dashboard/myorders/returns-order?activeState=refund-processing"
              className={
                props.activeTab2 ? "btn tablinks active" : "btn tablinks"
              }
            >
              Returns
            </Link>
            <Link
              to="/seller/dashboard/myorders/cancelled-orders"
              className={
                props.activeTab3 ? "btn tablinks active" : "btn tablinks"
              }
            >
              Cancelled
            </Link>
          </div>
        </div>
        <hr className="navhr" />
      </React.Fragment>
    );
}

export default MyOrderNavigation;

