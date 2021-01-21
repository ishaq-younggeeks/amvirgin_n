import axios from 'axios';
import { baseURL } from "../../../../credential.json";
import {VIDEO_DATA,TRENDING_DATA} from './ShowConstant'

export const videoData = (videoId=parseInt(localStorage.getItem("videoId")),history="") => {
  return  (dispatch) => {
    let url = `${baseURL}/customer/videos/${videoId}` 
    axios.get(`${url}`).then(res => {
     let  Data = res.data.payload;
     console.log("data---------------------",Data);
      dispatch(myData(Data))
      localStorage.setItem("videoId",videoId)
     if(history){
     history.push({pathname:`/show`})
     }
    }).catch(error => {
      console.log(error)
    })
  }
}

export const trendingDetail = () => {

  return  (dispatch) => {
    let url = `${baseURL}/customer/entertainment/trending` 
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