import {FETCH_TICKET_LIST,SAVE_BUISNESSDETAILS,FETCH_BANKDETAILS,CREATE_STATUS,FETCH_AGREEMENT,FETCH_AGREEMENTSTATUS} from './SellerSupportConstant';

const initialState = {
  ticketList:[],
  bankDetails:[],
  savedStatus:{},
  agreement:{},
  agreementStatus:{}
};

export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_TICKET_LIST:
        return {
          ...state,
          ticketList: action.payload,

        };
      case FETCH_BANKDETAILS:
        return {
          ...state,
          bankDetails:action.payload,

        }
      case CREATE_STATUS:
        return {
          ...state,
          savedStatus:action.payload
                }
      case FETCH_AGREEMENTSTATUS:
        return {
          ...state,
          agreementStatus:action.payload
        }          
      case FETCH_AGREEMENT:
        return {
          ...state,
          agreement:action.payload
        }          
      default:
        return state;
    }
  }