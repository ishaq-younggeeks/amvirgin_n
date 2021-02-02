import {NEWS_CATEGORY, NEWS_LISTING} from "./NewsConstant";

const initialState = {
  newsList:[],
  fetchingData:false,
  newsCategory: [],
  newsListing: []
};

export default function(state = initialState, action) {
  switch(action.type){
    case NEWS_CATEGORY:
      return{
        ...state,
        newsCategory: action.payload
      }
    case NEWS_LISTING:
      return{
        ...state,
        newsListing: action.payload
      }  
    default:
      return state;  
  }
}
