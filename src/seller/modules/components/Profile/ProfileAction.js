import Axios from 'axios';
import { FETCH_PROFILE,UPDATE_PROFILE,PROFILE_SAVED_STATUS } from './ProfileConstant'
import { baseURL } from "../../../../credential.json";
import React from 'react';
import Modal from 'react-modal';
import $ from 'jquery'
import { seller } from '../../../../common/apiConstants';


export const uploadDisplay = (data) => dispatch => {
  let token = localStorage.getItem('token');
  let progress=0;
  const config = {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //console.log("onUploadProgress", totalLength);
      $("#progress_block").css("display",'block')     
          console.log("calling",percentCompleted)
          $("#upload").css("width",percentCompleted+'%')
          $("#upload").text(`${percentCompleted}%`)
          if(percentCompleted ===100)
          {
            setTimeout(
            ()=>{$("#progress_block").css("display",'none')},2000)

          }
    },  
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  };

  Axios.post(`${baseURL}${seller.sellerProfile}/avatar`, data, config)
    .then(res => {
      console.log("updated avatar",res);
      //Still Working on It  
      Axios.get(`${baseURL}${seller.sellerProfile}`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        let data = res.data.data
        // $("#upload").css("width",'0%')
        if(progress==100){
      //  / $("#upload").css("display",'none') 
        progress=0
        console.log('--2',progress)
        }
        dispatch({
          type: FETCH_PROFILE,
          payload: data
        })
      })
      .catch(error => {
        console.log('Error in deleting Wishlist', error)
      })
    
    })
    .catch(error => {
      console.log('Failed to upload avatar.', error)
    })
}

export const Fetchdata = () => dispatch => {

  let token = localStorage.getItem('token')
  Axios.get(`${baseURL}${seller.sellerProfile}`, { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => {
      let data = res.data.data
      console.log("fetch profile",res);
      dispatch({
        type: FETCH_PROFILE,
        payload: data
      })
    })
    .catch(error => {
      console.log('Error in deleting Wishlist', error)
    })

}

export const ChangePassword =(passwordData) => dispatch =>{
  let token = localStorage.getItem('token')

  Axios.post(`${baseURL}${seller.sellerProfile}`,passwordData, { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => {
      let data = res.data.data
      console.log("update profile",res);
      dispatch({
        type: FETCH_PROFILE,
        payload: data
      })
    })
    .catch(error => {
      console.log('Error in deleting Wishlist', error)
    })
}


export const updateProfile = (data) => dispatch => {

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  Axios.put(`${baseURL}${seller.sellerProfile}`,data,config)
  .then(res => {

    console.log("update profile",res)
      if(res.data.status===200)
      {

        dispatch({
          type:UPDATE_PROFILE,
          payload:res.data.payload
        })
        dispatch({
          type: PROFILE_SAVED_STATUS,
          payload: res.data
        });
      }
  })
  .catch(error => {
    console.log(error);
  })

}


export const clearSavedStatus = () => {
  console.log("working clear state")
  return dispatch => {
    dispatch({
      type: PROFILE_SAVED_STATUS,
      payload: {}
    });
  }
}