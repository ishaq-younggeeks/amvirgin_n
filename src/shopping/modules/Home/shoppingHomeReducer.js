import {myData,fetchingData,product,release,fetchApplicableFilter} from './shoppingHomeAction';
import {DATA_RECEIVED,HOME_DATA,FETCHING,PRODUCT_DATA, ALL_DEALS,FILTER_DATA} from './shoppingHomeConstant';
import axios from 'axios';
import { baseURL, baseURL2 } from "../../../credential.json";
import { browserHistory, Redirect } from 'react-router';
import history from '../../../Store/history'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom';


export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchingData(true))
    axios.get(`${baseURL2}/customer/categories`)
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

export const productData = (category,params={page:1},history) => {
  return (dispatch) => {
    dispatch(fetchingData(true))
    let url = `${baseURL2}/customer/categories/${category}/products`
    // let url = `${baseURL}/customer/products/${category}`
    let data={}
    console.log("sending params",params)
    // if(params===""){
    //   data.params =
    //     {
    //       sortBy:"relevance",
    //       page:"1"
    //     }
    //   }

    //   else{ 
    //     data=params.params
    //   }
    
    let fd = ""

    function otf(data){
      console.log("calling it",data,params)
      for(const prop in data){

        if(Array.isArray(data[prop]) && data[prop].length){
          let value=""
          if(prop==="price")
          {
            let item = data[prop].map(
              ({low,high})=>
              {
                return {low,high}
              }).sort((a,b)=>a.low>b.low?1:a.low<b.low?-1:0)

              value = `${prop}[high]=${item.high[0]}&${prop}[low]=${item.low[item.length-1]}&`
            fd = fd+value
          }

          else {
            value = data[prop].map((item)=>`${prop}[]=${item}&`).join('')
            fd = fd+value
          }
          
        }
        else if(data[prop]!==null && !Array.isArray(data[prop])){
          fd = fd+`${prop}=${data[prop]}&`
        }
      }
    }

    
  otf(params)
console.log("fd are",fd)
    let query = fd.slice(0,-1)
    axios.get(  `${url}?${query}`).then(res => {
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
        history.push({pathname:`/shop/${category}`,state: {categoryId:category,page:params.page,sortBy:params.sortBy}})
       // window.location.reload();
      }
    }).catch(error => {
      console.log(error)
      dispatch(fetchingData(false))
    })
  }
}


export const applicableFilter = (category) => {
  return (dispatch) =>{
    let url = `${baseURL2}/customer/categories/${category}/filters`

    axios.get(url)
    .then (res =>{
      
      if(res.data.status === 200){
        console.log("calling dispatch filter")
        dispatch(fetchApplicableFilter(res.data.payload))
      }

    })
    .catch(error =>{
      console.log(error)
    })
  }
}

// export const viewAllDeals = () => {
//   return (dispatch) => {
//     dispatch(fetchingData(true))
//     let url = `${baseURL2}/customer/shop/deals`
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
  [FILTER_DATA]:(state,action) => {

    return {
      ...state,
      filterList:action.payload
    }
    
  }
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
  allDealsProducts:[],
  filterList:[]
};

export default function shoppingHomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
