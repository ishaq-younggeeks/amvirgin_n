import axios from 'axios';
import { entertainment } from '../../../../common/apiConstants';
import { baseURL,baseURL2 } from "../../../../credential.json";
import {DASHBOARD_DATA} from './HomeConstant'


export const dashboardData = () => {
  return (dispatch) => {
    let url = `${baseURL2}${entertainment.home}` 
    let config = {
      headers: {
        "Access-Control-Allow-Origin" : "*",
      },
    };
    axios.get(`${url}`).then(res => {
     let  Data = res.data.payload;
     console.log("Data :", Data)
      dispatch(myData(Data))
    }).catch(error => {
      console.log(error)
    })
  }
}

export function myData(data) {
  return {
      type:DASHBOARD_DATA,
      data:data
  }
}