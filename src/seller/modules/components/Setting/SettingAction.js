import axios from 'axios';
import { baseURL } from "../../../../credential.json";
import { FETCH_BUISNESSDETAILS,SAVE_BUISNESSDETAILS,FETCH_BANKDETAILS,BUISNESS_STATUS,FETCH_AGREEMENT,FETCH_AGREEMENTSTATUS} from './SettingConstant'
import React from 'react';
import $ from 'jquery'
import { seller } from '../../../../common/apiConstants';


export const getBuisnessDetails = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .get(`${baseURL}${seller.business}`, config)
      .then(res => {
		   console.log("getting buisness details",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_BUISNESSDETAILS,
            payload: res.data.payload
          });
        }
      })
      .catch(err => console.log(err));
  };
};


export const saveBusinessDetails = (data) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    let params = {
      action:"read"
    }
    axios.post(`${baseURL}${seller.business}`,data,config)
    .then(res =>{
        dispatch({
          type: FETCH_BUISNESSDETAILS,
          payload: res.data.payload
        })
        dispatch({
          type: BUISNESS_STATUS,
          payload: res.data
        });
      console.log("save buisness details",res)
    })
    .catch(err => console.log(err))
  }
}


export const getBankDetails = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .get(`${baseURL}${seller.bank}`, config)
      .then(res => {
		   console.log("getting bank details",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_BANKDETAILS,
            payload: res.data.payload
          });
        }
      })
      .catch(err => console.log(err));
  };
};


export const saveBankDetails = (data) => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    let params = {
      action:"read"
    }
    axios.post(`${baseURL}${seller.bank}`,data,config)
    .then(res =>{
      dispatch({
        type: FETCH_BANKDETAILS,
        payload: res.data.payload
      })
      dispatch({
        type: BUISNESS_STATUS,
        payload: res.data
      });
      console.log("save banks details",res)
    })
    .catch(err => console.log(err))
  }
}

export const getMouAgreement = () => {
  return dispatch => {  
    axios
      .get(`${baseURL}${seller.mou}`)
      .then(res => {
		   console.log("getting mou agreement",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_AGREEMENT,
            payload: res.data.payload
          });
        }
      })
      .catch(err => console.log(err));
  };
};


export const getMouAgreementSatus = () => {
  return dispatch => { 
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .get(`${baseURL}${seller.mou}status`,config)
      .then(res => {
		   console.log("get agreement status",res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_AGREEMENTSTATUS,
            payload: res.data.agreed
          });
        }
      })
      .catch(err => console.log(err));
  };
}

export const updateMouAgreementStatus = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };

    let data = {
      agreed:true
    }
    axios.put(`${baseURL}${seller.mou}`,data,config)
    .then(res =>{
      dispatch({
        type: FETCH_BANKDETAILS,
        payload: res.data.payload
      })
      dispatch({
        type: BUISNESS_STATUS,
        payload: res.data
      });
      console.log("update agreement status",res)
    })
    .catch(err => console.log(err))
  }
}

export const clearSavedStatus = () => {
  console.log("working clear state")
  return dispatch => {
    dispatch({
      type: BUISNESS_STATUS,
      payload: {}
    });
  }
}
