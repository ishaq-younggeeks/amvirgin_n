import React, { Component } from 'react';
import '../../../style.css';
import Slider from "react-slick";

class ShopSlider extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        //this.props.fetchHomeData();
    }

    render(){
        var settings = {
            dots: this.props.dots,
            arrows: this.props.arrows,
            infinite: this.props.infinite,
            speed: this.props.speed,
            slidesToShow: this.props.slidesToShow,
            slidesToScroll: this.props.slidesToScroll,
            sliderData:this.props.sliderData
          };
        console.log('----',this.props.sliderData)
        return(
	        <div className="slidershop">
                <Slider {...settings}>
                {this.props.sliderData && this.props.sliderData.length && this.props.sliderData.map(
                    (item,index) => {
                        return (
                            <div key={index} className="">
                            <img src={item.banner} alt="" /> 
                        </div> 
                        )
                   		 }
                	 	)
                	 }
                    {/* <div className="">
                        <img src="shopimg/sliderimg2.png" alt=""/>
                    </div>
                    <div className="">
                        <img src="shopimg/sliderimg3.png" alt=""/>	
                    </div>
                    <div className="">
                        <img src="shopimg/sliderimg2.png" alt=""/>	   
                    </div>
                    <div className="">
                        <img src="shopimg/sliderimg5.png" alt=""/>	   
                    </div> */}
                </Slider>
		    </div>
        );
    }
}
export default ShopSlider;
