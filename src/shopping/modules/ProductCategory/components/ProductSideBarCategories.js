import React from 'react';
import ProductMainContent from './ProductMainContent';

import $ from 'jquery'

class ProductSideBarCategories extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          elementStyle:{position:'relaitve'},
          priceRange:1
        }
  }

  componentDidMount() {
    $("#hide").click(function(){
      $(".catsmob").hide();
    });
    $("#show").click(function(){
      $(".catsmob").show();
    });

    let x = window.matchMedia("(max-width: 720px)")
    console.log("media width",x)
    this.myCategories(x)
   // this.myCategories(x) // Call listener function at run time
  //x.addListener(this.myCategories) // Attach listener function on state changes
  }

   myCategories = (x) => {
    if (x.matches) { // If media query matches
      console.log("for position absolute")
      this.setState({elementStyle:{...this.state.someProperty,position:"absolute"}})
      //$(".catsmob").style.position = "absolute";
    } else {

      console.log("for position relative")
      this.setState({elementStyle:{...this.state.someProperty,position:"relative"}})
     //$(".catsmob").style.position = "relative";
    }
  }
  
  

  render() {
    return (
      <div className="shop-area pt-60 pb-60 specific">
        <div className="container-fluid">
          <div className="main-content">
            <div className="row flex-row">
              <div className="col-lg-3">
                <div className="showhidesection">
                  <button id="hide">Hide</button>
                  <button id="show">Show</button>
                </div>
                <div id="catshopmobile" className="catsmob" style={this.state.elementStyle}>
                  <div className="sidebar">
                    <div className="sidebar__inner">
                      <div className="wrapper">
                        <div className="sidebar-wrapper sticker">
                          <div className="sidebar-widget">
                            <h4 className="sidebar-title">Search </h4>
                            <div className="sidebar-search mb-40 mt-20">
                                <form className="sidebar-search-form" action="#">
                                    <input type="text" placeholder="Search here..."/>
                                    <button>
                                        <i className="la la-search"></i>
                                    </button>
                                </form>
                            </div>
                          </div>
                          <div className="sidebar-widget shop-sidebar-border pt-40">
                            <h4 className="sidebar-title">Shop By Categories</h4>
                            <div className="shop-catigory mt-20">
                              <ul id="faq">
                                <li> <a data-toggle="collapse" data-parent="#faq" href="#shop-catigory-1">Women Fashion <i className="la la-angle-down"></i></a>
                                  <ul id="shop-catigory-1" className="panel-collapse collapse show">
                                    <li><a href="#">Dress </a></li>
                                    <li><a href="#">Shoes</a></li>
                                    <li><a href="#">Sunglasses </a></li>
                                    <li><a href="#">Sweater </a></li>
                                    <li><a href="#">Handbag </a></li>
                                  </ul>
                                </li>
                                <li> <a data-toggle="collapse" data-parent="#faq" href="#shop-catigory-2">Men Fashion <i className="la la-angle-down"></i></a>
                                  <ul id="shop-catigory-2" className="panel-collapse collapse">
                                    <li><a href="#">Shirt </a></li>
                                    <li><a href="#">Shoes</a></li>
                                    <li><a href="#">Sunglasses </a></li>
                                    <li><a href="#">Sweater </a></li>
                                    <li><a href="#">Jacket </a></li>
                                  </ul>
                                </li>
                                <li> <a data-toggle="collapse" data-parent="#faq" href="#shop-catigory-3">Furniture <i className="la la-angle-down"></i></a>
                                  <ul id="shop-catigory-3" className="panel-collapse collapse">
                                    <li><a href="#"> Chair</a></li>
                                    <li><a href="#">Lift Chair</a></li>
                                    <li><a href="#">Bunk Bed</a></li>
                                    <li><a href="#">Computer Desk</a></li>
                                    <li><a href="#">Bookcase</a></li>
                                  </ul>
                                </li>
                                <li> <a href="#">Lamp</a></li>
                                <li> <a href="#">Electronics</a> </li>
                                <li> <a href="#">Accessories</a></li>
                              </ul>
                            </div>
                          </div>
                          <div className="sidebar-widget shop-sidebar-border pt-40 mt-40">
                            <h4 className="sidebar-title">Refine By </h4>
                            <div className="sidebar-widget-list mt-20">
                              <ul>
                                <li>
                                  <div className="sidebar-widget-list-left">
                                    <input type="checkbox"/ > <a href="#">On Sale <span>4</span> </a>
                                    <span className="checkmark"></span>
                                  </div>
                                </li>
                                <li>
                                    <div className="sidebar-widget-list-left">
                                      <input type="checkbox" value=""/> <a href="#">New <span>5</span></a>
                                      <span className="checkmark"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="sidebar-widget-list-left">
                                      <input type="checkbox" value=""/> <a href="#">In Stock <span>6</span> </a>
                                      <span className="checkmark"></span>
                                    </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="sidebar-widget pt-40 mt-40 shop-sidebar-border">
                            <h4 className="sidebar-title">Colour </h4>
                            <div className="sidebar-widget-list mt-20">
                              <ul>
                                <li>
                                  <div className="sidebar-widget-list-left">
                                    <input type="checkbox" value=""/> <a href="#">Green <span>7</span> </a>
                                    <span className="checkmark"></span>
                                  </div>
                                </li>
                                <li>
                                  <div className="sidebar-widget-list-left">
                                    <input type="checkbox" value=""/> <a href="#">Cream <span>8</span> </a>
                                    <span className="checkmark"></span>
                                  </div>
                                </li>
                                <li>
                                  <div className="sidebar-widget-list-left">
                                    <input type="checkbox" value=""/> <a href="#">Blue <span>9</span> </a>
                                    <span className="checkmark"></span>
                                  </div>
                                </li>
                                <li>
                                  <div className="sidebar-widget-list-left">
                                    <input type="checkbox" value=""/> <a href="#">Black <span>3</span> </a>
                                    <span className="checkmark"></span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="sidebar-widget pt-40 mt-40 shop-sidebar-border">
                            <div className="rangeslidecontainer">
                              <h4 className="sidebar-title">Price Range </h4>
                              <input type="range" min="1" max="5000" value={this.state.priceRange} className="rangeslider" id="myRange" onChange={(e)=>{
                                this.setState({priceRange:e.target.value})
                              }}/>
                              <p className="maxprice">Max: Rs. 2000<span id="demo"></span></p>
                            </div>
                          </div>
                          <div className="sidebar-widget pt-40 mt-40 shop-sidebar-border">
                            <h4 className="sidebar-title">Size </h4>
                            <div className="sidebar-widget-list mt-20">
                              <ul>
                                <li>
                                  <div className="sidebar-widget-list-left">
                                    <input type="checkbox" value=""/> <a href="#">XL <span>4</span> </a>
                                    <span className="checkmark"></span>
                                  </div>
                                </li>
                                <li>
                                  <div className="sidebar-widget-list-left">
                                    <input type="checkbox" value=""/> <a href="#">L <span>5</span> </a>
                                    <span className="checkmark"></span>
                                  </div>
                                </li>
                                <li>
                                  <div className="sidebar-widget-list-left">
                                    <input type="checkbox" value=""/> <a href="#">SM <span>6</span> </a>
                                    <span className="checkmark"></span>
                                  </div>
                                </li>
                                <li>
                                  <div className="sidebar-widget-list-left">
                                    <input type="checkbox" value=""/> <a href="#">XXL <span>7</span> </a>
                                    <span className="checkmark"></span>
                                  </div>
                                </li>
                              </ul>   
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
              </div>
              <ProductMainContent  
                {...this.props}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProductSideBarCategories;