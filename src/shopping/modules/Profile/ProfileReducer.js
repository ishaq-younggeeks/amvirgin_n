import {USERNAME_CHANGE, PASSWORD_CHANGE, PASSWORD_CHANGE_ERROR} from "./ProfileConstant";

const initialState = {
    usernameChange: "",
    passwordChange: "",
    passwordChangeError: ""
}

export default function(state=initialState, action) {
    console.log("Action :", action);
    switch(action.type){
        case USERNAME_CHANGE:
            return{
                ...state,
                usernameChange: action.payload
            }
        case PASSWORD_CHANGE:
            return{
                ...state,
                passwordChange: action.payload
            }
        case PASSWORD_CHANGE_ERROR:
            return{
                ...state,
                passwordChangeError: action.payload
            }        
        case "CLEAR_REDUX_STATE_PROFILE":
            return {
                ...state,
                ...action.payload
            }    
        default:
            return state;        
    }
};