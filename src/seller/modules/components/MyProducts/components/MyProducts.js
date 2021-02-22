import React, { Component } from "react";

import AllProducts from "./AllProducts";
import AddProduct from "./AddProduct";
import { connect } from "react-redux";

import "./MyProducts.css";

class MyProducts extends Component {
  state = {
    addProduct: false,
    editProduct:false
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className="myproductcontainer">
         <AllProducts {...this.props}/>
     </div>
    );
  }
}


export default MyProducts;
