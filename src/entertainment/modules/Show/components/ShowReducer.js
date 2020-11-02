import {VIDEO_DATA,CLEAR_VIDEO_DATA,TRENDING_DATA} from './ShowConstant';


const ACTION_HANDLERS = {
  [VIDEO_DATA]: (state, action) => {
    return {
      ...state,
      videoData:action.data
    }
  },
  [CLEAR_VIDEO_DATA]: (state, action) => {
    return {
      ...state,
      videoData:action.data
    }
  },
  [TRENDING_DATA]:(state,action) => {
    return {
      ...state,
      trendingData:action.data
    }

  }

};

const initialState = {
  videoData:{},
  trendingData:{}
};

export default function ShowVideos(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
