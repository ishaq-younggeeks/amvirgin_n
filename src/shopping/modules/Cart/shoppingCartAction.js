import Axios from 'axios';
import { baseURL } from "../../../credential.json";
import { API_CALLING,FETCH_CART, ADDTO_CART, DELETE_FROM_CART ,UPDATE_ITEM,AFTER_MOVETOWISHLIST_FETCH} from './shoppingCartConstant';
import $ from 'jquery';
import { shop } from '../../../common/apiConstants';

// To get the cart data.
export const fetchCart = () => dispatch => {
  let url = `${baseURL}${shop.fetchCart}`;
  let sessionid = localStorage.getItem('session');
  dispatch({
    type:API_CALLING,
  })
  Axios.get(`${url}` + 'sessionId=' + sessionid + '&customerId=' + 3)
    .then((res) => {
     
      console.log("fetched cart data",res)
      if(res.status === 200){
        if(res.data.data){
                    let total_items=res.data.data.cart.itemCount;
    $('#cart_counter').html(total_items?total_items:"");
    localStorage.setItem('total_item',total_items?total_items:"")
          console.log("Calling", res);
          let fetchedcart = res.data.data.cart
          let fetchedprice = res.data.data.cart
          dispatch({
            type: FETCH_CART,
            payload: fetchedcart,
            payload2: fetchedprice
          })
        }
        else {
          dispatch({
            type: FETCH_CART,
            payload: [],
            payload2: []
          })
        }
      }
     
    })
    .catch(error => {
      console.log(error)
    })
}

// Action For adding product to cart
export const addtoCart = (id,size) => dispatch => {
  console.log("id coming on select size",id,size)
  let url = `${baseURL}${shop.addToCart}`;
  let sessionid = localStorage.getItem('session');
  let data = {
    sessionId: sessionid,
    key: id,
    quantity:1,
    attributes: [
      {
        "color": "black"
      },
      {
        "size":"M"
      }
    ]
  }
  Axios.post(`${url}`, data).then((res) => {
    console.log(res)
    let total_items=res.data.data.cart.items.length;
    $('#cart_counter').html(total_items?total_items:"");
    localStorage.setItem('total_item',total_items?total_items:"")
    //console.log("cart length added",localStorage.getItem('total_item'))
    let fetchedcart = res.data.data.cart.items
    dispatch({
      type: ADDTO_CART,
      payload:fetchedcart
    })
    if(res.status=200){
      //console.log('successfull')
    }
  })
    .catch(error => {
      console.log(error)
    })
}

// Action to Delete Product From Cart
export const deletefromCart = (id) => dispatch => {
  let url = `${baseURL}${shop.deleteFromCart}`;
  let sessionid = localStorage.getItem('session');
  let data = {
    sessionId: sessionid,
    key: id,
    customerId: 3
  }
  Axios.post(`${url}`, data).then((res) => {
    let fetchedcart=res.data.data.cart
    let total_items=res.data.data.cart.items.length;
    $('#cart_counter').html(total_items?total_items:"");
    localStorage.setItem('total_item',total_items?total_items:"")
    //console.log("cart length deleted",localStorage.getItem('total_item'),res)
    dispatch({
      type: DELETE_FROM_CART,
      payload: fetchedcart
    })
  })
  .catch(error => {
    console.log(error)
  })
}

export const updateitem = (id,qty) => dispatch => {
  let url = `${baseURL}${shop.updateCart}`;
  let sessionid = localStorage.getItem('session');
  let data = {
    sessionId: sessionid,
    key: id,
    quantity:qty
  }
  Axios.put(`${url}`, data).then((res) => {
    console.log("after update quantity",res)
    let CartData = res.data.data.cart
    let fetchedprice = res.data.data.cart
    let total_items=res.data.data.cart.items.length;
    localStorage.setItem('total_item',total_items)
    console.log("cart------------",fetchedprice)
    dispatch({
      type: FETCH_CART,
      payload: CartData,
      payload2: fetchedprice
    })
  })
  .catch(error => {
      console.log(error)
  })
}

export const movetoWishlisht = (id) => dispatch => {
  let token = localStorage.getItem('UserToken')

  let url = `${baseURL}${shop.moveToWishlist}${id}`
  let sessionid =localStorage.getItem('session')

  let data  = {
    sessionId:sessionid
  }
  Axios.put(url,data,{ headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
    console.log("moved successfully",res);
    dispatch({
      type:AFTER_MOVETOWISHLIST_FETCH,
      payload:id
    })
    let total_items = parseInt(localStorage.getItem('total_item'))
    $('#cart_counter').html(total_items-1?total_items-1:"");
    localStorage.setItem('total_item',total_items-1?total_items-1:"")

  })
  .catch(err =>console.log(err))

}

export default {
  addtoCart,
  fetchCart,
  deletefromCart,
  updateitem
}