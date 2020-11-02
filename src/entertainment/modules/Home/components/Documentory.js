import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
const TopPics = props => {
  var settings = {
    dots: props.dots,
    arrows: props.arrows,
    infinite: props.infinite,
    speed: props.speed,
    slidesToShow: props.slidesToShow,
    slidesToScroll: props.slidesToScroll
  };
  let topPicsData = props.topPicsData;
  console.log(props)
  return (
    <div className="container section2">
      <div className="row titlesec">
        <div className="col-md-10 col6">
          <h4 className="underline">Documentory</h4>
        </div>
        <div className="col-md-2 col6">
          <Link className="seeallbtn" to="/collection">
            See All
          </Link>
        </div>
      </div>
      <div className="slider22">
        <Slider {...settings}>
          {topPicsData.length > 0 ? (
            topPicsData.map((pics, i) => {
              return (
                <div key={i}>
                  <div className="container1">
                    <img src={pics.poster} className="image" alt="" />
                    <div className="middle">
                      <div className="imgslider">
                        <img src="img/play.png" alt="play" />
                      </div>
                    </div>
                  </div>
                  <div className="infomovie">
                    <h3>{pics.title}</h3>
                    <h5>{pics.type}</h5>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ color: "#fff" }}>There are no videos available</div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default TopPics;
