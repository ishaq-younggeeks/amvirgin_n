import axios from 'axios';
import { baseURL } from "../../../../credential.json";
import {DASHBOARD_DATA} from './HomeConstant'


export const dashboardData = () => {
  return (dispatch) => {
    let url = `${baseURL}/customer/entertainment/homepage` 
    axios.get(`${url}`).then(res => {
     let  Data = res.data.data;
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