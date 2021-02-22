import React, { Component } from 'react'
import './Payment.css';
import {Link} from 'react-router-dom'

 const  PaymentNavigation = (props) => {
  
    return (
      <React.Fragment>
        <div className="row tabin">
          <div className="col-md-10">
            {/* <Link
              to="/seller/dashboard/payments/summary"
              className={
                props.activeTab1 ? "btn tablinks active" : "btn tablinks"
              }
            >
              Payments Overview
            </Link> */}
            <Link
              to="/seller/dashboard/payments/previous-payment"
              className={
                props.activeTab2 ? "btn tablinks active" : "btn tablinks"
              }
            >
               Payments History
            </Link>
            <Link
              to="/seller/dashboard/payments/order-transaction"
              className={
                props.activeTab3 ? "btn tablinks active" : "btn tablinks"
              }
            >
              Transactions
            </Link>
          </div>
        </div>
        <hr className="navhr" />
      </React.Fragment>
    );
}

export default PaymentNavigation;

