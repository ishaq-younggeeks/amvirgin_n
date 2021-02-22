import {FETCH_ANNOUNCEMENT} from './AnnouncmentConstant';

const initialState = {
  announcement:''
};

export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_ANNOUNCEMENT:
        return {
          ...state,
          announcement: action.payload,

        };
      default:
        return state;
    }
  }