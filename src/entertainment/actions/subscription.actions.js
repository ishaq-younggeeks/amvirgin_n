import {RECEIVED_SUBSCRIPTION_DATA} from '../constants/subscription.constant';

export function subscribeList (data){
  return {
    type:RECEIVED_SUBSCRIPTION_DATA,
    data:data
  }
}

export default {
  subscribeList,
}