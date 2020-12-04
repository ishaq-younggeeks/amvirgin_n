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

    axios
      .get(`${baseURL}/seller/orders?status=${activeState}`, config)
      .then((res) => {
        console.log("my order list ", res);
        if (res.data.status === 200) {
          dispatch({
            type: GET_ALL_ORDERS,
            payload: res.data.data,
            payload2: res.data.meta,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const changeOrderStatus = (orderId, status, shippingMethod=null, courierName=null, airwayBillNumber=null, dispatchedOn=null) => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        orderId,
      },
    };

    let data = {
      status,
      shippingMethod,
      courierName,
      airwayBillNumber,
      dispatchedOn,
    };

    console.log("Dispatched Data:", data);
     axios.put(`${baseURL}/seller/orders/status`,data, config)
     .then(res => {
      console.log("order status",res)
      if (res.data.status === 200) {
        dispatch({
          type: AFTER_STATUS_CHANGE,
          payload: orderId,
        });
      }
    })
    .catch(err => console.log(err));
  };
};

export const changeOrderStatusInBulk = (orderId, status) => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        orderId,
      },
    };
    let data = {
      status,
    };
    axios
      .put(`${baseURL}/seller/status/batch-update`, data, config)
      .then((res) => {
        console.log("order status", res);
        if (res.data.status === 200) {
          dispatch({
            type: AFTER_STATUS_CHANGE,
            payload: orderId,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const downloadLabel = (id) => {
  return (dispatch) => {
    dispatch({
      type: AFTER_STATUS_CHANGE,
      payload: id,
    });
  };
};

export const FilterBySearch = (currentPage, perPage, query, status) => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let config = {
      headers: { Authorization: "Bearer " + token },
      params: {
        page: currentPage,
        per_page: perPage,
        query: query,
        status: status,
      },
    };
    axios
      .get(`${baseURL}/seller/orders`, config)
      .then((res) => {
        console.log("search response   ", res);
        if (res.data.status === 200) {
          dispatch({
            type: GET_ALL_ORDERS,
            payload: res.data.data,
            payload2: res.data.meta,
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
