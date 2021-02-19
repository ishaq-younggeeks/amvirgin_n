import {PRIVACY_POLICY, ABOUT_US, TERMS_CONDITION, FAQ, CANCELLATION_POLICY, RETURN_POLICY, SHIPPING_POLICY, CONTACT_US} from "./FooterConstants";

const initialState = {
    privacyPolicy: "",
    aboutUs: "",
    termsCondition: "",
    returnPolicy: "",
    cancelPolicy: "",
    faq: "",
    shippingPolicy: "",
    contact: ""
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
        case RETURN_POLICY:
            return{
                ...state,
                returnPolicy: action.payload
            }
        case FAQ:
            return{
                ...state,
                faq: action.payload
            } 
        case CANCELLATION_POLICY:
            return{
                ...state,
                cancelPolicy: action.payload
            }          
        case SHIPPING_POLICY:
            return{
                ...state,
                shippingPolicy: action.payload
            }                           
        case CONTACT_US:
        return{
            ...state,
            contact: action.payload
        }    
        default:
            return state;            
    };
};

