import {GLOBAL_SEARCH_DATA,CLEAR_DATA} from '../globalConstant/Constant';


const ACTION_HANDLERS = {
  [GLOBAL_SEARCH_DATA]: (state, action) => {
    return {
      ...state,
      globalSearchData:action.data
    }
  },
  [CLEAR_DATA]: (state, action) => {
    return {
      ...state,
      globalSearchData:action.data
    }
  }

};

const initialState = {
  globalSearchData:{}
};

export default function globalSearch(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
