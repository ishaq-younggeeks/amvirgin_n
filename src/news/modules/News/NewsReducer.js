import axios from "axios";
import { baseURL } from "../../../credential.json";

export const DATA_RECEIVED = 'DATA_RECEIVED';
export const FETCHING = 'FETCHING';
export const NEWS_DATA = 'NEWS_DATA';
export const VIEW_PRODUCT = "VIEW_PRODUCT";
export const HOME_DATA = "HOME_DATA";

export function myData(data) {
  return {
      type:DATA_RECEIVED,
      data:data
  }
}

export function product(newsData) {
  return {
      type:NEWS_DATA,
      newsList:newsData
  }
}

export function fetchingData(status) {
  console.log("in fetching data")
  return {
    type:FETCHING,
    fetchingData:status
  }
}


export const newsListData = () => {
  console.log("i am in newsList")
  return (dispatch) => {
    dispatch(fetchingData(true))
    axios.get(`${baseURL}/customer/entertainment/homepage`)
      .then(res => {
        let data = res.data.data;
        dispatch(product(data))
      }) .catch(error => {
        console.log(error)
      })
    // axios.get(url,{
    //   params: {
    //     categoryId,
    //     sortKey
    //   }
    // }).then(res => {
    //  // console("fetching list")
    //   let productList= {}
    //   productList = res.data
     
    //   dispatch(product(productList))
    //   if(res.data.status === 200) {
    //    // console.log("res data",res);
    //   let productData = {
    //     "categoryId":categoryId,
    //     "productHistory":history
    //   }
    //    localStorage.setItem("productData",JSON.stringify(productData));
    //     history.push({pathname:`/shop/${categoryId}`,state: {categoryId:categoryId,page:page,sortKey:sortKey}})
    //    // window.location.reload();
    //   }
    // }).catch(error => {
    //   console.log(error)
    //   dispatch(fetchingData(false))
    // })
  }
}


const ACTION_HANDLERS = {
  [FETCHING]: (state, action) => {
    return {
      ...state,
      fetchingData: action.fetchingData
    };
  },
  [NEWS_DATA]: (state,action) => {
    return {
      ...state,
      newsList:action.newsList
    }
  }
}

const initialState = {
  newsList:[],
  fetchingData:false
};

export default function newsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
