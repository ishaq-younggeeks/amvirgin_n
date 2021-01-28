import React from "react";
import { Link } from "react-router-dom";
import SubMenuDevice from "./SubMenuDevice";
import SubMenu from "./SubMenu";
import Header from "../../../../entertainment/modules/Header";
import { allDeals } from "../shoppingHomeAction";
import { connect } from "react-redux";
import { productDetail } from "../../ProductDetail/ProductDetailAction";

class ViewAllDeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.allDeals();
  }

  render() {
    const {allDealsProducts} = this.props;
    console.log("View All Deals :", allDealsProducts);
    
    return (
      <div>
        <Header />
        <SubMenu {...this.props} />
        <SubMenuDevice {...this.props} />
        <div className="col-lg-9 content">
           <center><h3 style={{color:"#c00", margin:"20px 0px 20px 0"}}>TRENDING DEALS</h3></center>
          <div className="shop-bottom-area" style={{marginLeft:"10px"}}>
            <div className="tab-content jump">
              <div id="shop-1" className="tab-pane active">
                <div className="row">
                  {allDealsProducts && allDealsProducts.length ? (
                    allDealsProducts.map((item, index) => {
                      return (
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                          <div className="product-wrap mb-35">
                            <Link
                              onClick={()=>this.props.productDetail(item.key,this.props.history)}
                            >
                              <div className="product-img">
                                <div className="shopImg">
                                  <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                      {item.images.map((image, gindex) => {
                                        return (
                                          <div
                                            key={"gallery" + item.key + gindex}
                                            className="swiper-slide"
                                          >
                                            <img src={image} alt="product" />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="product-content">
                              <div className="paddingsection">
                                <span>{item.name}</span>
                                <h4>
                                  <a href="product-details.html"></a>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <h3 style={{ color: "#c00", marginLeft: "22px" }}>
                        No Trending Deals :(
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { allDealsProducts: state.shopping.allDealsProducts };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allDeals: () => dispatch(allDeals()),
    productDetail:(id,history)=> dispatch(productDetail(id,history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllDeals);
