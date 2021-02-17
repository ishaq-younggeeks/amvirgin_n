import { baseURL } from "../../../../credential.json";
import Axios from 'axios';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../../../entertainment/modules/Header';
import SubMenu from '../../Home/components/SubMenu'
import { productData } from "../../Home/shoppingHomeReducer.js";
import { compose } from "redux";

class Wish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WishlistStateProduct: '',
      open: true,
      data: []
    };
  }

  componentDidMount() {
    this.props.fetchWishlist();
  }

  deleteWishlist=(id)=>{
    console.log('deleted product',id)
    this.props.fetchWishlist();
    this.props.deleteWish(id);
  }

  addToCart = (id) => {
    this.props.moveToCart(id)
  }

  render() {
    const {wishlist,isLoading} = this.props
    if(localStorage.getItem('UserToken'))
    {       
     return (
      <>
        <Header />
        <SubMenu {...this.props}/>
        <div class="container-fluid specific wishlistpart">
          {isLoading ? "": wishlist && wishlist.length? 
          <>
          <p class="wishlist">Wishlist</p>
          <div class="flexpart wishlistsection">
            {wishlist.length && wishlist.map((wishlistpro,i)=>               
              <div class="wishlistitem" key={wishlistpro.key}>
                <Link onClick={() => this.props.productDetail(wishlistpro.key, this.props.history)}>
                  <img src={wishlistpro.gallery[0]} class="productimgwish" />
                </Link>
                <h5>{wishlistpro.name}</h5>
                <p><span class="offprice">Rs.{wishlistpro.price.selling}</span><span class="originalprice"><del>Rs.{wishlistpro.price.original}</del></span>
                  <span class="off">({parseInt(wishlistpro.price.original)-parseInt(wishlistpro.price.selling)} OFF)</span></p>
                <button class="remove" onClick={this.deleteWishlist.bind(this,wishlistpro.key)}><img src={process.env.PUBLIC_URL + "img/close.png"} /></button>
                <button class="addtobag" onClick={()=>this.addToCart(wishlistpro.key)}>Add to Bag</button>
              </div>          
            )}
          </div>
          </>
          :
            <div style={{textAlign:'center',alignItems:'center'}}>
              <h2><b>You Have A Empty Wishlist</b></h2>
              <img src={process.env.PUBLIC_URL+"img/Shopcart.png"} style={{width:'20%'}}/>
              <br />
              <br />
              <h5><b>Hey it feels so light!</b></h5>
              <p>There is nothing in the Wishlist .Lets addsome items.</p>
              <button className="seeallbtn1" style={{ float: 'none' }}>
                <Link to="/shop" style={{ color: '#fff' }}>Go to Shop</Link>
              </button>
            </div>            
          }
        </div>
      </>
    )
  }else{
    return <Redirect to="/login"/>
  }
  }
}

export default Wish;