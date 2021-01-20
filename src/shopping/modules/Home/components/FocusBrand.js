import React, { Component } from "react";
import "../../../style.css";

class FocusBrand extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="shopFocus specific">
        <h3 className="bfocus">Brands in Focus</h3>
        <div className="brandsinfocus row">
          {this.props.brandInFocus
            ? this.props.brandInFocus.map((brandData, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="imgbrand" style={{marginBottom:"60px"}}>
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

export default FocusBrand;
