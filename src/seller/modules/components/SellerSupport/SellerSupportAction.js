import axios from 'axios';
import { baseURL } from "../../../../credential.json";
import { FETCH_TICKET_LIST,SAVE_BUISNESSDETAILS,FETCH_BANKDETAILS,CREATE_STATUS,FETCH_AGREEMENT,FETCH_AGREEMENTSTATUS} from './SellerSupportConstant'
import React from 'react';
import $ from 'jquery'
import { seller } from '../../../../common/apiConstants';


export const getMyTickets = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .get(`${baseURL}${seller.support}`, config)
      .then(res => {
		   console.log("getting ticekt details",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_TICKET_LIST,
            payload: res.data.payload
          });
        }
      })
      .catch(err => console.log(err));
  };
};


export const saveTicketDetails = (data) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    let params = {
      action:"read"
    }
    axios.post(`${baseURL}${seller.support}`,data,config)
    .then(res =>{
        dispatch({
          type: CREATE_STATUS,
          payload: res.data
        });
      console.log("save ticekt details",res)
    })
    .catch(err => console.log(err))
  }
}




export const clearSavedStatus = () => {
  console.log("working clear state")
  return dispatch => {
    dispatch({
      type: CREATE_STATUS,
      payload: {}
    });
  }
}
