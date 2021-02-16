import {PRIVACY_POLICY, ABOUT_US, TERMS_CONDITION} from "./FooterConstants";

const initialState = {
    privacyPolicy: "",
    aboutUs: "",
    termsCondition: ""
}

export default function (state = initialState, action) {
    switch(action.type){
        case PRIVACY_POLICY:
            return{
                ...state,
                privacyPolicy: action.payload 
            }
        case ABOUT_US:
            return{
                ...state,
                aboutUs: action.payload
        }
        case TERMS_CONDITION:
            return{
                ...state,
                termsCondition: action.payload
            }
        default:
            return state;            
    };
};

