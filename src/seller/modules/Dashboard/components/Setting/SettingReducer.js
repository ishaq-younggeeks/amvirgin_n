import {FETCH_BUISNESSDETAILS,SAVE_BUISNESSDETAILS,FETCH_BANKDETAILS,BUISNESS_STATUS,FETCH_AGREEMENT,FETCH_AGREEMENTSTATUS} from './SettingConstant';

const initialState = {
  buisnessDetails:[],
  bankDetails:[],
  savedStatus:{},
  agreement:{},
  agreementStatus:{}
};

export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_BUISNESSDETAILS:
        return {
          ...state,
          buisnessDetails: action.payload,

        };
      case FETCH_BANKDETAILS:
        return {
          ...state,
          bankDetails:action.payload,

        }
      case BUISNESS_STATUS:
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