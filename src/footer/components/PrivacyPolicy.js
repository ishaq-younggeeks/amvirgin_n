import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../entertainment/modules/Footer";
import {privacyPolicy} from "./FooterAction";
import ReactHtmlParser from 'react-html-parser';
import Header from "../../entertainment/modules/Header";

class PrivacyPolicy extends Component {

  componentDidMount = () => {
    this.props.privacyPolicy();
  }

  render() {
    return (
      <>
      <Header />
      <div className="container-fluid blogsection specific  mt-5">
      {ReactHtmlParser(this.props.privacyPolicyData)}
      </div>
      <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    privacyPolicyData: state.Footer.privacyPolicy
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    privacyPolicy: () => dispatch(privacyPolicy())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
