import { userConstants } from '../constants';
//let user = JSON.parse(localStorage.getItem('user'));
//const initialState = user ? { loggedIn: true, user } : {};
const initialState = {
  notRegister: null,
  loggedIn: false,
  loggingIn: false,
  wrongOTP: null,
  forgotPwdRes: null
}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
          return {
            loggingIn: true,
            user: action.user
          };
        case userConstants.LOGIN_SUCCESS:
          return {
            loggedIn: true,
            user: action.user
          };
        case userConstants.NOT_REGISTERED:
          return {
            ...state,
            notRegister: "You are not Registered. Please Register."
          };
        case userConstants.WRONG_OTP:
          return {
            ...state,
            wrongOTP: "Invalid OTP."
          };  
        case userConstants.FORGOT_PASSWORD:
          return {
            ...state,
            forgotPwdRes: "Please check your email/mobile to reset password."
          };    
        case userConstants.LOGIN_FAILURE:
          return {};
        case userConstants.LOGOUT:
          return {};
        default:
          return state
      }
};
  