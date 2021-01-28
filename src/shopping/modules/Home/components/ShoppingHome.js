import React from 'react';
import { Link, Redirect,withRouter } from 'react-router-dom';
import { Router, browserHistory } from 'react-router';
import {Helmet} from "react-helmet";
import Header from '../../../../entertainment/modules/Header';
import SubMenu from './SubMenu';
import DealTimer from './Dealtimer';
import FocusBrand from './FocusBrand';
import TodayDeal from './TodayDeal';
import PopularStuff from './PopularStuff';
import Trends from './Trends';
import Footer from './FooterWhite';
import ShopSlider from './Slider';
import '../../../style.css';
import { routerActions } from 'react-router-redux/lib/actions';
import Slider from "react-slick";
import '../../../style.css';
import SubMenuDevice from './SubMenuDevice'


class ShoppingHome extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        reload:true
    }
  }

  componentDidMount= ()=>{
    window.scrollTo(0,0)
      console.log("working");
      console.log("props data",this.props.data);
      this.props.fetchData();
      this.props.fetchHomeData();
  }

  render() {

    const {homeData} = this.props;
    return (
      <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Amvirgin | ShoppingHome</title>
      </Helmet>
      <div className="shopMain">
        <Header />
        <SubMenu
            {...this.props}
         />
         <SubMenuDevice
         {...this.props}
         />
        <div className="brandsection specific4 shopMiddle">            
            <ShopSlider
                dots={true}
                arrows={false} 
                infinite={false} 
                speed={500}
                slidesToShow={1} 
                slidesToScroll={1}
                sliderData={homeData.shopSliders} 
            />
            {homeData.offerDetails && <DealTimer Dealdata={homeData.offerDetails}/>}
            {/* <div className="row secondmenu"> */}
            {/* {homeData.brandInFocus ? homeData.brandInFocus.map((brandData,i)=>
            {
                return(
                    <Link to="" key={i}>
                        <div className="image-container" data-caption={brandData.name}>
                            <div className="zoomhidden">
                                <img src={brandData.poster?brandData.poster:process.env.PUBLIC_URL+'/img/default.png'} alt={brandData.name} style={{objectFit:'cover',objectPosition:'center center'}}/>
                            </div>
                        </div>
                    </Link>
                );
            }
            ):''} */}
            {/* </div> */}
          </div>
          {homeData.brandInFocus && <FocusBrand brandInFocus={homeData.brandInFocus} {...this.props}/>}
          {/*Slider*/}
          {/* <div className="topdeals shopToday specific">
                <div className="row titlesec titledeal">
                    <div className="col-md-9 col6"><h6 className=" tdtitle">Today's Deals</h6></div>
                    <div className="col-md-3 col6"><Link className="shopbtn" onClick={()=>this.props.productDetail(5, this.props.history)}>See All Deals</Link></div>
                </div>
                <div className="slidervideo">
                
                    { homeData.trendingDeals 
                    ? 
                    <Slider 
                    dots={true} 
                    arrows={true} 
                    infinite={false} 
                    speed={500} 
                    responsive= {[{
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1,
                        }
                      }]}
                    slidesToShow={6} 
                    slidesToScroll={1}
                    
                    >
                        {
                            homeData.trendingDeals.map(data=>{
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
            </div> */}
          {homeData.trendingDeals ? <TodayDeal 
            dots={true} 
            arrows={true} 
            infinite={false} 
            speed={500} 
            slidesToShow={6} 
            slidesToScroll={1}
            trendingDeals={homeData.trendingDeals}
            productDetail={this.props.productDetail}
            {...this.props}
          /> : <center><h1>No Trending Products</h1></center>} 
        { homeData.popularStuff && <PopularStuff popularStuff={homeData.popularStuff} {...this.props}/>}
        {homeData.trendingNow && <Trends trendingNow={homeData.trendingNow} {...this.props}/>}
          <Footer />
      </div>
      </>
    )
  }
}
export default ShoppingHome;

