import axios from "axios";
import { baseURL2 } from "../../../credential.json";
import {seller} from ".././../../common/apiConstants";

export const login = credentials => {
  return async dispatch => {
    //make async calls here
    try {
      const res = await axios
        .post(`${baseURL2}${seller.login}`, credentials)
        .then(res => {
          if (
            res.data.status === 404 ||
            res.data.status === 400 ||
            res.data.status === 401
          ) {
            dispatch({
              type: "SELLER_LOGIN_ERROR",
              payload: res.data.message
            });
          } else if (res.data.status === 200) {
            localStorage.setItem("token", res.data.data.token);
            dispatch({
              type: "SELLER_LOGIN_SUCCESS",
              payload: res.data.data
            });
          }
        });
    } catch (err) {
      dispatch({
        type: "SELLER_LOGIN_ERROR",
        err
      });
    }
  };
};

export const getSellerProfile = () => {
  return async dispatch => {
    const token = localStorage.getItem("token");
    if (token) {
      let config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      try {
        const res = await axios.get(`${baseURL2}${seller.profile}`, config);
        if (res.status === 401) {
          localStorage.removeItem("token");
          dispatch({
            type: "SELLER_TOKEN_INVALID"
          });
        } else {
          dispatch({
            type: "SELLER_LOGIN_SUCCESS",
            payload: res.data.data
          });
        }
      } catch (err) {
        localStorage.removeItem("token");
        dispatch({
          type: "SELLER_LOGIN_ERROR"
        });
        return console.log(err);
      }
    }
  };
};


export const sendSellerOtp = (num) => {
  var headers = {
    "Content-Type": "application/json"
  };
  return (dispatch, getState) => {
    axios
      .get(`${baseURL2}${seller.otp}${num}&type=3`, headers)
      .then((response) => {
        console.log("submission mobile",response);
        if (response.status === 200) {
          dispatch({ 
          type: "OTP_MODEL_SHOW",
          payload: true 
        });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}

export const logout = token => {
  return (dispatch, getState) => {
    if (token) {
      let config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      axios
        .post(`${baseURL2}${seller.logout}`, {}, config)
        .then(() => {
          localStorage.removeItem('token');
          dispatch({
            type: "SELLER_LOGOUT_SUCCESS"
          });
        })
        .catch(err => {
          dispatch({
            type: "SELLER_LOGOUT_FAILED",
            payload: err
          });
        });
    } else {
      dispatch({
        type: "SELLER_LOGOUT_FAILED"
      });
    }
  };
};

export const registration = credentials => {
  return dispatch => {
    //male async calls
    let sellerCredentials = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      mobile: credentials.phoneNumber,
      otp: credentials.otp
    };
    return axios
      .post(`${baseURL2}${seller.registration}`, sellerCredentials)
      .then((res) => {
        console.log(res);
        if (res.data.status === 201) {
                  localStorage.setItem("token", res.data.data.token);
                  dispatch({
                    type: "SELLER_REGISTRATION_SUCCESS",
                    payload: res.data.data
                  })
                }
                if (res.data.status === 401 || 400) {
                  dispatch({ 
                  type: "OTP_ERROR",
                  payload: res.data.message 
                });
                }        
      })
      // .then(res => {
      //   if (res.data.status === 409) {
      //     console.log(res.data);
      //     dispatch({
      //       type: "SELLER_ALREADY_REGISTERED",
      //       payload: res.data
      //     });
      //   } else if (res.data.status === 404) {
      //     axios({
      //       method: "post",
      //       url: `${baseURL2}/seller/register`,
      //       data: sellerCredentials
      //     }).then(res => {
      //       if (res.data.status === 201) {
      //         localStorage.setItem("token", res.data.data.token);
      //         dispatch({
      //           type: "SELLER_REGISTRATION_SUCCESS",
      //           payload: res.data.data
      //         });
      //       } else {
      //         dispatch({
      //           type: "SELLER_REGISTRATION_ERROR",
      //           payload: res.data
      //         });
      //       }
      //     });
      //   }
      // })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "SELLER_REGISTRATION_ERROR"
        });
      });
  };
};
