import axios from "axios";
import { footer } from "../../common/apiConstants";
import {baseURL3} from "../../credential.json";
import {PRIVACY_POLICY, ABOUT_US, TERMS_CONDITION} from "./FooterConstants";

export const privacyPolicy = () => {
    return (dispatch) => {
      
        axios
        .get(`${baseURL3}${footer.privacyPolicy}`)
        .then((res) => {
            console.log(res);
            if(res.status === 200){
                dispatch({
                    type: PRIVACY_POLICY,
                    payload: res.data    
                })
            }
        })
        .catch((err) => console.log(err));
    }
}

export const aboutUs = () => {
    return (dispatch) => {
      
        axios
        .get(`${baseURL3}${footer.aboutUs}`)
        .then((res) => {
            console.log(res);
            if(res.status === 200){
                dispatch({
                    type: ABOUT_US,
                    payload: res.data    
                })
            }
        })
        .catch((err) => console.log(err));
    }
}

export const termsCondition = () => {
    return (dispatch) => {
      
        axios
        .get(`${baseURL3}${footer.termsCondition}`)
        .then((res) => {
            console.log(res);
            if(res.status === 200){
                dispatch({
                    type: TERMS_CONDITION,
                    payload: res.data    
                })
            }
        })
        .catch((err) => console.log(err));
    }
}