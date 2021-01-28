import {USERNAME_CHANGE, PASSWORD_CHANGE} from "./ProfileConstant";

const initialState = {
    usernameChange: "",
    passwordChange: ""
}

export default function(state=initialState, action) {
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
        default:
            return state;        
    }
};