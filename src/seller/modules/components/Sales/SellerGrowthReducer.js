import {FETCH_SALESSDETAILS} from './SellerGrowthConstant';

const initialState = {
  salesDetail:{},
};

export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_SALESSDETAILS:
        return {
          ...state,
          salesDetail: action.payload,

        };          
      default:
        return state;
    }
  }