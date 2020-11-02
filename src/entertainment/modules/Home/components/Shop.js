import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
const Shop = (props) => {
  var settings = {
    dots: props.dots,
    arrows: props.arrows,
    infinite: props.infinite,
    speed: props.speed,
    responsive: props.responsive,
    slidesToShow: props.slidesToShow,
    slidesToScroll: props.slidesToScroll,
  };

  return (
    <>
      <div className="container section2">
        <div className="row titlesec">
          <div className="col-md-10 col6">
            <h4 className="underline">Shop</h4>
          </div>
          <div className="col-md-2 col6">
            <Link className="seeallbtn" to="/collection">
              See All
            </Link>
          </div>
        </div>
        <div className="slider23">
          <Slider {...settings}>
            {props.shopData && props.shopData.length
              ? props.shopData.map((data, index) => {
                  return (
                    <>
                      <div className="shopcontainer" key={data.id}>
                        <img
                          src={
                            data.images.length
                              ? data.images[0]
                              : "img/shop1.jpg"
                          }
                          className="image"
                          alt=""
                        />
                        <div className="middle2">
                          <div className="imgslider">
                            <button className="shopnowbtn">Shop Now</button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              : ""}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Shop;
