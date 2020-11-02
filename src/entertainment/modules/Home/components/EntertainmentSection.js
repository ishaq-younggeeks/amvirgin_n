import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { videoData } from "../../Show/components/ShowAction";
import { connect } from "react-redux";

const onClickHandler = async (e, props, videoId) => {
  props.videoData(videoId, props.history);
};

const EntertainmentSection = (props) => {
  var settings = {
    dots: props.dots,
    arrows: props.arrows,
    infinite: props.infinite,
    speed: props.speed,
    responsive: props.responsive,
    slidesToShow: props.slidesToShow,
    slidesToScroll: props.slidesToScroll,
  };
  let { items } = props.sectionData ? props.sectionData : "";

  return (
    <div className="container section2">
      <div className="row titlesec">
        <div className="col-md-10 col6">
          <h4 className="underline">{props.sectionData.title}</h4>
        </div>
        <div className="col-md-2 col6">
          <Link
            className="seeallbtn"
            to={{
              pathname: `/collection`,
              sectionData: `${props.sectionData.id}`,
            }}
          >
            See All
          </Link>
        </div>
      </div>
      <div className="slider22">
        <Slider {...settings}>
          {items && items.length > 0 ? (
            items.map((pics, i) => {
              return (
                // <Link to={{pathname: `/show`, query: `${pics.id}`}}>
                <Link onClick={(e) => onClickHandler(e, props, pics.id)}>
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
                </Link>
              );
            })
          ) : (
            <div
              ref={(el) => {
                if (el) {
                  el.style.setProperty("color", "red", "important");
                }
              }}
            >
              There are no videos available
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    videoData: (videoId, history) => dispatch(videoData(videoId, history)),
  };
};

export default connect(null, mapDispatchToProps)(EntertainmentSection);
//export default EntertainmentSection;
