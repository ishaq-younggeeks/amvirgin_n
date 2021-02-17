import axios from 'axios';
import { entertainment } from '../../../../common/apiConstants';
import { baseURL,baseURL2 } from "../../../../credential.json";
import {VIDEO_DATA,TRENDING_DATA} from './ShowConstant'

export const videoData = (videoId,history="") => {
  return  (dispatch) => {
    let url = `${baseURL2}${entertainment.videos}${videoId}` 
    axios.get(`${url}`).then(res => {
     let  Data = res.data.payload;
     console.log("data---------------------",videoId);
      dispatch(myData(Data))
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
     let  Data = res.data.payload;
     console.log("trending data",res.data.payload);
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