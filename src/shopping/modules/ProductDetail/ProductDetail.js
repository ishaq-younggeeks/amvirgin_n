import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { baseURL } from "../../../credential.json";
import Header from '../../../entertainment/modules/Header';
import SubMenu from '../Home/components/SubMenu'
import $ from 'jquery'
import ReactImageMagnify from 'react-image-magnify';
import Axios from 'axios';
import { connect } from 'react-redux';
import {productDetailSimilar} from "./ProductDetailAction";
import ReactStars from "react-rating-stars-component";

class ProductDetail extends Component {

constructor(props) {
	super(props)
	this.state = {
		categoryId: '',
		hist: '',
		refresh: false,
		selectedImage:0
	}
}

componentDidMount() {
	let data = JSON.parse(localStorage.getItem("productDetailData"))
	console.log("fetching data from localstorage", typeof (data["productId"]))
	this.setState({ categoryId: data["productId"], hist: data["productHistory"] })
	this.props.getproduct(this.props.match.params.pat1, this.props.history)
	console.log("history inside product details", window.location)
		this.setState({refresh:true})
}

// componentDidUpdate(prevProps, prevState) {
// 	if (prevState.refresh !== this.state.refresh) {
// 		console.log("component did update called")
// 		this.props.getproduct(this.props.match.params.pat1, this.props.history)
// 		this.setState({refresh:false})
// 	}
// }

zoomImage = (e,index) => {
	e.preventDefault();
	this.setState({selectedImage:index})

}

render() {
	
	const { productDetail } = this.props;
	console.log("Product Details :", productDetail);

		const imageProps = {
			smallImage: {
			  alt: 'Phasellus laoreet',
			  isFluidWidth: true,
			  isHintEnabled:true,
			  src: productDetail?productDetail.payload.media.gallery[this.state.selectedImage]:null
			},
			largeImage: {
			  src: productDetail?productDetail.payload.media.gallery[this.state.selectedImage]:null,
			  width: 1200,
			  height: 1800
			},
			enlargedImageContainerStyle: { background: '#fff', zIndex: 9 }
		  };
	
	return (
		<div className="shopMain">
        <Header />
				<SubMenu {...this.props}/>
		{productDetail ? (
        <div className="productsection container">
			<ul className="breadcrumb">
				<li><Link to="/">Home</Link></li>
				<li><Link to="/">Men</Link></li>
				<li><Link to="/">Clothing</Link></li>
				<li>Hoodies</li>
			</ul>
			<div className="row">
				<div className="col-md-6">
					<div className="productpage">
						<div className="imgcontainer">
						<ReactImageMagnify {...imageProps} />	
							<div className="bzoom_wrap">
								<ul id="" className="" style={{display: "flex",flexDirection:"row",marginTop:"5px"}}>
									
								{productDetail.payload.media.gallery.map((image,index) =>{	 
										return (
											index===0?
												(<Link key={index} onClick={(e)=>this.zoomImage(e,index)} style={{margin:"5px"}}><li className={this.state.selectedImage===index?"activeImageZoom":"inactiveImage"} style={{display: "list-item"}}>
												 
												<img className="" src={image} alt="alt pic" style={{width: "70px", height: "100px", display: "inline"}}/>
												
											</li></Link>):(
												<Link key={index} onClick={(e)=>this.zoomImage(e,index)} style={{margin:"5px"}}>
												<li className={this.state.selectedImage===index?"activeImageZoom":"inactiveImage"}>
												<img className="" src={image} alt="alt pic" style={{width: "70px", height: "100px", display: "inline"}}/>
												
											</li>
											</Link>
											)	
																				
										)
									})}	
								</ul>
								
							</div>			
						</div>
						<div className="row wishlistbtn">
							<div className="col50">
							<button className="atb" onClick={() => this.props.addtoCart(productDetail.payload.key)}><i className="fa fa-shopping-bag" aria-hidden="true"></i> Add to Bag</button>
							</div>
							<div className="col50">
								<button className="wlist"><i className="fa fa-heart" aria-hidden="true"></i> Wishlist</button>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 ">
					<h3 className="nameproduct"> Product Name</h3>
					<h3 className="namedetail">{productDetail.payload.name}</h3>
					<hr />
					<p>
						<span className="newrate">₹{productDetail.payload.price.selling}</span>
						<span className="actualrate">₹<strike>{productDetail.payload.price.original}</strike></span>
						<span className="offonrate">{parseInt(productDetail.payload.price.original)-parseInt(productDetail.payload.price.selling)} off</span>
					</p>
					<p className="producttax">inclusive of all tax</p>
					<h4 className="ssize">Select Size</h4>
					
					<div className="custom-radios">
						{/* <div>
							<input type="radio" id="size-1" name="size" value="small" defaultChecked />
							<label for="size-1">
								<span>S</span>
							</label>
						</div> */}
						
						{productDetail.payload.options.length?productDetail.payload.options.filter((data)=>data.label==="Size").map((data)=>data.value).map((value,index) => {
							return	value.map((values,index)=>{
							return (
								index===0?(
									<div>
									<input type="radio" id={`size-${value.key}`} name="size" value={values} defaultChecked />
									<label for={`size-${value.key}`}>
								<span>{values}</span>
									</label>
								</div>
							):(
								<div>
								<input type="radio" id={`size-${value.key}`} name="size" value={values} />
								<label for={`size-${value.key}`}>
							<span>{values}</span>
								</label>
							</div>
								)
							)})}):""}
						{/* <div>
							<input type="radio" id="size-2" name="size" value="medium" />
							<label for="size-2">
								<span>M</span>
							</label>
						</div>
						<div>
							<input type="radio" id="size-3" name="size" value="large" />
							<label for="size-3">
								<span>L </span>
							</label>
						</div>
						<div>
							<input type="radio" id="size-4" name="size" value="extralarge" />
							<label for="size-4">
								<span>XL </span>
							</label>
						</div> */}
					</div>
					<h4 className="ssize">Color Available</h4>
					<div className="custom-radios coloravailable">
					{productDetail.payload.options.length?productDetail.payload.options.filter((data)=>data.label==="Color").map((data)=>data.value).map((value,index) => {
							return	value.map((values,index)=>{
								console.log("color value",value)
							return (
								index===0?(
									<div>
									<input type="radio" id="color-1" name="color" value="color-1" defaultChecked />
									<label for="color-1">
										<span style={{backgroundColor:`${values}`}}></span>
									</label>
								</div>
							):(
								<div>
								<input type="radio" id="color-2" name="color" value="color-2" />
								<label for="color-2">
									<span style={{backgroundColor:`${values}`}}></span>
								</label>
							</div>
								)
							)})}):""}
						{/* <div>
							<input type="radio" id="color-1" name="color" value="color-1" defaultChecked />
							<label for="color-1">
								<span style={{backgroundColor:"black"}}></span>
							</label>
						</div>
						<div>
							<input type="radio" id="color-2" name="color" value="color-2" />
							<label for="color-2">
								<span className="green"></span>
							</label>
						</div>
						<div>
							<input type="radio" id="color-3" name="color" value="color-2" />
							<label for="color-3">
								<span className="white"></span>
							</label>
						</div>

						<div>
							<input type="radio" id="color-4" name="color" value="color-3" />
							<label for="color-4">
								<span className="blue"> </span>
							</label>
						</div>

						<div>
							<input type="radio" id="color-5" name="color" value="color-4" />
							<label for="color-5">
								<span className="red"> </span>
							</label>
						</div> */}
					</div>
					<hr />
					<div className="detailproduct">
						<h4>PRODUCT DETAILS </h4>
						<p>{productDetail.payload.description}</p>

						<h6>Size &amp; Fit</h6>
						<p>The model (height 6') is wearing a size M</p>

						<h6>Material &amp; Care</h6>
						<p>100% Cotton</p>
						<p>Machine-wash</p>

						<h6>Specifications</h6>

						<div className="row specification">
							<div className="col-md-6">
								<h6>Sleeve Length</h6>
								<h5>Long Sleeves</h5>
							</div>
							<div className="col-md-6">
								<h6>Neck</h6>
								<h5>Hood</h5>
							</div>
							<div className="col-md-6">
								<h6>Pattern</h6>
								<h5>Colourblocked</h5>
							</div>
							<div className="col-md-6">
								<h6>Length</h6>
								<h5>Regular</h5>
							</div>
							<div className="col-md-6">
								<h6>Number of Pockets</h6>
								<h5>3</h5>
							</div>
							<div className="col-md-6">
								<h6>Lining Fabric</h6>
								<h5>Unlined</h5>
							</div>
							<div className="col-md-6">
								<h6>Occasion</h6>
								<h5>Casual</h5>
							</div>
							<div className="col-md-6">
								<h6>Hemline</h6>
								<h5>Hem with Toggle</h5>
							</div>
						</div>
					</div>
					<div className="deliveryoption">
						<h4>Delivery options </h4>
						<h6>Pincode Availability</h6>
						<form autoComplete="off">
							<input type="text" placeholder="Enter pincode" className="pincode-code" value="" style={{ width: 'auto' }} name="pincode" />
							<input type="submit" className="pincode-check pincode-button" style={{ width: 'auto' }} value="Check" />
						</form>
						<ul>
							<li>100% Original Products</li>
							<li>Free Delivery on order above Rs. 1199</li>
							<li>Cash on delivery might be available</li>
							<li>Easy 15 days returns and exchanges</li>
							<li>Try &amp; Buy might be available</li>
						</ul>
						{/* <p>Product Code : <b>10617902</b></p> */}
						<p>Sold by : <b>{productDetail.payload.seller.name}</b> </p>
						<p style={{display:"flex"}}><b>{productDetail.payload.seller.name}</b> &nbsp; <ReactStars 
											value={productDetail.payload.seller.rating}
											edit={false}
											count={5}
											size={26}
											isHalf={true}
											color="#CAD3D0"
											activeColor="#ffd700"
											/></p>
					</div>
				</div>
			</div>
			<hr />
			<div className="reviewsection row">
				<div className="ratingsection">
					<h3>Customer Reviews </h3>
					<h4> {productDetail.payload.rating} out of 5 </h4>
					<ReactStars 
					value={productDetail.payload.rating}
					edit={false}
					count={5}
                    size={32}
					isHalf={true}
					color="#CAD3D0"
                    activeColor="#ffd700"
					/>
					{/* <span className="fa fa-star checked"></span>
					<span className="fa fa-star checked"></span>
					<span className="fa fa-star checked"></span>
					<span className="fa fa-star checked"></span>
					<span className="fa fa-star-half-empty checked"></span>
					<p className="basedp">Based on 254 reviews.</p>
					<div className="review">
						<div className="side">
							<div>5 <span className="fa fa-star checked"></span></div>
						</div>
						<div className="middlesection">
							<div className="bar-container">
								<div className="bar-5"></div>
							</div>
						</div>
						<div className="side right">
							<div>50%</div>
						</div>
						<div className="side">
							<div>4 <span className="fa fa-star checked"></span></div>
						</div>
						<div className="middlesection">
							<div className="bar-container">
								<div className="bar-4"></div>
							</div>
						</div>
						<div className="side right">
							<div>10%</div>
						</div>
						<div className="side">
							<div>3 <span className="fa fa-star checked"></span></div>
						</div>
						<div className="middlesection">
							<div className="bar-container">
								<div className="bar-3"></div>
							</div>
						</div>
						<div className="side right">
							<div>10%</div>
						</div>
						<div className="side">
							<div>2 <span className="fa fa-star checked"></span></div>
						</div>
						<div className="middlesection">
							<div className="bar-container">
								<div className="bar-2"></div>
							</div>
						</div>
						<div className="side right">
							<div>15%</div>
						</div>
						<div className="side">
							<div>1 <span className="fa fa-star checked"></span></div>
						</div>
						<div className="middlesection">
							<div className="bar-container">
								<div className="bar-1"></div>
							</div>
						</div>
						<div className="side right">
							<div>5%</div>
						</div> 
					</div>*/}
				</div>
				<div className="reviews">
					<div className="reviewpart">
						<p> <img className="img" src={process.env.PUBLIC_URL + "/img/default.png"} /><span className="name">{productDetail.payload.rating.name ? productDetail.payload.rating.name : "Tony Stark" }</span> <span className="star fa fa-star checked"> 5 </span></p>
						<p>{productDetail.payload.rating.comment ? productDetail.payload.rating.comment : "Product quality is really good!"}</p>
					</div>
					<hr />
					{/* <div className="reviewpart">
						<p> <img className="img" src={process.env.PUBLIC_URL + "/img/default.png"} /><span className="name">Tony Stark</span> <span className="star fa fa-star checked"> 5 </span></p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
					</div> */}
				</div>
			</div>
			<hr />
			<div className="similarproducts">
				<h4 className="simpro">Similar Products</h4>
				<div className="row detailrow">
					{productDetail.payload ? productDetail.payload.similar.map((item) => 
					<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" style={{marginBottom:"30px"}}>
			            <Link onClick={()=>this.props.productDetailSimilar(item.key,this.props.history)}>
						<img className="relimg" src={item.image? item.image : process.env.PUBLIC_URL + "/img/default.png"} />
						</Link>
						<div className="reldetails">
							<h3>{item.brand}</h3>
							<h5>{item.name}</h5>
							<p className="offprice">Rs. {item.price.selling} <strike> Rs. {item.price.original}</strike> <span>50% off</span></p>
						</div>
				    </div>): null}
				</div>
			</div>
		</div>
		)						
		:""}
	</div>
    )
  }
}

const mapStateToProps = (state) => {
    return  {}
}
const mapDispatchToProps = (dispatch) => {
	return({
        productDetailSimilar:(id,history)=> dispatch(productDetailSimilar(id,history))
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);


