import {RECEIVED_SUBSCRIPTION_DATA, SUBSCRIPTION_CHECKOUT, SUBSCRIPTION_FINAL} from '../constants/subscription.constant'
import {subscribeList} from "../actions/subscription.actions"
import { baseURL, baseURL2 } from "../../credential.json";
import axios from 'axios';
import { param } from 'jquery';
import { entertainment } from '../../common/apiConstants';


const initialState = {
  listingSubscriptionData: [],
  subscriptionCheckout: {},
  subscriptionFinal: {}
}


export const subscribeListData = () => {
  return dispatch => {
    axios.get(`${baseURL2}${entertainment.subscription}`)
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
    .get(`${baseURL}${entertainment.checkout}/${id}`, config)
    .then((res) => {
      console.log(res);
      if(res.data.status === 200 || 201){
        dispatch({
          type: SUBSCRIPTION_CHECKOUT,
          payload: res.data.payload
        })
      }
    })
    .catch((err) => console.log(err));
  }
}

export const subscriptionFinalFnc = (orderId, paymentId, signature, transactionId, history) => {
  return(dispatch) => {
    let token = localStorage.getItem("UserToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    }
        
    let params = {
      orderId, paymentId, signature, transactionId
    }

    axios
    .post(`${baseURL}${entertainment.checkout}`, params, config)
    .then((res) => {
      console.log(res);
      if(res.data.status === 200 || 201 || 403){
        dispatch({
          type: SUBSCRIPTION_FINAL,
          payload: res.data
        })
        history.push("/subscription/checkout")
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

