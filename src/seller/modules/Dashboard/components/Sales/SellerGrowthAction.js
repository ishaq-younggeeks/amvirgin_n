import axios from 'axios';
import { baseURL } from "../../../../../credential.json";
import {FETCH_SALESSDETAILS } from './SellerGrowthConstant'
import React from 'react';
import $ from 'jquery'


export const getSales = (days) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        days
      }
    };
    axios
      .get(`${baseURL}/seller/growth/overview`, config)
      .then(res => {
		   console.log("getting growth sales details",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_SALESSDETAILS,
            payload: res.data.payload
          });
        }
      })
      .catch(err => console.log(err));
  };
};




