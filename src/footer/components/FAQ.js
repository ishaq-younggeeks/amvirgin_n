import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Footer from "../../entertainment/modules/Footer";
import {faqFnc} from "./FooterAction";
import ReactHtmlParser from 'react-html-parser';
import Header from '../../entertainment/modules/Header';

class FAQ extends Component {

    componentDidMount = () => {
      this.props.faqFnc();
    }
  
    render() {
      return (
        <>
        <Header />
        <div className="container-fluid blogsection specific mt-5">
        {ReactHtmlParser(this.props.faqData)}
        </div>
        <Footer />
        </>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return {
        faqData: state.Footer.faqData
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      faqFnc: () => dispatch(faqFnc())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
  
