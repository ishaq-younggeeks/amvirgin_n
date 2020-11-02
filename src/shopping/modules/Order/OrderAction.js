import axios from 'axios';
import { baseURL } from "../../../credential.json";
import {ADDRESS_DETAIL} from './OrderConstant'
//import {fetchCart} from '../Cart/shoppingCartAction'


export const getAddressDetail = () => {

  let token = localStorage.getItem('UserToken')

let config = {
  headers: {
    Authorization: "Bearer " + token
  }
};

   if(!token){
    window.location.href='/login'
  }
   else {
  return (dispatch) => {
    let url = `${baseURL}/customer/addresses`
    axios.get(`${url}`,config).then(res => {
      let addressDetail = res.data.data
      console.log("getting address",addressDetail)
     // dispatch(fetchCart())
      dispatch(myData(addressDetail))
    }).catch(error => {
      console.log(error)
    })
  }
 }
}

export const saveAddressDetail = (addressDetail) => {

  let token = localStorage.getItem('UserToken')

let config = {
  headers: {
    Authorization: "Bearer " + token
  }
};

  return (dispatch) => {
    let url = `${baseURL}/customer/addresses`
    axios.post(`${url}`,addressDetail,config).then(res => {
      dispatch(getAddressDetail())
      console.log("Address saved succesfullty",res)
    }).catch(error => {
      console.log(error)
    })
  }
 
}

export function myData(data) {
  return {
      type:ADDRESS_DETAIL,
      data:data
  }
}

export const deleteAddress = (addressId) => {

  
  let token = localStorage.getItem('UserToken')

let config = {
  headers: {
    Authorization: "Bearer " + token
  }
};

  return (dispatch) => {
    let url = `${baseURL}/customer/addresses/${addressId}`

    axios.delete(url,config).then(res =>{
      console.log("delete res",res)
    })
  }
}


export const updateSavedAddress = (addressId,data) => {
console.log("calling action");
  
  let token = localStorage.getItem('UserToken')

let config = {
  headers: {
    Authorization: "Bearer " + token
  }
};

  return (dispatch) => {
    let url = `${baseURL}/customer/addresses/${addressId}`

    axios.put(url,data,config).then(res =>{
      console.log("update res",res)
    })
  }
}