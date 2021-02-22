import React, { Component } from "react";
import { Link } from "react-router-dom";
import qs from "query-string";

export default class ListingType extends Component {
  queryString = (type) => {
    const query = { listing: type };
    const searchString = qs.stringify(query);
    return searchString;
  };

  render() {
    return (
      <div className="container-fluid" style={{ marginTop: "6%" }}>
        <div>
          <h3>Add New Product</h3>
        </div>
        <hr />
        <div className="categorycontainer myprocontainer" style={{textAlign:"center"}}>
          <div className="w-50 ">
            <div>
              <Link
                className="btn btn-primary"
                to={{
                  pathname: `/seller/dashboard/selectcategory`,
                  search: this.queryString("single"),
                }}
              >
                Add Single Product
              </Link>
            </div>
          </div>
          <div className="w-50">
            <div>
              <Link
                className="btn btn-primary"
                to={{
                  pathname: `/seller/dashboard/selectcategory`,
                  search: this.queryString("bulk"),
                }}
              >
                Add Product In Bulk
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
