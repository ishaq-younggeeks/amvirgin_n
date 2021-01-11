import axios from "axios";
import { baseURL } from "../../../../../credential.json";
import {
  GET_ALL_ORDERS,
  VIEW_ORDER,
  AFTER_STATUS_CHANGE,
} from "./sellerOrderConstant";

export const myOrderList = (activeState, current, perPage) => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let config = {
      headers: { Authorization: "Bearer " + token },
      params: {
        page: current,
        per_page: perPage,
      },
    };


    console.log("request",config)
    axios
      .get(`${baseURL}/seller/orders?status=${activeState}`, config)
      .then((res) => {
        console.log("My Orders List ", res);
        if (res.data.status === 200) {
          dispatch({
            type: GET_ALL_ORDERS,
            payload: res.data.payload.data,
            payload2: res.data.payload.meta,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const changeOrderStatusBulk = (key=null, status) => {
  return (dispatch) => {
    console.log("changeOrderStatusBulk keys length",key.toString())
    let allKey = key.toString();
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        allKey,
      },
    };
    console.log("Dispatched Order Bulk: ", allKey);
     axios.put(`${baseURL}/seller/orders/status?key=${allKey}&status=${status}`, {}, config)
     .then(res => {
       console.log("Bulk Order Status",res)
       if (res.data.status === 200) {
        dispatch({
          type: AFTER_STATUS_CHANGE,
          payload: key,
        });
      }
    })
    .catch(err => console.log(err));
  };
};

export const changeOrderStatus = (key, status, fulfilledBy=null, courierName=null, airwayBillNumber=null, dispatchedOn=null) => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        key,
      },
    };
    let data = {};
    if(status !== null && fulfilledBy !== null && courierName === null){
      data = {
        status,
        fulfilledBy,
      };  
    }
    else data = {
      status,
      fulfilledBy,
      courierName,
      airwayBillNumber,
      dispatchedOn,
    }
   

    console.log("Dispatched Order Single: ", data);
     axios.put(`${baseURL}/seller/orders/${key}/status`, data, config)
     .then(res => {
       console.log("Single Order Status",res,key)
       if (res.data.status === 200) {
        dispatch({
          type: AFTER_STATUS_CHANGE,
          payload: key,
        });
      }
    })
    .catch(err => console.log(err));
  };
};

// export const changeOrderStatusInBulk = (orderId, status) => {
//   return (dispatch) => {
//     let token = localStorage.getItem("token");
//     let config = {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//       params: {
//         orderId,
//       },
//     };
//     let data = {
//       status,
//     };
//     axios
//       .put(`${baseURL}/seller/status/batch-update`, data, config)
//       .then((res) => {
//         if (res.data.status === 200) {
//           console.log("Bulk Order Status", res);
//           dispatch({
//             type: AFTER_STATUS_CHANGE,
//             payload: orderId,
//           });
//         }
//       })
//       .catch((err) => console.log(err));
//   };
// };

export const downloadLabel = (id) => {
  return (dispatch) => {
    dispatch({
      type: AFTER_STATUS_CHANGE,
      payload: id,
    });
  };
};

export const FilterBySearch = (currentPage, perPage, key, status) => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let config = {
      headers: { Authorization: "Bearer " + token },
      params: {
        page: currentPage,
        per_page: perPage,
        key: key,
        status: status,
      },
    };
    console.log("Filter: ", config.params);
    axios
      .get(`${baseURL}/seller/orders`, config)
      .then((res) => {
        console.log("search response   ", res);
        if (res.data.status === 200) {
          dispatch({
            type: GET_ALL_ORDERS,
            payload: res.data.payload.data,  //res.data.data,
            payload2: res.data.payload.meta  //res.data.meta,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const ViewOrderItem = (id) => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let config = { headers: { Authorization: "Bearer " + token } };
    axios
      .get(`${baseURL}/seller/orders/${id}`, config)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          dispatch({
            type: VIEW_ORDER,
            payload: res.data.payload,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const clearDetail = () => {
  //console.log("hitting", "clear detail")
  return (dispatch) => {
    dispatch({
      type: "CLEAR_PRODUCT_DETAIL",
      payload: {},
    });
  };
};

export const clearState = (state, type) => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_REDUX_STATE",
      payload: {
        state: state,
        load: type,
      },
    });
  };
};
