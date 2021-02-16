import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "../../../../seller/modules/assets/bgdemo1.jpg";

class Sliders extends Component {
  render() {
    let settings = {
      dots: this.props.dots,
      arrows: this.props.arrows,
      infinite: this.props.infinite,
      speed: this.props.speed,
      slidesToShow: this.props.slidesToShow,
      slidesToScroll: this.props.slidesToScroll,
    };
    return (
      <div className="section1">
        {this.props.slidersData && (
          <Slider {...settings}>
            {this.props.slidersData.length > 0 ? (
              this.props.slidersData.map((slider, i) => {
                return (
                  <div className="containerimage" key={i}>
                    <img src={slider.banner?slider.banner:"/img/main11.jpg"} alt="" />
                    <div className="top-left">
                      <h2
                        className="titlemovie"
                        style={{ WebkitBoxOrient: "vertical" }}
                      >
                        {slider.title}
                      </h2>
                      <h3 className="description">{slider.description}</h3>
                      <div className="">
                        <Link to="/subscription">
                          <button className="seeallbtn1" id={slider.i}><i style={{marginRight:"7px"}} className="fa fa-play"></i>
                            Subscribe
                          </button>
                        </Link>
                      </div>
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
    );
  }
}

export default Sliders;
