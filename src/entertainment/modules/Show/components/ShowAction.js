import axios from 'axios';
import { entertainment } from '../../../../common/apiConstants';
import { baseURL, baseURL2 } from "../../../../credential.json";
import {VIDEO_DATA,TRENDING_DATA, RENT_A_VIDEO, ALREADY_RENTED, ALL_RENTED_VIDEOS, RENT_CHECKOUT} from './ShowConstant'

export const videoData = (videoId=parseInt(localStorage.getItem("videoId")),history="") => {
  return  (dispatch) => {
    let url = `${baseURL2}${entertainment.videos}${videoId}` 
    axios.get(`${url}`).then(res => {
     let  Data = res.data.payload;
     console.log("data---------------------", videoId);
      dispatch(myData(Data))
      localStorage.setItem("videoId",videoId)

     history.push({pathname:`/video/${videoId}`})
    }).catch(error => {
      console.log(error)
    })
  }
}

export const trendingDetail = () => {
  return  (dispatch) => {
    let url = `${baseURL2}${entertainment.trending}` 
    axios.get(`${url}`).then(res => {
     let  Data = res.data.data;
     console.log("trending data",Data);
      dispatch({
        type: TRENDING_DATA,
        data: Data
      })
    }).catch(error => {
      console.log(error)
    })
  }
}

export const rentCheckout = (videoId) => {
  return (dispatch) => {
    let token = localStorage.getItem('UserToken');
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }
    
    axios
    .post(`${baseURL2}${entertainment.rentCheckout}20`, {}, config)
    .then((res) => {
      console.log(res);
      if(res.status === 200){
        dispatch({
          type: RENT_CHECKOUT,
          payload: res.data.payload
        })
      }
    })
    .catch((err) => console.log(err)); 
  }
}

export const rentVideoSuccess = (paymentId, orderId, signature, transactionId, videoKey) => {
  return (dispatch) => {
    let token = localStorage.getItem("UserToken");
    let config = {
      headers : {
        Authorization: "Bearer " + token
      }
    } 

    let params = {
      paymentId,
      orderId,
      signature,
      transactionId,
      amount : 20
    }

    axios
    .post(`${baseURL2}${entertainment.rentCheckout}${videoKey}/submit`, params, config)
    .then((res) => {
      console.log(res);
      if(res.data.status === 201){
        dispatch({
          type: RENT_A_VIDEO,
          payload: res.data.message  
        })
      }
      if(res.data.status === 419){
        dispatch({
          type: ALREADY_RENTED,
          payload: res.data.message  
        })
      }
    })
    .catch((err) => console.log(err));
  }
}

export const allRentedVideos = () => {
  return (dispatch) => {
    let token = localStorage.getItem("UserToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    axios
    .get(`${baseURL2}${entertainment.getRental}`, config)
    .then((res) => {
      console.log(res);
      if(res.data.status === 200){
        dispatch({
          type: ALL_RENTED_VIDEOS,
          payload: res.data.payload
        })
      }
    })
    .catch((err) => console.log(err));
  }
}

export const clearVideoData = () => {
  return dispatch =>{
    dispatch({
      type: "CLEAR_VIDEO_DATA",
      data: {}
    });
  }
}

export function myData(data) {
  return {
      type:VIDEO_DATA,
      data:data
  }
}