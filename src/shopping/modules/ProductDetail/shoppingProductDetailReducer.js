// import {myData,fetchingData,product,release} from './ProductDetailAction';
import {PRODUCT_DETAIL} from './ProductDetailConstant';


const ACTION_HANDLERS = {
  [PRODUCT_DETAIL]: (state, action) => {
    return {
      ...state,
      productDetail:action.data
    }
  }
};

const initialState = {
  data:[],
  fetching:false,
  productDetail:[],
  offset:0,
  limit:10,
};

export default function shoppingProductDetailReducer(state = initialState, action) {
  //console.log("hitting product detail reducers")
 // console.log(action.type,"in reducers")
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
