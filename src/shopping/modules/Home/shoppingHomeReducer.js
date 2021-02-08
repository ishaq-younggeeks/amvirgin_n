import {myData,fetchingData,product,release} from './shoppingHomeAction';
import {DATA_RECEIVED,HOME_DATA,FETCHING,PRODUCT_DATA, ALL_DEALS} from './shoppingHomeConstant';
import axios from 'axios';
import { baseURL } from "../../../credential.json";
import { browserHistory, Redirect } from 'react-router';
import history from '../../../Store/history'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom';


export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchingData(true))
    axios.get(`${baseURL}/customer/categories`)
    .then(res => {
      let dataList = [];
      dataList = res.data;
      dispatch(myData(dataList))
      dispatch(fetchingData(false))
    }).catch (err => {
      console.log(err)
      dispatch(fetchingData(false))
    })
  }
}

export const productData = (category,sortBy="relevance",page="1",history) => {
  console.log(`calling category ${category}, calling history ${history},calling query,${sortBy}`);
  return (dispatch) => {
    dispatch(fetchingData(true))
    let url = `${baseURL}/customer/categories/${category}/products`
    // let url = `${baseURL}/customer/products/${category}`
    axios.get(url,{
      params: {
        sortBy
      }
    }).then(res => {
      console.log("fetching list",res);
      let productList= {}
      productList = res.data.payload
     
      dispatch(product(productList))
      if(res.data.status === 200) {
        console.log("res data",res);
      let productData = {
        "categoryId":category,
        "productHistory":history
      }
       localStorage.setItem("productData",JSON.stringify(productData));
        history.push({pathname:`/shop/${category}`,state: {categoryId:category,page:page,sortBy:sortBy}})
       // window.location.reload();
      }
    }).catch(error => {
      console.log(error)
      dispatch(fetchingData(false))
    })
  }
}

// export const viewAllDeals = () => {
//   return (dispatch) => {
//     dispatch(fetchingData(true))
//     let url = `${baseURL}/customer/shop/deals`
//     axios.get(url).then(res => {
//       console.log("fetching deals list", res);
//       let allDealsList = {}
//       allDealsList  = res.data.payload
     
//       dispatch(product(allDealsList))
//       if(res.data.status === 200) {
//         console.log("All Deals res :", res);
//       }
//     }).catch(error => {
//       console.log(error)
//       dispatch(fetchingData(false))
//     })
//   }
// }


const ACTION_HANDLERS = {
  [DATA_RECEIVED]: (state, action) => {
    return {
      ...state,
      data: action.data
    };
  },
  [FETCHING]: (state, action) => {
    return {
      ...state,
      fetching:action.fetching
    }
  },
  [PRODUCT_DATA]: (state, action) => {
    return {
      ...state,
      productList:action.productList
    }
  },
  [HOME_DATA]: (state, action) => {
    
    return {
      ...state,
      shoppinghomedata:action.payload,
    }
  },
  [ALL_DEALS]: (state, action) => {
    
    return {
      ...state,
      allDealsProducts:action.payload,
    }
  },
};

const initialState = {
  data:[],
  fetching:false,
  productList:[],
  offset:0,
  limit:10,
  shoppinghomedata:[],
  homedealdata:[],
  brandInFocus:[],
  trendingDeals:[],
  popularStuff:[],
  trendingNow:[],
  allDealsProducts:[]
};

export default function shoppingHomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
