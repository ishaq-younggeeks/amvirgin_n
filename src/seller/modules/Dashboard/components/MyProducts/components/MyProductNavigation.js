import React, { Component } from 'react'
import {Link} from 'react-router-dom'

 const  MyOrderNavigation = (props) => {
  
    return (
      <React.Fragment>
        <div class="row tabin">
          <div className="col-md-10">
            <Link
              to="/seller/dashboard/myproducts"
              className={
                props.activeTab1 ? "btn tablinks active" : "btn tablinks"
              }
            >
              My Listing
            </Link>
            <Link
              to="/seller/dashboard/brandlist"
              className={
                props.activeTab2 ? "btn tablinks active" : "btn tablinks"
              }
            >
              Track Approval Request
            </Link>
            
          </div>
        </div>
        <hr className="navhr" />
      </React.Fragment>
    );
}

export default MyOrderNavigation;

