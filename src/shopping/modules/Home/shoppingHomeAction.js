import {DATA_RECEIVED, HOME_DATA} from './shoppingHomeConstant';
import {FETCHING , PRODUCT_DATA} from './shoppingHomeConstant';
import axios  from "axios";
import { baseURL } from "../../../credential.json";
import { connect } from 'react-redux';

export function myData(data) {
  return {
      type:DATA_RECEIVED,
      data:data
  }
}

export function product(productList) {
  //console.log(productList,"fhhfhfh")
  return {
      type:PRODUCT_DATA,
      productList:productList
  }
}

export const fetchHomeData=()=> dispatch =>{
  axios.get(`${baseURL}/customer/shop/homepage`)
  .then(res=>{
    console.log("shopping home data",res)
    dispatch({
      type:HOME_DATA,
      payload:res.data.data,
      // dealpayload:res.data.data.offerDetails,
      // brandInFocus:res.data.data.brandsInFocus,
      // trendingDeals:res.data.data.trendingDeals,
      // popularStuff:res.data.data.popularStuff,
      // trendingNow:res.data.data.trendingNow
    })
  })
}


export function fetchingData(status) {
  return {
    type:FETCHING,
    fetching:status
  }
}


export default {
  myData,
  fetchingData,
  product,
  fetchHomeData,
}