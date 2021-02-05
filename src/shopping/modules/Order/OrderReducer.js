// import {myData,fetchingData,product,release} from './ProductDetailAction';
import {ADDRESS_DETAIL, GET_RAZORPAY, PLACE_ORDER} from './OrderConstant';


const ACTION_HANDLERS = {
  [ADDRESS_DETAIL]: (state, action) => {
    return {
      ...state,
      addressDetail:action.data
    }
  },
  [GET_RAZORPAY]: (state, action) => {
    return {
      ...state,
      razorpayId: action.payload
    }
  },
  [PLACE_ORDER]: (state, action) => {
    return {
      ...state,
      placedMessage: action.payload
    }
  }
};

const initialState = {
  addressDetail:{},
  razorpayId : "",
  placedMessage: {}
};

export default function shoppingOrderReducer(state = initialState, action) {
  //console.log("hitting product detail reducers")
 // console.log(action.type,"in reducers")
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
