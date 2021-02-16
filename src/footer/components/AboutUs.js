import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Footer from "../../entertainment/modules/Footer";
import {aboutUs} from "./FooterAction";
import ReactHtmlParser from 'react-html-parser';
import Header from '../../entertainment/modules/Header';

class AboutUs extends Component {

    componentDidMount = () => {
      this.props.aboutUs();
    }
  
    render() {
      return (
        <>
        <Header />
        <div className="container-fluid blogsection specific mt-5">
        {ReactHtmlParser(this.props.aboutUsData)}
        </div>
        <Footer />
        </>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      aboutUsData: state.Footer.aboutUs
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      aboutUs: () => dispatch(aboutUs())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
  
