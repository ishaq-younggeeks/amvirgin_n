import axios from 'axios';
import { baseURL } from "../../../../credential.json";
import {FETCH_CREATEADVT,CREATEADVT_STATUS,FETCH_ADVT, EDIT_ADVT, DELETE_ADVT} from './AdvConstant'
import React from 'react';
import $ from 'jquery'
import { seller } from '../../../../common/apiConstants';


export const fetchAdvt = (page=1) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        page
      }
    };
    axios
      .get(`${baseURL}${seller.advt}`, config)
      .then(res => {
		   console.log("getting growth sales details",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_ADVT,
            payload: res.data.payload
          });
        }
      })
      .catch(err => console.log(err));
  };
};


export const creatAdvt = (data) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    let params = {
      action:"read"
    }
    axios.post(`${baseURL}${seller.advt}`,data,config)
    .then(res =>{
        dispatch({
          type: FETCH_CREATEADVT,
          payload: res.data.payload
        })
        dispatch({  
          type: CREATEADVT_STATUS,
          payload: res.data
        });
      console.log("save buisness details",res)
    })
    .catch(err => console.log(err))
  }
}


export const editAdvt = (data, key) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }
    console.log(data, key)
    axios.post(`${baseURL}${seller.advt}${key}/update`, data, config)
    .then(res => {
      if(res.data.status === 200){
        dispatch({
            type: EDIT_ADVT,
            payload: res.data
        })
      }
      console.log("Edit promotion details: ", res);
    })
    .catch(err => console.log("Edit", err))
  }
}


export const deleteAdvt = (key) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios.delete(`${baseURL}${seller.advt}${key}`, config)
    .then(res =>{
        dispatch({  
          type: DELETE_ADVT,
          payload: res.data
        });
      console.log("Delete Advt", res)
    })
    .catch(err => console.log(err))
  }
}

export const clearState = (state,type) => {
  return dispatch => {
    dispatch({
      type:"CLEAR_REDUX_STATE",
      payload:{
        state:state,
        load:type
      }
    })
  }
}