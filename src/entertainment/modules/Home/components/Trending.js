import React from "react";
import Slider from "react-slick";
import { Link, Redirect,useHistory } from "react-router-dom";
import { videoData } from "../../Show/components/ShowAction";
import { connect } from "react-redux";




const Trending = (props) => {
  var settings = {
    dots: props.dots,
    arrows: props.arrows,
    infinite: props.infinite,
    speed: props.speed,
    slidesToShow: props.slidesToShow,
    slidesToScroll: props.slidesToScroll,
  };

  const history = useHistory();
  const onClickHandler = async (e, props, videoId) => {
    props.videoData(videoId, history);
  };
  let trendingData = props.trendingData;
  return (
    <div className="container section2">
      <div className="row">
        <div className="col-md-3">
          <h1 className="trendhead">
            <span className="trd">Trending</span>
            <span> Now</span>
          </h1>
        </div>
        <div className="slidertrending col-md-9">
          <Slider {...settings}>
            {trendingData && trendingData.length > 0 ? (
              trendingData.map((trending, i) => {
                return (
                  // <Link to={{pathname: `/show`, query: `${trending.id}`}}>
                  <Link onClick={(e) => onClickHandler(e, props, trending.id)}>
                    <div key={i}>
                      <div className="container1">
                        <img src={trending.poster} className="image" alt="" />
                        <div className="middle">
                          <div className="imgslider">
                            <img src={process.env.PUBLIC_URL+"/img/play.png"} alt="play" />
                          </div>
                        </div>
                      </div>
                      <div className="infomovie trend">
                        <h3>{trending.title}</h3>
                        <h5>{trending.type}</h5>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <span>There are no videos available</span>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

// export default Trending;

const mapDispatchToProps = (dispatch) => {
  return {
    videoData: (videoId, history) => dispatch(videoData(videoId, history)),
  };
};

export default connect(null, mapDispatchToProps)(Trending);
