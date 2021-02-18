import {
  VIDEO_DATA,
  CLEAR_VIDEO_DATA
  , TRENDING_DATA,
  RENT_A_VIDEO,
  ALREADY_RENTED,
  ALL_RENTED_VIDEOS,
  RENT_CHECKOUT,
  FETCH_RENTALVEDIO
} from './ShowConstant';


const ACTION_HANDLERS = {
  [VIDEO_DATA]: (state, action) => {
    return {
      ...state,
      videoData: action.data
    }
  },
  [CLEAR_VIDEO_DATA]: (state, action) => {
    return {
      ...state,
      videoData: action.data
    }
  },
  [TRENDING_DATA]: (state, action) => {
    return {
      ...state,
      trendingData: action.data
    }
  },
  [RENT_A_VIDEO]: (state, action) => {
    return {
      ...state,
      rentVideo: action.payload
    }
  },
  [ALREADY_RENTED]: (state, action) => {
    return {
      ...state,
      videoRentedAlready: action.payload
    }
  },
  [ALL_RENTED_VIDEOS]: (state, action) => {
    return {
      ...state,
      allRentedVideos: action.payload
    }
  },
  [RENT_CHECKOUT]: (state, action) => {
    return {
      ...state,
      razorPay: action.payload
    }
  },
};

const initialState = {
  videoData: {},
  trendingData: {},
  rentVideo: "",
  rentedVedio: [],
  allRentedVideos: [],
  razorPay: ""
};

export default function ShowVideos(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
