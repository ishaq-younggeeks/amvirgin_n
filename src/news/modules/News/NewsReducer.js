import {NEWS_CATEGORY, NEWS_LISTING, ARTICLE_DETAILS} from "./NewsConstant";

const initialState = {
  newsList:[],
  fetchingData:false,
  newsCategory: [],
  newsListing: [],
  detailsOfArticle: ""
};

export default function(state = initialState, action) {
  switch(action.type){
    case NEWS_CATEGORY:
      return {
        ...state,
        newsCategory: action.payload
      }
    case NEWS_LISTING:
      return {
        ...state,
        newsListing: action.payload
      }  
    case ARTICLE_DETAILS:
      return {
        ...state,
        detailsOfArticle: action.payload
      }  
    default:
      return state;  
  }
}
