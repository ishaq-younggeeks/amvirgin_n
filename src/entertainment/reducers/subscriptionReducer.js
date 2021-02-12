import {RECEIVED_SUBSCRIPTION_DATA, SUBSCRIPTION_CHECKOUT, SUBSCRIPTION_FINAL} from '../constants/subscription.constant'
import {subscribeList} from "../actions/subscription.actions"
import { baseURL } from "../../credential.json";
import axios from 'axios';
import { param } from 'jquery';


const initialState = {
  listingSubscriptionData: [],
  subscriptionCheckout: "",
  subscriptionFinal: {}
}


export const subscribeListData = () => {
  return dispatch => {
    axios.get(`${baseURL}/customer/subscriptions`)
    .then((res) => {
      let dataList = []
      dataList = res.data.payload
      dispatch(subscribeList(dataList))
    }) .catch((error => {
      console.log(error)
    }))
  }
}

export const susbcriptionCheckout = (id) => {
  return (dispatch) => {
    let token = localStorage.getItem("UserToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    axios
    .get(`${baseURL}/customer/subscriptions/checkout/${id}`, config)
    .then((res) => {
      console.log(res);
      if(res.data.status === 200 || 201){
        dispatch({
          type: SUBSCRIPTION_CHECKOUT,
          payload: res.data.payload.rzpOrderId
        })
      }
    })
    .catch((err) => console.log(err));
  }
}

export const subscriptionFinalFnc = (transactionId, paymentId, signature, orderId, history) => {
  return(dispatch) => {
    let token = localStorage.getItem("UserToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }

    let params = {
      transactionId, paymentId, signature, orderId
    }

    axios
    .get(`${baseURL}/customer/subscriptions/checkout`, params, config)
    .then((res) => {
      console.log(res);
      if(res.data.status === 200 || 201){
        dispatch({
          type: SUBSCRIPTION_FINAL,
          payload: res.data
        })
      }
    })
    .catch((err) => console.log(err));
  }
}

const ACTION_HANDLERS = {
  [RECEIVED_SUBSCRIPTION_DATA]: (state, action) => {
    return {
      ...state,
      listingSubscriptionData: action.data
    };
  },
  [SUBSCRIPTION_CHECKOUT]: (state, action) => {
    return {
      ...state,
      subscriptionCheckout: action.payload
    };
  },
  [SUBSCRIPTION_FINAL]: (state, action) => {
    return {
      ...state,
      subscriptionFinal: action.payload
    };
  },
};

export default function subscriptionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

