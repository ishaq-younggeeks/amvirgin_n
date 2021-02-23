import { userConstants } from "../constants";
import { baseURL } from "../../credential.json";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { createBrowserHistory as createHistory } from 'history';
import {getSessionProfile} from '../../globalComponents/sessionprofileAction'
import { entertainment } from "../../common/apiConstants";

const history = createHistory()


export const userActions = {
  login,
  Register,
  sendOtp,
  otphide,
  OtpVerify,
  getuserbyid,
  Recieveuserbyid,
  signoutUser,
  forgotPwd
};

//Consumer Login function
function login(body) {
  return (dispatch, getState) => {
    dispatch({ type: userConstants.LOGIN_REQUEST });
    axios
      .post(`${baseURL}${entertainment.login}`, body)
      .then(function(response) {
        if (response.data.status === 200) {
          dispatch({ type: userConstants.LOGIN_SUCCESS });
          localStorage.setItem('UserToken',response.data.data.token)
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("mobile", response.data.data.mobile);
          cookie.save("token", response.data.data.token, {
            path: "/",
            maxAge: 60 * 60 * 24,
            expire: 60 * 60 * 24
          });
          dispatch(Recieveuserbyid(response.data));
          dispatch({ type: userConstants.AUTH_USER });
          history.goBack()
        } else if (response.data.status === 404) {
          dispatch({ type: userConstants.NOT_REGISTERED });
        } else if (response.data.status === 401 || 400 ) {
          dispatch({ type: userConstants.WRONG_OTP});
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}

//Consumer Register function
function Register(body) {
  var headers = {
    "Content-Type": "application/json"
  };
  return (dispatch, getState) => {
    axios
      .post(`${baseURL}${entertainment.register}`, body, headers)
      .then(function(response) {
        console.log("response from registring",response);
        if (response.data.status === 201) {
          let token = response.data.data.token;
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("mobile", response.data.data.mobile);
          cookie.save("token", token, {
            path: "/",
            maxAge: 60 * 60 * 24,
            expire: 60 * 60 * 24
          });
          dispatch({ type: userConstants.REGISTER_SUCCESS });
        } else {
          dispatch({
            type: userConstants.REGISTER_FAILURE,
            failure: response.data.message
          });
        }
        //console.log(response)
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}

//send otp function
function sendOtp(num) {
  var headers = {
    "Content-Type": "application/json"
  };
  return (dispatch, getState) => {
    axios
      .get(`${baseURL}${entertainment.otp}${num}&type=3`, headers)
      .then((response) => {
        console.log("submission mobile",response);
        if (response.data.status === 404) {
          dispatch({ type: userConstants.OTP_MODEL_SHOW });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}

// Forgot Password
function forgotPwd(type, value) {
  console.log("calling forgot pwd :", type, value);
  var headers = {
    "Content-Type": "application/json"
  };
  return (dispatch, getState) => {
    axios
      .get(`${baseURL}${entertainment.resetPwd}${type}=${value}&type=${type}`, headers)
      .then((response) => {
        console.log("submission mobile",response);
        if (response.data.status === 200) {
          dispatch({ type: userConstants.FORGOT_PASSWORD, });
        }
      })
      .catch(function(err) {
        console.log(err);
        dispatch({ type: userConstants.NOT_REGISTERED })
      });
  };
}

//Remove Otp
function otphide() {
  return dispatch => {
    dispatch({ type: userConstants.OTP_MODEL_HIDE });
  };
}

//Otp verify
function OtpVerify(otp) {
  return otphide();
}

//////////////////////get user detail by token/////////////////////
function getuserbyid(token=localStorage.getItem('UserToken')) {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      axios
        .get(`${baseURL}${entertainment.profile}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(function(response) {
          if (response.status === 200) {
            //console.log(response.data.data);
            dispatch(Recieveuserbyid(response.data));
            dispatch({ type: userConstants.AUTH_USER });
          }
          resolve(response.data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  };
}

/////////////////recieve user by token////////////////////////////
function Recieveuserbyid(user) {
  return (dispatch, getState) => {
    dispatch({ type: userConstants.RECEIVE_USER_BY_ID, user });
  };
}

//////////////Logout///////////////////////
function signoutUser(token) {
  console.log(token);
  return (dispatch, getState) => {
    axios
      .post(
        `${baseURL}${entertainment.logout}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(function(response) {
        if (response.status === 200) {
          localStorage.removeItem('UserToken');
          localStorage.removeItem('session');
          localStorage.removeItem('total_item');
          dispatch(getSessionProfile())
          dispatch(Recieveuserbyid(response.data));
          dispatch({ type: userConstants.UNAUTH_USER });

        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}
