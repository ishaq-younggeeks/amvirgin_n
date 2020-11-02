// import {myData,fetchingData,product,release} from './ProductDetailAction';
import {ADDRESS_DETAIL} from './OrderConstant';


const ACTION_HANDLERS = {
  [ADDRESS_DETAIL]: (state, action) => {
    return {
      ...state,
      addressDetail:action.data
    }
  }
};

const initialState = {
  addressDetail:{},
};

export default function shoppingOrderReducer(state = initialState, action) {
  //console.log("hitting product detail reducers")
 // console.log(action.type,"in reducers")
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
