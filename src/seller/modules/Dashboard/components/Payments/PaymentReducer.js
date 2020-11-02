import {FETCH_PAYMENTOVERVIEW,FETCH_PAYMENTHISTORY,FETCH_ORDERTRANSACTION} from './PaymentConstant';

const initialState = {
  previewDetail:[],
  paymentHistory:[],
  savedStatus:{},
  orderTransaction:[],
  agreementStatus:{}
};

export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_PAYMENTOVERVIEW:
        return {
          ...state,
          previewDetail: action.payload,

        };
      case FETCH_PAYMENTHISTORY:
        return {
          ...state,
          paymentHistory:action.payload
        }
      case FETCH_ORDERTRANSACTION:
        return {
            ...state,
            orderTransaction:action.payload
        }     
         
      default:
        return state;
    }
  }