import { userConstants } from '../constants';

const initialState = {
  success:null,
  registering:false,
  failure:'',
  otpmodel: false,
  submittingOtp: false,
}
export function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        ...state, 
        registering: true
       };
    case userConstants.OTP_SUBMIT:
      return {
        ...state,
        submittingOtp: true
      }   
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        success:"Registration Successful. Please Login."
      };
    case userConstants.OTP_MODEL_SHOW:
      return {
        ...state,
        otpmodel: true
      }
    case userConstants.OTP_MODEL_HIDE:
      return {
        ...state,
        otpmodel: false
      }
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        failure:action.failure
      };
    default:
      return state
  }
}