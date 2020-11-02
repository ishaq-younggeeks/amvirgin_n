import {RECEIVED_SUBSCRIPTION_DATA} from '../constants/subscription.constant'
import {subscribeList} from "../actions/subscription.actions"
import { baseURL } from "../../credential.json";
import axios from 'axios';


const initialState = {
  listingSubscriptionData: []
}


export const subscribeListData = () => {
  return dispatch => {
    axios.get(`${baseURL}/customer/subscriptions`)
    .then((res) => {
      let dataList = []
      dataList = res.data.data
      dispatch(subscribeList(dataList))
    }) .catch((error => {
      console.log(error)
    }))
  }
}

const ACTION_HANDLERS = {
  [RECEIVED_SUBSCRIPTION_DATA]: (state, action) => {
    return {
      ...state,
      listingSubscriptionData: action.data
    };
  },
};

export default function subscriptionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

