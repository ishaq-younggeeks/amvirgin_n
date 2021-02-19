import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Footer from "../../shopping/modules/Home/components/FooterWhite";
import {cancellationPolicyFnc} from "./FooterAction";
import ReactHtmlParser from 'react-html-parser';
import Header from '../../entertainment/modules/Header';

class CancellationPolicy extends Component {

    componentDidMount = () => {
      this.props.cancellationPolicyFnc();
    }
  
    render() {
      return (
        <>
        <Header />
        <div className="container-fluid blogsection specific mt-5">
        {ReactHtmlParser(this.props.cancelPolicyData)}
        </div>
        <Footer />
        </>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return {
        cancelPolicyData: state.Footer.cancelPolicy
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        cancellationPolicyFnc: () => dispatch(cancellationPolicyFnc())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CancellationPolicy);
  
