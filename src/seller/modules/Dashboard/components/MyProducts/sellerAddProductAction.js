import axios from "axios";
import { baseURL, baseURL2 } from "../../../../../credential.json";
import React from 'react'
import  { Redirect } from 'react-router-dom'
import $ from 'jquery';
import { seller } from "../../../../../common/apiConstants";

export const currencyList = () => {
  return (dispatch, getState) => {
    axios.get(`${baseURL2}${seller.currencies}`).then(res => {
      dispatch({
        type: "CURRENCIES",
        payload: res.data.data
      });
    });
  };
};

export const categoryList = () => {
  return (dispatch, getState) => {
    axios.get(`${baseURL2}${seller.categories}`).then(res => {

      console.log("category list",res);
      dispatch({
        type: "CATEGORIES",
        payload: res.data.data
      });
    });
  };
};

export const countryList = () => {
  return (dispatch, getState) => {
    axios.get(`${baseURL2}${seller.countryState}`).then(res => {
      console.log("country list",res);
      dispatch({
        type: "COUNTRIES",
        payload: res.data.data
      });
    });
  };
};


export const stateList = (countryId) => {
  return (dispatch, getState) => {
    axios.get(`${baseURL2}${seller.countryState}/${countryId}/states`).then(res => {
      console.log("state list",res)
      dispatch({
        type: "STATE",
        payload: res.data.data
      });
    });
  };
};

export const cityList = (stateId) => {
  return (dispatch, getState) => {
    axios.get(`${baseURL2}${seller.countryState}/states/${stateId}/cities`).then(res => {
      dispatch({
        type: "CITY",
        payload: res.data.data
      });
    });
  };
};

export const hsnList = () => {
  return (dispatch) => {
    axios.get(`${baseURL2}${seller.hsn}`).then(res => {

      console.log("get hsn code",res);
      dispatch({
        type: "HSNCODE",
        payload: res.data.data
      });
    });
  };
};

export const attributeList = (categoryId) => {
  return (dispatch, getState) => {
    axios.get(`${baseURL2}${seller.categories}/${categoryId}/attributes`).then(res => {
      dispatch({
        type: "ATTRIBUTES",
        payload: res.data.data
      });
    });
  };
};

export const generateProductToken = () => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios.get(`${baseURL2}${seller.productToken}`,config)
    .then(res =>{
      console.log("add product token",res);
      localStorage.setItem("addProductToken", res.data.payload.token);
    })
  }
}

export const addProduct = productData => {
  console.log("action data 1",productData)
  return (dispatch, getState) => {
    let token = localStorage.getItem("token");
    let productToken = localStorage.getItem("addProductToken");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        'X-PRODUCT-TOKEN':productToken


      },
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
        $("#uploadProgress").children('span').text(`${percentCompleted}%`)
      }
    };
    axios
      .post(`${baseURL2}${seller.product}`, productData, config)
      .then(res => {
        let resmessage={
          res:res.data.message,
          status:res.data.status
        }
        if (res.data.status === 201) {
          dispatch({
            type: "ADDING_PRODUCT_ERROR",
            payload: resmessage
          });
          
        }
        console.log("seller product",res);
        if (res.data.status === 400) {
          dispatch({
            type: "ADDING_PRODUCT_ERROR",
            payload: resmessage
          });
          
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};


export const UploadBulkProduct = (data) =>{
 
  return dispatch=>{
    let token =localStorage.getItem('token')
    console.log("token available",token);
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    
    axios.post(`${baseURL2}${seller.bulk}`,data,config)
    .then(res=>{
      //console.clear();
      console.log('upload product successfully',res.data);
      dispatch({
        type: "Applyforapproval",
        payload: res.data
        });
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const getAllProducts = (current,perPage,status="active") => {
  return dispatch => {
    dispatch({
      type:'REQUEST'
    })
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params: {
          page: current,
          per_page:perPage
        }
      
    };
    axios
      .get(`${baseURL2}${seller.product}/?status=${status}`,config)
      .then(res => {
		   console.log("getting all product",res.data);
        if (res.data.status === 200) {
          dispatch({
            type: "GET_ALL_PRODUCTS",
            payload: res.data.payload,
            payload2:res.data.meta
          });
        }
      })
      .catch(err => console.log(err));
  };
};

export const getProduct = slug => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer" + token
      }
    };
    console.log(`${baseURL2}${seller.product}/${slug}`);
    axios
      .get(`${baseURL2}${seller.product}/${slug}`, config)
      .then(res => {
        console.clear();
        console.log("product details",res);
        if (res.data.status === 200) {
          dispatch({
            type: "GET_PRODUCT",
            payload: res.data.payload
          });
        } else {
          dispatch({
            type: "GET_PRODUCT_ERROR",
            payload: res.data.message
          });
        }
      })
      .catch(err => console.log(err));
  };
};

export const updateProductStatus = (id,status) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        status:status
      }
    };
    dispatch({
      type: "AFTER_DELETE_PRODUCTS",
      payload: id
    });
    axios
    .post(`${baseURL2}${seller.product}/change-status/${id}`,{},config)
    .then(res =>{
      if (res.data.status === 200) {
        dispatch({
          type: "AFTER_DELETE_PRODUCTS",
          payload: id
        });
      }
    })
    .catch(err => console.log("error in delete ",err));
  };
};

export const clearDetail = () => {
  console.log("hitting", "clear detail")
  return dispatch =>{
    dispatch({
      type: "CLEAR_PRODUCT_DETAIL",
      payload: {}
    });
  }
}


