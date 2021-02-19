import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Footer from "../../shopping/modules/Home/components/FooterWhite";
import {shippingPolicyFnc} from "./FooterAction";
import ReactHtmlParser from 'react-html-parser';
import Header from '../../entertainment/modules/Header';

class ShippingPolicy extends Component {

    componentDidMount = () => {
      this.props.shippingPolicyFnc();
    }
  
    render() {
      return (
        <>
        <Header />
        <div className="container-fluid blogsection specific mt-5">
        {ReactHtmlParser(this.props.shippingPolicyData)}
        </div>
        <Footer />
        </>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return {
        shippingPolicyData: state.Footer.shippingPolicy
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      shippingPolicyFnc: () => dispatch(shippingPolicyFnc())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShippingPolicy);
  
