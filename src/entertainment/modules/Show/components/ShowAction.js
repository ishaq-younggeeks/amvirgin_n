import axios from 'axios';
import { baseURL,baseURL2 } from "../../../../credential.json";
import {VIDEO_DATA,TRENDING_DATA} from './ShowConstant'

export const videoData = (videoId=parseInt(localStorage.getItem("videoId")),history="") => {
  return  (dispatch) => {
    let url = `${baseURL2}/customer/videos/${videoId}` 
    axios.get(`${url}`).then(res => {
     let  Data = res.data.payload;
     console.log("data---------------------",videoId);
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
    let url = `${baseURL2}/customer/entertainment/trending` 
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