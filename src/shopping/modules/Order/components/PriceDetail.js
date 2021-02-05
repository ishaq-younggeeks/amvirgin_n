import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart} from '../../Cart/shoppingCartAction'



class PriceDetail extends Component {
  constructor(props){
    super(props)

  }

componentDidMount(){
  this.props.fetchCart()
  console.log("price Detail",this.props.priceDetail)
}
 
  render(){
     const {priceDetail} = this.props
    console.log("price details are",this.props)
    
    return (
      <>
        <div className="pricedetails">
          <h3>Price Details</h3>

          <div className="priceproduct">
          <span>Order Total</span>
            <span className="desc"> ₹ {priceDetail.subTotal}</span>
          </div>
          <div className="priceproduct">
          <span>Tax</span>
           <span className="desc"> ₹ {priceDetail.tax}</span>
          </div>
          <div className="priceproduct">
          <span>Delivery Charges</span>
          <span className="desc"> <del>149</del> <span className="redspan">FREE</span></span>
          </div>
          <hr/>
          <div className="priceproduct totalprice">
          <span>Total</span><span className="desc"> ₹ {priceDetail.total}</span>
          </div>
          {this.props.AddressId ? <Link to={{pathname:"/ShopPayment",addressId:this.props.AddressId}} type="button" className="btn btn-red">Continue</Link>:""}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.addressDetail.addressDetail,"address detail")
  return ({
    priceDetail: state.cart.cartprice
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
      fetchCart:() => dispatch(fetchCart()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceDetail)


