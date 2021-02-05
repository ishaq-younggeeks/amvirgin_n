import axios from "axios";
import { actionTypes } from "redux-form";
import { baseURL } from "../../../credential.json";
import { ADDRESS_DETAIL, GET_RAZORPAY, PLACE_ORDER } from "./OrderConstant";
//import {fetchCart} from '../Cart/shoppingCartAction'

export const getAddressDetail = () => {
  let token = localStorage.getItem("UserToken");

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  if (!token) {
    window.location.href = "/login";
  } else {
    return (dispatch) => {
      let url = `${baseURL}/customer/addresses`;
      axios
        .get(`${url}`, config)
        .then((res) => {
          let addressDetail = res.data.data;
          console.log("getting address", addressDetail);
          // dispatch(fetchCart())
          dispatch(myData(addressDetail));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
};

export const saveAddressDetail = (addressDetail) => {
  let token = localStorage.getItem("UserToken");

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return (dispatch) => {
    let url = `${baseURL}/customer/addresses`;
    axios
      .post(`${url}`, addressDetail, config)
      .then((res) => {
        dispatch(getAddressDetail());
        console.log("Address saved succesfullty", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export function myData(data) {
  return {
    type: ADDRESS_DETAIL,
    data: data,
  };
}

export const deleteAddress = (addressId) => {
  let token = localStorage.getItem("UserToken");

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return (dispatch) => {
    let url = `${baseURL}/customer/addresses/${addressId}`;

    axios.delete(url, config).then((res) => {
      console.log("delete res", res);
    });
  };
};

export const updateSavedAddress = (addressId, data) => {
  console.log("calling action");

  let token = localStorage.getItem("UserToken");

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return (dispatch) => {
    let url = `${baseURL}/customer/addresses/${addressId}`;

    axios.put(url, data, config).then((res) => {
      console.log("update res", res);
    });
  };
};

export const getRazorPayId = () => {
  return (dispatch) => {
    let token = localStorage.getItem("UserToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let params = {
      sessionId: localStorage.getItem("session"),
      paymentMode: "cash-on-delivery",
    };

    axios
      .post(`${baseURL}/customer/cart/checkout`, params, config)
      .then((res) => {
        console.log(res);
        if(res.data.status === 200){
          dispatch({
            type : GET_RAZORPAY,
            payload: res.data.payload.rzpOrderId
          })
        }
      })
      .catch((err) => console.log(err));
  };
};

export const placeOrderFinal = (addressId, paymentMode, razorPayId) => {
  return (dispatch) => {
    let token = localStorage.getItem("UserToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    let params = {
      sessionId: localStorage.getItem("session"),
      addressId: addressId,
      billingAddressId: addressId,
      paymentMode: paymentMode,
      orderId: razorPayId
    }

    axios
    .post(`${baseURL}/customer/cart/submit`, params, config)
    .then((res) => {
      console.log(res);
      if(res.data.status === 201){
        dispatch({
          type: PLACE_ORDER,
          payload: res.data
        })
      }
    })
    .catch((err) => console.log(err));
  }
}