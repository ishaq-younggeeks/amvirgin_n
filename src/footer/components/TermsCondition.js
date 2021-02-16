import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../entertainment/modules/Footer";
import {termsCondition} from "./FooterAction";
import ReactHtmlParser from 'react-html-parser';
import Header from "../../entertainment/modules/Header";

class TermsCondition extends Component {

  componentDidMount = () => {
    this.props.termsCondition();
  }

  render() {
    return (
      <>
      <Header />
      <div className="container-fluid blogsection specific mt-5">
      {ReactHtmlParser(this.props.termsConditionData)}
      </div>
      <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    termsConditionData: state.Footer.termsCondition
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    termsCondition: () => dispatch(termsCondition())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TermsCondition);
