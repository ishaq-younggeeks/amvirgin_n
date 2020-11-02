// import {PRODUCT_DATA,FETCHING} from './productCategoryConstant';
import {IS_TOGGLE} from './productCategoryConstant';

// export function product(productList) {
//   console.log(productList,"fhhfhfh")
//   return {
//       type:PRODUCT_DATA,
//       productList:productList
//   }
// }

// export function fetchingData(status) {
//   return {
//     type:FETCHING,
//     fetching:status
//   }
// }

export function isToggleOn(toggle) {
  console.log("Toggle",toggle)
  return {
    type:IS_TOGGLE,
    payload:toggle
  }
}

export default {
  //product,
  //fetchingData
  isToggleOn
}