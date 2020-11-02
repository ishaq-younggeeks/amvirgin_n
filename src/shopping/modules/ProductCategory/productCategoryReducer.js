import axios from "axios";
import { browserHistory } from "react-router";

import {
  product,
  fetchingData
} from "../ProductCategory/productCategoryAction";
import { baseURL } from "../../../credential.json";
import { PRODUCT_DATA, FETCHING } from "./productCategoryConstant";

import {isToggleOn} from "./productCategoryAction";
import { IS_TOGGLE } from "./productCategoryConstant";

// export const productData = (id, offset, limit) => {
//   return dispatch => {
//     console.log("hello worled");
//     dispatch(fetchingData(true));
//     let pagenition = {
//       offset,
//       limit
//     };
//     console.log(pagenition);
//     let url = `${baseURL}/shop/products/categoryby/${id}`;
//     console.log(url);
//     axios({
//       method: "post",
//       url: url,
//       data: pagenition
//     })
//       .then(res => {
//         console.log(res);
//         let productList = [];
//         productList = res.data.data;
//         dispatch(product(productList));
//       })
//       .catch(error => {
//         console.log(error);
//         dispatch(fetchingData(false));
//       });
//   };
// };

export const addCart = (toggle) => {
  return dispatch => {
    dispatch(isToggleOn(toggle))
    localStorage.setItem("item",toggle+1)
  }
}

const ACTION_HANDLERS = {
  [IS_TOGGLE]: (state, action) => {
    return {
      ...state,
      toggle: state.toggle + 1
    };
  },
  // [FETCHING]: (state, action) => {
  //   return {
  //     ...state,
  //     fetching: action.fetching
  //   };
  // }
};

const initialState = {
  toggle:0
};

export default function productCategoryReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
