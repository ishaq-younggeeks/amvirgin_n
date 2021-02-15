import axios from "axios";
import { baseURL } from "../../../credential.json";
import {seller} from ".././../../common/apiConstants";

export const login = credentials => {
  return async dispatch => {
    //make async calls here
    try {
      const res = await axios
        .post(`${baseURL}${seller.login}`, credentials)
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
        const res = await axios.get(`${baseURL}${seller.profile}`, config);
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

export const logout = token => {
  return (dispatch, getState) => {
    if (token) {
      let config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      axios
        .post(`${baseURL}${seller.logout}`, {}, config)
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
      .get(`${baseURL}${seller.registration}=${sellerCredentials.email}&type=1`)
      .then(res => {
        if (res.data.status === 409) {
          console.log(res.data);
          dispatch({
            type: "SELLER_ALREADY_REGISTERED",
            payload: res.data
          });
        } else if (res.data.status === 404) {
          axios({
            method: "post",
            url: `${baseURL}/seller/register`,
            data: sellerCredentials
          }).then(res => {
            if (res.data.status === 201) {
              localStorage.setItem("token", res.data.data.token);
              dispatch({
                type: "SELLER_REGISTRATION_SUCCESS",
                payload: res.data.data
              });
            } else {
              dispatch({
                type: "SELLER_REGISTRATION_ERROR",
                payload: res.data
              });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "SELLER_REGISTRATION_ERROR"
        });
      });
  };
};
