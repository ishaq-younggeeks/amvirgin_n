import axios from "axios";
import { actionTypes } from "redux-form";
import { shop } from "../../../common/apiConstants";
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
      let url = `${baseURL}${shop.address}`;
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
    let url = `${baseURL}${shop.address}`;
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
    let url = `${baseURL}${shop.address}${addressId}`;

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
    let url = `${baseURL}${shop.address}${addressId}`;

    axios.put(url, data, config).then((res) => {
      console.log("update res", res);
    });
  };
};

export const getRazorPayId = (selection) => {
  return (dispatch) => {
    let token = localStorage.getItem("UserToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log({selection});
    let paymentMethod = "";
    if (selection === "1")
    paymentMethod = "card";
    if(selection === "2")
    paymentMethod = "net-banking";
    if(selection === "3")
    paymentMethod = "cash-on-delivery";
    if(selection === "4")
    paymentMethod = "upi";
    if(selection === "5")
    paymentMethod = "wallet";


    let params = {
      sessionId: localStorage.getItem("session"),
      paymentMode: paymentMethod
    }

    axios
      .post(`${baseURL}${shop.checkout}`, params, config)
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

export const placeOrderFinal = (addressId, selection, razorPayId, razorpay_payment_id="", razorpay_signature="", history) => {
  return (dispatch) => {
    let token = localStorage.getItem("UserToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    let paymentMethod = "1";
    if (selection === "1")
    paymentMethod = "card";
    if(selection === "2")
    paymentMethod = "net-banking";
    if(selection === "3")
    paymentMethod = "cash-on-delivery";
    if(selection === "4")
    paymentMethod = "upi";
    if(selection === "5")
    paymentMethod = "wallet";

    console.log("Response :", addressId, paymentMethod, razorPayId, typeof(razorpay_payment_id), razorpay_signature);
    let data ={}
    let params ={}
    data = {
      sessionId: localStorage.getItem("session"),
      addressId: addressId,
      billingAddressId: addressId,
      orderId: razorPayId,
      paymentMode: paymentMethod,

    }

    if(paymentMethod=="cash-on-delivery"){
      console.log("calling cod")
      params = data
    }
    else {
      console.log("callin not cod")
      params = {
        ...data,
        paymentId: razorpay_payment_id,
        transactionId: razorpay_payment_id,
        signature: razorpay_signature}
    }

    axios
    .post(`${baseURL}${shop.placeOrder}`, params, config)
    .then((res) => {
      console.log(res);
      if(res.data.status === 201 || 403){
        dispatch({
          type: PLACE_ORDER,
          payload: res.data
        })

        history.push({pathname:`/success`});
      }
    })
    .catch((err) => console.log(err));
  }
}