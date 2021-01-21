import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../../style.css";
import {productData} from '../shoppingHomeReducer';

class FocusBrand extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log("Brands in Focus :", this.props.brandInFocus)
    return (
      <div className="shopFocus specific">
        <h3 className="bfocus">Brands in Focus</h3>
        <div className="brandsinfocus row">
          {this.props.brandInFocus
            ? this.props.brandInFocus.map((brandData, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="imgbrand" style={{marginBottom:"60px"}}>
                    <Link key={i} onClick={() => this.props.productData(brandData.key, null, null, this.props.history)}>
                      <img
                        src={
                          brandData.poster
                            ? brandData.poster
                            : process.env.PUBLIC_URL + "/img/default.png"
                        }
                        alt=""
                      />
                      <div id="ribbon">
                        <div className="info" id="content">
                          <h4>{brandData.name}</h4>
                          <h5>Upto 50% off </h5>
                        </div>
                      </div>
                    </Link>
                    </div>
                  </React.Fragment>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return ({})
};

const mapDispatchToProps = (dispatch) => {
  return({
    productData:(id,sortKey,currentPage,history) => dispatch(productData(id,sortKey,currentPage,history)),
  })
}

export default connect (mapStateToProps, mapDispatchToProps)(FocusBrand);
