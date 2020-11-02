import axios from 'axios';
import { baseURL } from "../../../credential.json";
import {COLLECTION_DATA,CLEAR_COLLECTION_DATA} from './CollectionConstant'

export const collectionData = (collectionId=parseInt(localStorage.getItem("collectionId"))) => {

  return  (dispatch) => {
    let url = `${baseURL}/customer/entertainment/section/${collectionId}` 
    axios.get(`${url}`).then(res => {
     let  Data = res.data.data;
      dispatch(myData(Data))
      localStorage.setItem("collectionId",collectionId)
     console.log("hitting collection data",Data)
    }).catch(error => {
      console.log(error)
    })
  }

}

export const clearCollectionData = () => {
  console.log("hitting", "clear detail")
  return dispatch =>{
    dispatch({
      type: CLEAR_COLLECTION_DATA,
      data: {}
    });
  }
}

export function myData(data) {
  return {
      type:COLLECTION_DATA,
      data:data
  }
}