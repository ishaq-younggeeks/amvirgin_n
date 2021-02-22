import {FETCH_PROFILE,UPDATE_PROFILE,PROFILE_SAVED_STATUS} from './ProfileConstant';

const initialState = {
  data:'',
  savedStatus:{}
};

export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_PROFILE:
        return {
          ...state,
          data: action.payload,

        };
      case UPDATE_PROFILE:
        return {
          ...state,
          data:action.payload
        }
      case PROFILE_SAVED_STATUS:
        return {
          ...state,
          savedStatus:action.payload
        }    
      default:
        return state;
    }
  }