export const editProduct = (slug,history) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
    };
    axios
      .get(`${baseURL2}${seller.product}/edit/${slug}`, config)
      .then(res => {
        console.log("edit product",res);
        if (res.data.status === 200) {
          
          localStorage.setItem("editproduct","true")
          dispatch({
            type: "EDIT_PRODUCT",
            payload: res.data.payload
          });
          history.push({pathname:`/seller/dashboard/editProduct/${slug}`})
        } 
      })
      .catch(err => console.log(err));
  };
};

export const updateProduct = (productData,slug,updateStatus) => {
  console.log("action data 1",productData)
  return (dispatch, getState) => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        status:updateStatus
      },
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
        $("#savingProgress").children('span').text(`${percentCompleted}%`)

      }
    };
    console.log("authorization",config.Authorization);
    axios
      .post(`${baseURL2}${seller.product}/${slug}`, productData, config)
      .then(res => {
       // dispatch(deleteProductImage(imagesfordelete))
        console.log("seller product update",res);
        let resmessage={
          res:res.data.message,
          status:res.data.status
        }
        if (res.data.status === 201) {
          dispatch({
            type: "UPDATING_PRODUCT_ERROR",
            payload: resmessage
          });
        }
        if (res.data.status === 400) {
          dispatch({
            type: "UPDATING_PRODUCT_ERROR",
            payload: resmessage
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteProductImage = (id) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
  //  let request = images.map((id) =>axios.delete(`${baseURL2}/seller/products/images/${id}`,config) )
    
   axios.delete(`${baseURL2}${seller.product}/images/${id}`,config)
   .then(res=>{console.log("image delet succesfully")})
   .catch(err => console.log("error in delete ",err))
  // Promise.all(request)
  // .then(res =>{console.log("deleted succesfully")})
  //     .catch(err => console.log("error in delete ",err));
   };
};


export const GetBrandNames =(name,category)=>{
  return dispatch=>{

    let token = localStorage.getItem('token')
    console.log(token)
    axios.get(`${baseURL2}/seller/brands`,{ headers: { "Authorization": `Bearer ${token}` },params:{name,category} })
      .then(res=>{

        console.log("brand searched",res)
        dispatch({
        type: "BrandDetails",
        payload: res.data.data
        });
      }
    )
    .catch(error => {
      console.log(error);
    })
  };
}

export const BrandApproval = (data) =>{
  
  return dispatch=>{
    let token =localStorage.getItem('token')
    console.log("token available",token);
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    
    axios.post(`${baseURL2}${seller.approval}`,data,config)
    .then(res=>{
      //console.clear();
      console.log('Brand Sent For Approval',res.data);
      dispatch({
        type: "Applyforapproval",
        payload: res.data
        });
    })
    .catch(error => {
      console.log(error);
    })
  }
}
export const ApprovedBrands = (category) => {
  return dispatch=>{
    let token =localStorage.getItem('token')
    axios.get(`${baseURL2}${seller.approved}`,{ headers: { "Authorization": `Bearer ${token}` },params:{category:parseInt(category)} })
    .then(res=>{
      console.log('Brands we have',res.data.data)
      dispatch({
        type: "BrandApproved",
        payload: res.data.data
        });
    })
    .catch(error => {
      console.log(error);
    }) 
  }
}

export const getAttribute =(categoryId)=>{
  return dispatch=>{
    let token =localStorage.getItem('token')
    axios.get(`${baseURL2}${seller.categories}/${categoryId}/attributes`,{ headers: { "Authorization": `Bearer ${token}` } })
    .then(res=>{
      console.log("res data for attribute",res);
      dispatch({
        type: "AttributesData",
        payload: res.data.data
        });
    })
    .catch(error => {
      console.log(error);
    }) 
  }
}

export const getBrandLists =()=>{
  return dispatch=>{
    let token =localStorage.getItem('token')
    axios.get(`${baseURL2}${seller.allBrands}`,{ headers: { "Authorization": `Bearer ${token}` } })
    .then(res=>{
      console.log("res data for attribute",res);
      dispatch({
        type: "brandList",
        payload: res.data.payload
        });
    })
    .catch(error => {
      console.log(error);
    }) 
  }
}

export const deleteAttributes = (Attribute) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
   // let request = Attribute.map((id) =>axios.delete(`${baseURL2}/seller/products/attributes/${Attribute}`,config) )
    
   axios.delete(`${baseURL2}${seller.product}/attributes/${Attribute}`,config)
 // Promise.all(request)
  .then(res =>{console.log("deleted succesfully")})
      .catch(err => console.log("error in delete ",err));
  };
};


export const clearError = () => {
  return dispatch =>{
    dispatch({
      type: "ADDING_PRODUCT_ERROR",
      payload: []
    });
  }
}

export const cleaerErrorUdate = () => {
  return dispatch =>{
    dispatch({
      type: "UPDATING_PRODUCT_ERROR",
      payload: []
    });
  }
}

export const FilterBySearch = (currentPage,perPage,query,status) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = { headers: { Authorization: "Bearer " + token},
    params: {
      page: currentPage,
     per_page:perPage,
     query:query,
     status:status
    } };
    axios.get(`${baseURL2}${seller.product}`, config)
    .then(res => {
      console.log("search response   ",res)
      if (res.data.status === 200) {
        dispatch({
          type: "GET_ALL_PRODUCTS",
          payload: res.data.payload,
          payload2:res.data.meta
        });
      }
    })
    .catch(err => console.log(err));
  }
}

export const clearState = (state,type) => {
  return dispatch => {
    dispatch({
      type:"CLEAR_REDUX_STATE",
      payload:{
        state:state,
        load:type
      }
    })
  }
}