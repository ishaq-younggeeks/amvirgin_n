import axios from 'axios';
import { baseURL } from "../../../../credential.json";
import { FETCH_PAYMENTOVERVIEW,FETCH_PAYMENTHISTORY,FETCH_ORDERTRANSACTION} from './PaymentConstant'
import React from 'react';
import $ from 'jquery'
import { seller } from '../../../../common/apiConstants';


// export const getPaymentOverview = () => {
//   return dispatch => {
//     let token = localStorage.getItem("token");
//     let config = {
//       headers: {
//         Authorization: "Bearer " + token
//       }
//     };
//     axios
//       .get(`${baseURL}/seller/payments/overview`, config)
//       .then(res => {
// 		   console.log("Payments Overview :", res);
//         if (res.data.status === 200) {
//           dispatch({
//             type: FETCH_PAYMENTOVERVIEW,
//             payload: res.data.payload
//           });
//         }
//       })
//       .catch(err => console.log(err));
//   };
// };

export const getPaymentHistoryInitial = (current, perPage) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params: {
        page: current,
        per_page: perPage
      }
    };

    axios
      .get(`${baseURL}${seller.payments}`, config)
      .then(res => {
		   console.log("Payments History Overview :", res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_PAYMENTHISTORY,
            payload: res.data.payload.data,
            payload2: res.data.payload.meta
          });
        }
      })
      .catch(err => console.log(err));
  };
}

export const getPaymentHistoryFromTo = (page,per_page, from, to, key) => {
  console.log("Month & Year", page, per_page, from, to, key);
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
        key
      }
    };
    axios
      .get(`${baseURL}${seller.payments}?start=${from}&end=${to}`, config)
      .then(res => {
		   console.log("Payments History Search FromTo :", res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_PAYMENTHISTORY,
            payload: res.data.payload.data,
            payload2: res.data.payload.meta
          });
        }
      })
      .catch(err => console.log(err));
  };
}

export const getPaymentHistorySearch = (page,per_page, from, to, key) => {
  console.log("Key :", key)
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        page,
        per_page,
        // from,
        // to,
        // key
      }
    };
    axios
      .get(`${baseURL}${seller.payments}?key=${key}`, config)
      .then(res => {
		   console.log("Payments History Search Key:", res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_PAYMENTHISTORY,
            payload: res.data.payload.data,
            payload2: res.data.payload.meta
          });
        }
      })
      .catch(err => console.log(err));
  };
}

export const getTransactionsOverview = (current, perPage) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        params: {
          page: current,
          per_page: perPage
        }
      }
    };
    axios
      .get(`${baseURL}${seller.transactions}`, config)
      .then(res => {
		   console.log("Transactions Overview :", res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_ORDERTRANSACTION,
            payload: res.data.payload.data,
            payload2: res.data.payload.meta
          });
        }
      })
      .catch(err => console.log(err));
  };
}

export const getTransactionsFromTo = (page,per_page,from,to,key) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        page,
        per_page,
        // from,
        // to,
        // key
      }
    };
    axios
      .get(`${baseURL}${seller.transactions}?start=${from}&end=${to}`, config)
      .then(res => {
		   console.log("Transactions Search FromTo: ", res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_ORDERTRANSACTION,
            payload: res.data.payload.data,
            payload2: res.data.payload.meta
          });
        }
      })
      .catch(err => console.log(err));
  };
}

export const getTransactionsSearch = (current, perPage,from,to,key) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        page: current,
        per_page: perPage,
        // key
      }
    };
    axios
      .get(`${baseURL}${seller.transactions}?referenceId=${key}`, config)
      .then(res => {
		   console.log("Transactions Search Key: ", res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_ORDERTRANSACTION,
            payload: res.data.payload.data,
            payload2: res.data.payload.meta
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
