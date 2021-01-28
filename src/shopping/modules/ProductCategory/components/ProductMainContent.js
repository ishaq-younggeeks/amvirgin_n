import React from 'react';
import Swiper from "swiper";
import $ from 'jquery'
import Axios from 'axios';
import { Link } from 'react-router-dom'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import  { Redirect } from 'react-router-dom';
import { baseURL } from "../../../../credential.json";

class ProductMainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortby: [],
      refresh: false,
      path: '',
      categoryId: '',
      hist: '',
      red:false,
      selectedSize:''
    }
  }
   async componentDidMount() {
    this.props.productData(this.props.match.params.pat1, "relevance", "1", this.props.history)
    const res = await Axios.get(`${baseURL}/customer/products/sorts`)
     this.setState({ sortby: res.data.data },console.log("sortBy state",res.data.data))
    let data = JSON.parse(localStorage.getItem("productData"))
    this.setState({ categoryId: data["categoryId"], hist: data["productHistory"] })
    this.state.refresh = true
  }

  handleChange = (e) => {
    this.props.productData(this.props.match.params.pat1, e.target.value, this.props.location.state.page, this.props.location.state.history)
  }

  Addtocart = (e,id,size) => {
    // console.log("id clicked" ,id,e.target.value)
    // if ($(`#${id}`).is(":checked")){
    //   console.log("condition true")
    //   $("label").css({"color":"green","background-color":"#6600cc"})
    // }
    this.props.addtoCart(id,size);
    ToastsStore.info("Product Added To cart");
  }

  addtowish=(id)=>
  { 
    this.props.AddWishlist(id);
    
  }
  swiper = () => {
    let swiper = new Swiper('.swiper-container', {
      spaceBetween: 30, 
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      delay: 100,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    $(".swiper-container").mouseenter(function () {
      (this).swiper.autoplay.start();
    });
    $(".swiper-container").mouseleave(function () {
      (this).swiper.autoplay.stop();
      (this).swiper.slideTo(0);
    });
    
  }


  handleCartSize = (id) => {
    $(`#${id}`).toggle()
    if(this.state.selectedSize){
    $(`#${parseInt(this.state.selectedSize)}`).toggle()
    }
    this.setState({selectedSize:id})

   // $(".sizesection").toggle()
    //alert("hii")
    //$("p").toggle();

  }

  handleCloseSize = (id) => {
    $(`#${id}`).toggle()
  }
  
  displaypagination = (total) => {
    let list = []

    for (let i = 0; i < total/20; i++) {
      list.push(<li>
        {
          <li><a href="#">01</a></li>
          //inner loop to create columns
        }
      </li>)
    }
    return list
  }

   render() {
    const { productList } = this.props;
    console.log("Product List :", productList);

    if(this.state.red===true){
      return <Redirect to='/login'/>
    }
    this.swiper()

    // $(document).ready(function(){
    //   $("#hidesizesection").click(function(){
    //     $(".sizesection").hide();
    //   });
    //   $("#showsizesection").click(function(){
    //     $(".sizesection").show();
    //   });
    // });
    

    return (
      <div className="col-lg-9 content">
        <div className="shop-topbar-wrapper">
          <div className="shop-topbar-left">
            <p>{productList && productList.meta ? <p>Showing {productList.meta.from ? productList.meta.from : 0} - {productList.meta.to ? productList.meta.to : 0} of {productList.meta.total} results</p> : <p>Showing 0 Results</p>}</p>
          </div>
          <div className="product-sorting-wrapper">
            <div className="product-shorting shorting-style">
              {/* <label>View:</label>
              <select>
                <option value=""> 20</option>
                <option value=""> 23</option>
                <option value=""> 30</option>
              </select> */}
            </div>
            <div className="product-show shorting-style">
              <label>Sort by:</label>
              <select onChange={this.handleChange}>
                {this.state.sortby.map((sortby) => {
                  return (
                    <option key={sortby.key} value={sortby.key}>{sortby.label}</option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="shop-bottom-area">
          <div className="tab-content jump">
            <div id="shop-1" className="tab-pane active">
              <div className="row">
              
                {productList.data && productList.data.length?productList.data.map((item, index) => {
                   
                  return (
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                      <div className="product-wrap mb-35">
                      <Link onClick={() => 
                            this.props.productDetail(item.key, this.props.history)
                            }>
                        <div className="product-img">
                            <div className="shopImg">
                              <div className="swiper-container" >
                                <div className="swiper-wrapper">
                                  {item.gallery.map((image,gindex) => {
                                    return (
                                      <div key={"gallery"+item.key+gindex} className="swiper-slide"><img src={image} alt="product" /></div>
                                    )
                                  })}
                                </div>
                                <div className="swiper-pagination"></div>
                                <div className="swiper-button-next"></div>
                                <div className="swiper-button-prev"></div>
                              </div>
                            </div> 
                        </div>
                        </Link>
                        <div className="product-content">
                          <div className="hoverbtn">
                            <div className="row">
                              <div className="partbtn">
                                <button key={item.key+"button"}  className="cartbtn"  id="showsizesection" onClick={() => this.handleCartSize(item.key)}>Add to Cart</button>
                                <ToastsContainer lightBackground store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />

                                <div class="sizesection" id={item.key} key={item.key}>
                                  <h4 class="ssize">Select Size</h4>
                                    <div class="custom-radios">
                                    {item.options.length?item.options.filter((data)=>data.label==="Size").map((data)=>data.value).map((value,index) => {
                                      console.log("print spm",Array.isArray(value),value)
                                      if(Array.isArray(value))
                                      	return	value.map((values,index)=>{
                                          return (
                                            index===0?(
                                      <div>
                                      <input key={index} type="radio" id={`size-${item.key}-${index}`}  name="size" value={item.key} onClick={(e)=>this.Addtocart(e,item.key,value.value)}/>
                                      <label for={`size-${item.key}-${index}`}>
                                            <span>{values}</span>
                                      </label>
                                      </div>
                                      	):(
                                      <div>
                                      <input key={index} type="radio"  name="size" id={`size-${item.key}-${index}`} onClick={(e)=>this.Addtocart(e,item.key,value.value)} value={value.value}/>
                                      <label  for={`size-${item.key}-${index}`}>
                                        <span>{value}</span>
                                      </label>
                                      </div>
                                      	)
                                        )}
                                       )
                                      }
                                        ):""}
                                    </div>                                 

                                  <button id="hidesizesection" onClick={() =>this.handleCloseSize(item.key)} >x</button>
                                </div>        
                              </div>
                              <div className="partbtn">
                                <Link id={`wishlist`+item.key} className="wishlistbtn" onClick={()=>this.addtowish(item.key)}>Wishlist</Link>
                              </div>
                            </div>
                            <div className="sizeshover"><p><b>Sizes:</b> S, M, L, XL</p></div>
                            {/* <div className="product-action">
                              <a title="Share" href="#"><i className="la la-share"></i></a>
                              <a title="Compare" href="#"><i className="la la-retweet"></i></a>
                            </div> */}
                          </div>
                          <div className="paddingsection">
                            <span>{item.name}</span>
                            <h4><a href="product-details.html"></a></h4>
                          
                            <div className="price-addtocart">
                            <div className="product-price">
                              <span><del>₹{item.price.original}</del></span><span>₹{item.price.selling}</span>
                            </div>
                            </div>
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }):<div><h3 style={{color:"#c00", marginLeft:"22px"}}>No Products Available :(</h3></div>}
              </div>
            </div>
          </div>
        </div>

        <div className="paginationsection">
          <div className="pagination-style text-center">
            <ul>
              <li><a className="prev" href="#"><i className="la la-angle-left"></i></a></li>
              {productList.meta?this.displaypagination(productList.meta.total):""}
              {/* <li><a href="#">01</a></li>
              <li><a href="#">02</a></li>
              <li><a className="active" href="#">03</a></li>
              <li><a href="#">04</a></li>
              <li><a href="#">05</a></li>
              <li><a href="#">06</a></li> */}
              <li><a className="next" href="#"><i className="la la-angle-right"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductMainContent;