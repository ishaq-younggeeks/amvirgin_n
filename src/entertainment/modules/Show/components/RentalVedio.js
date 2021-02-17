import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Footer from "../../../../shopping/modules/Home/components/FooterWhite";
import Header from '../../Header';
import { rentCheckout } from "./ShowAction";
import { Helmet } from "react-helmet";
import {Link} from 'react-router-dom'
const RentalVedio = (props) => {


  useEffect(() => {

  }, [])

  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />
          <title>Amvirgin | Collection</title>
        </Helmet>
        <Header />
        <div className="bodysection">
          <div className="videocollection container">
            <h6> {"efg"} </h6>

            <div className="row">
              {/* {this.props.collectionDetail.length &&
                this.props.collectionDetail.map((collection, index) => {
                  return ( */}
                    <div className="col-md-2 videomob">
                      <Link
                        // onClick={() =>
                        //   this.props.videoData(
                        //     collection.id,
                        //     this.props.history
                        //   )
                        // }
                      >
                        <div className="collection container2">
                          <img className="image" src="" />
                          <div className="middle">
                            <div className="imgslider">
                              <img src={process.env.PUBLIC_URL+`/img/play.png`} alt="play" />
                            </div>
                          </div>
                        </div>
                        <div className="infomovie">
                          <h3></h3>
                          <h5></h5>
                        </div>
                      </Link>
                    </div>
                  {/* );
                })} */}
            </div>

            <hr className="videohr" />
          </div>
        </div>
      <Footer/>
</>
  );
};

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    rentCheckout: (videoKey) => dispatch(rentCheckout(videoKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalVedio);
