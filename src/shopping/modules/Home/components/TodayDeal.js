import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import '../../../style.css';

class TodayDeal extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        console.log("Trending Deals :", this.props.trendingDeals)

        var settings = {
            dots: this.props.dots,
            arrows: this.props.arrows,
            infinite: this.props.infinite,
            speed: this.props.speed,
            responsive:this.props.responsive,
            slidesToShow: this.props.slidesToShow,
            slidesToScroll: this.props.slidesToScroll,
            trendingDeals:this.props.trendingDeals
        };

        return(
            <div className="topdeals shopToday specific">
                <div className="row titlesec titledeal">
                    <div className="col-md-9 col6"><h6 className=" tdtitle">Today's Deals</h6></div>
                    <div className="col-md-3 col6"><Link onClick={()=>this.props.productDetail(5, this.props.history)} className="shopbtn">See All Deals</Link></div>
                </div>
                <div className="slidervideo">
                
                    { this.props.trendingDeals 
                    ? 
                    <Slider {...settings}>
                        {
                            this.props.trendingDeals.map(data=>{
                                return(
                                <div key={data.key}>
                                    <div className="infoproduct">
                                        <Link onClick={()=>this.props.productDetail(data.key,this.props.history)}><img src={data.images[0]} alt=""/></Link>
                                        <h5>{data.name}</h5>	
                                        <h4>₹ 1200</h4>                               
                                    </div>	
                                </div>
                                );
                            })                    
                        }
                    </Slider>
                    :
                    <center><h1>No Trending Products</h1></center>
                    }                   
                
                </div>
            </div>
        );

    }
}

export default TodayDeal;