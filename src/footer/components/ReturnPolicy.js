import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Footer from "../../entertainment/modules/Footer";
import {returnPolicyFnc} from "./FooterAction";
import ReactHtmlParser from 'react-html-parser';
import Header from '../../entertainment/modules/Header';

class ReturnPolicy extends Component {

    componentDidMount = () => {
      this.props.returnPolicyFnc();
    }
  
    render() {
      return (
        <>
        <Header />
        <div className="container-fluid blogsection specific mt-5">
        {ReactHtmlParser(this.props.returnPolicyData)}
        </div>
        <Footer />
        </>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return {
        returnPolicyData: state.Footer.returnPolicy
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        returnPolicyFnc: () => dispatch(returnPolicyFnc())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ReturnPolicy);
  
