import {FETCH_PAYMENTOVERVIEW,FETCH_PAYMENTHISTORY,FETCH_ORDERTRANSACTION} from './PaymentConstant';

const initialState = {
  previewDetail:[],
  paymentHistory:[],
  savedStatus:{},
  orderTransaction:[],
  agreementStatus:{},
  paymentsMeta: {},
  transactionsMeta: {}
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
          paymentHistory:action.payload,
          paymentsMeta:action.payload2
        }
      case FETCH_ORDERTRANSACTION:
        return {
            ...state,
            orderTransaction:action.payload,
            transactionsMeta: action.payload2
        }     
         
      default:
        return state;
    }
  }