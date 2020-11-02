import React from "react";

import "../../../style.css"
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Banner extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0,0)
  }

  render() {
    let settings = {
      dots: this.props.dots,
      arrows: this.props.arrows,
      infinite: this.props.infinite,
      speed: this.props.speed,
      slidesToShow: this.props.slidesToShow,
      slidesToScroll: this.props.slidesToScroll
    };
    return (
      <div class="sectionnews specific">
        <div class="slick-carousel slidernews">
          {this.props.slidersData.sliders && (
            <Slider {...settings}>
              {this.props.slidersData.sliders.length > 0 ? (
                this.props.slidersData.sliders.map((slider, i) => {
                  return (
                    <div className="containerimage" key={i}>
                      <img src={slider.banner} alt="" />
                      <div className="top-left">
                        <h2
                          className="titlemovie"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          {slider.title}
                        </h2>
                        <h3 className="description">{slider.description}</h3>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span>There are no videos available</span>
              )}
            </Slider>
          )}
          {!this.props.slidersData && <div style={{ margin: "75px" }}></div>}
        </div>
      </div>
    )
  }
}
export default Banner;