import React from 'react';
import Axios from 'axios';
import { baseURL } from "../../../credential.json";
import { API_CALL,FETCH_WISHLIST, DELETE_WISHLIST,MOVETO_CART } from './WishlistConstant';
import $ from 'jquery';
import { shop } from '../../../common/apiConstants';


export const AddWishlist = (id) => dispatch => {
  let token = localStorage.getItem('UserToken')
  // If user not registered then redirect to the login page
  if(!token){
    window.location.href='/login'
  }else{
  Axios.put(`${baseURL}${shop.wishlist}` + id, {}, { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => {
      $(`#wishlist${id}`).addClass('wishlistedbtn');
      $(`#wishlist${id}`).text("Wishlisted");
      console.log('product added successfull', res)
    })
    .catch(error => {
      console.log(error)
    })
  }
}

//No dispatch used
export const deleteWish = (id) => dispatch => {
  let token = localStorage.getItem('UserToken')

  Axios.delete(`${baseURL}${shop.wishlist}` + id, { headers: { "Authorization": `Bearer ${token}` } })
  .then(res => {
    let url = `${baseURL}/customer/wishlist`;
    Axios.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } })
    .then((res) => {
      let itemData = res.data.data;
      dispatch({
        type: FETCH_WISHLIST,
        payload: itemData
      })
    })
    .catch(error => {
      console.log(error, 'error');
    })
  })
  .catch(error => {
      console.log('Error in deleting Wishlist', error)
  })

}

// To get the cart data.
export const fetchWishlist = () => dispatch => {
  let token = localStorage.getItem('UserToken')
  let url = `${baseURL}${shop.wishlist}`;
  dispatch({
    type:API_CALL
  })
  Axios.get(`${url}`, { headers: { "Authorization": `Bearer ${token}` } })
    .then((res) => {
      let itemData = res.data.data;
      console.log("item wishlist",res.data.data);
      dispatch({
        type: FETCH_WISHLIST,
        payload: itemData
      })
    })
    .catch(error => {
      console.log(error, 'error');
    })
}

export const moveToCart = (id) => dispatch => {
  let token = localStorage.getItem('UserToken')
  let sessionId = localStorage.getItem('session')
  let config = {
    headers: { "Authorization": `Bearer ${token}` }
  }
  Axios.put(`${baseURL}${shop.wishlist}cart/${id}`,{sessionId},config)
  .then((res)=>{
    console.log("res after moving item to cart",res)
    if(res.data.status===200){
      console.log("move to cart and called if condtion");
      let total_items = localStorage.getItem('total_item')
      if(total_items=="")
      {
        total_items=1
      }
      else
        total_items=parseInt(total_items)+1
      console.log("total items",total_items,"ype of",typeof(total_items))
      $('#cart_counter').html(total_items?total_items:"");
      localStorage.setItem('total_item',total_items?total_items:"")
    }
    let itemData = id;
    dispatch({
      type: MOVETO_CART,
      payload: itemData
    })
  })

}

export default {
  fetchWishlist,
  AddWishlist
}