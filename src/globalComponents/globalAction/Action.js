import axios from 'axios';
import { baseURL } from "../../credential.json"
import {GLOBAL_SEARCH_DATA,CLEAR_DATA} from '../globalConstant/Constant'

export const globalSearch = (key,type="entertainment") => {

  return  (dispatch) => {
    let url = `${baseURL}/customer/search`
    let params = {
      type,
      key
    }
    axios.get(`${url}`,{params}).then(res => {
     let  Data = res.data.data;
      dispatch({
        type:GLOBAL_SEARCH_DATA,
        data:Data
    })
     console.log("global Search Data",Data)
    }).catch(error => {
      console.log(error)
    })
  }

}

export const clearData = () => {
  console.log("hitting", "clear detail")
  return dispatch =>{
    dispatch({
      type: CLEAR_DATA,
      data: {}
    });
  }
}
