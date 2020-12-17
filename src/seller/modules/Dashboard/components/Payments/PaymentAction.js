import axios from 'axios';
import { baseURL } from "../../../../../credential.json";
import { FETCH_PAYMENTOVERVIEW,FETCH_PAYMENTHISTORY,FETCH_ORDERTRANSACTION} from './PaymentConstant'
import React from 'react';
import $ from 'jquery'


export const getPaymentOverview = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .get(`${baseURL}/seller/payments/overview`, config)
      .then(res => {
		   console.log("getting payment overview",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_PAYMENTOVERVIEW,
            payload: res.data.payload
          });
        }
      })
      .catch(err => console.log(err));
  };
};

export const getPaymentHistory = (page,per_page,from,to,neftId) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        page,
        per_page,
        from,
        to,
        neftId
      }
    };
    axios
      .get(`${baseURL}/seller/payments/previous?neft_id=${neftId}`, config)
      .then(res => {
		   console.log("getting payment previous",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_PAYMENTHISTORY,
            payload: res.data.payload.data
          });
        }
      })
      .catch(err => console.log(err));
  };
}

export const getPaymentHistoryInitial = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .get(`${baseURL}/seller/payments/previous`, config)
      .then(res => {
		   console.log("getting payment previous",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_PAYMENTHISTORY,
            payload: res.data.payload.data
          });
        }
      })
      .catch(err => console.log(err));
  };
}

export const getOrderWiseTransaction = (page,per_page,from,to,query) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        page,
        per_page,
        from,
        to,
        query
      }
    };
    axios
      .get(`${baseURL}/seller/payments/transactions?orderNumber=${query}`, config)
      .then(res => {
		   console.log("getting order transaction",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_ORDERTRANSACTION,
            payload: res.data.payload.data
          });
        }
      })
      .catch(err => console.log(err));
  };
}

// export const clearSavedStatus = () => {
//   console.log("working clear state")
//   return dispatch => {
//     dispatch({
//       type: BUISNESS_STATUS,
//       payload: {}
//     });
//   }
// }
