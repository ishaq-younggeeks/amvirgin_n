import { userConstants } from '../constants';

const initialState = {
    loggedIn:false
}

export const authReducer = ( state=initialState, action) => {
    switch(action.type){
        case userConstants.AUTH_USER:
            return {
                ...state,
                loggedIn: true,
                
            }
        case userConstants.RECEIVE_USER_BY_ID:
            return{
                loggedIn: true,
                user: action.user
            }
        case userConstants.UNAUTH_USER:
            return{
                loggedIn: false,
            }
        default:
            return state
    }
}