import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Footer from "../../Footer";
import Header from '../../Header';
import { allRentedVideos } from "./ShowAction";
import { Helmet } from "react-helmet";
import {Link} from 'react-router-dom'

const RentalVideo = (props) => {

  const {allRentedVideos} = props

  console.log("all rented vedios",allRentedVideos)

  useEffect(() => {
    props.allRentedVideosfnc()
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
            <h6> {"My Videos"} </h6>

            <div className="row">
              {allRentedVideos && allRentedVideos.length &&
                allRentedVideos.map((item, index) => {
                  return (
                    <div className="col-md-2 videomob" key= {index}>
                      <Link
                        // onClick={() =>
                        //   this.props.videoData(
                        //     collection.id,
                        //     this.props.history
                        //   )
                        // }

                        to={`/video/${item.video.id}`}
                      >
                        <div className="collection container2">
                          <img className="image" src={item.video.poster} />
                          <div className="middle">
                            <div className="imgslider">
                              <img src={process.env.PUBLIC_URL+`/img/play.png`} alt="play" />
                            </div>
                          </div>
                        </div>
                        <div className="infomovie">
                          <h3>{item.video.title}</h3>
                          <h5>{item.video.type}</h5>
                        </div>
                      </Link>
                    </div>
                   );
                })}
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
    allRentedVideos:state.ShowVideos.allRentedVideos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    allRentedVideosfnc: () => dispatch(allRentedVideos())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalVideo);
