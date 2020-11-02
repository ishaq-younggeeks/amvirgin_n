import axios from 'axios';
import { baseURL } from "../../../../../credential.json";
import { FETCH_ANNOUNCEMENT } from './AnnouncmentConstant'
import React from 'react';
import $ from 'jquery'




export const fetchAnnouncement = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .get(`${baseURL}/seller/announcements`, config)
      .then(res => {
		   console.log("getting all announcement",res.data);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_ANNOUNCEMENT,
            payload: res.data.payload
          });
        }
      })
      .catch(err => console.log(err));
  };
};

export const markAnnouncementStatus = (key) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        action:"read"
      }
    };
    let params = {
      action:"read"
    }
    axios.put(`${baseURL}/seller/announcements/${key}/mark`,null,config)
    .then(res =>{
      console.log("announcment status",res)
    })
    .catch(err => console.log(err))
  }
}
