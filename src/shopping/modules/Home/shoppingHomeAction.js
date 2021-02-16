import {DATA_RECEIVED, HOME_DATA, ALL_DEALS} from './shoppingHomeConstant';
import {FETCHING , PRODUCT_DATA,FILTER_DATA} from './shoppingHomeConstant';
import axios  from "axios";
import { baseURL } from "../../../credential.json";
import { connect } from 'react-redux';
import { shop } from '../../../common/apiConstants';

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
  axios.get(`${baseURL}${shop.home}`)
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

export const allDeals = () => dispatch =>{
  axios.get(`${baseURL}${shop.allDeals}`)
  .then(res => {
    console.log("Shopping All Deals :", res)
    dispatch({
      type:ALL_DEALS,
      payload:res.data.data
    })
  })
}


export function fetchApplicableFilter(filterList) {
  console.log(filterList,"fhhfhfh")
  return {
      type:FILTER_DATA,
      payload:filterList
  }
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
  allDeals
}