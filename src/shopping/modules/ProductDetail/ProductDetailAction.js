import axios from 'axios';
import { baseURL } from "../../../credential.json";
import {PRODUCT_DETAIL} from './ProductDetailConstant'


export const productDetail = (productId,history) => {
  return (dispatch) => {
    console.log('calling productDetails',productId)
    let url = `${baseURL}/customer/products`;
    axios.get(`${url}/${productId}`).then(res => {
      let productDetail= []
      productDetail = res;
      let productDetailData = {
        "productId":productId,
        "productHistory":history
      }
      localStorage.setItem("productDetailData",JSON.stringify(productDetailData));
      dispatch(myData(productDetail))
      if(res.data.status === 200 && history) {
        console.log("res data",history);
        history.push({pathname:`/productdetail/${productId}`,state: {productId:productId}})
      }else{
       
      }
    }).catch(error => {
      console.log(error)
    })
  }
}

export function myData(data) {
  return {
      type:PRODUCT_DETAIL,
      data:data
  }
}