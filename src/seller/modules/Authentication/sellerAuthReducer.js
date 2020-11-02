const initialState = {
  loginError: null,
  registrationError: null,
  currentUser: {}
};

const sellerAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELLER_TOKEN_INVALID":
      return {
        ...state,
        loginError: "Invalid User"
      };
    case "SELLER_LOGIN_ERROR":
      return {
        ...state,
        loginError:
          action.payload ||
          "There might be some issue with our servers, Please try again later!"
      };
    case "SELLER_LOGIN_SUCCESS":
      return {
        ...state,
        loginError: null,
        currentUser: action.payload
      };
    case "SELLER_LOGOUT_SUCCESS":
      console.log("logout success");
      return {
        ...state,
        currentUser: {},
        loginError: null
      };

    case "SELLER_LOGOUT_FAILED":
      return {
        ...state,
        loginError: "cannot logout now, try again later"
      };

    case "SELLER_ALREADY_REGISTERED":
      return {
        ...state,
        registrationError: "Seller Already Registered, Please Login!"
      };

    case "SELLER_REGISTRATION_ERROR":
      return {
        ...state,
        registrationError:
          action.payload.message ||
          "There might be some issue with our servers, Please try again later!"
      };

    case "SELLER_REGISTRATION_SUCCESS":
      return {
        ...state,
        registrationError: null,
        currentUser: action.payload
      };

    default:
      return state;
  }
};

export default sellerAuthReducer;
