import { ALL_RETURN_ORDERS, APPROVE_RETURN, DISAPPROVE_RETURN } from "./ReturnConstant";

const initialState = {
  returnOrders: [],
  isFetching:true,
  key:""
};

export default function (state=initialState, action) {
  switch (action.type) {
    case ALL_RETURN_ORDERS:
      return {
        ...state,
        returnOrders: action.payload,
        isFetching: false
      };
    case APPROVE_RETURN:
      return {
        ...state,
        key: action.payload
      }; 
    case DISAPPROVE_RETURN:
        return {
        ...state,
        key: action.payload
      };   
    default:
      return state;
  }
};
