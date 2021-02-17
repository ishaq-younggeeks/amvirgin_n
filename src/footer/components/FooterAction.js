import axios from "axios";
import { footer } from "../../common/apiConstants";
import {baseURL2, baseURL3} from "../../credential.json";
import {PRIVACY_POLICY, ABOUT_US, TERMS_CONDITION, CONTACT_US} from "./FooterConstants";

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

export const contactUs = (name, email, mobile, query) => {
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        let params = {
            name,
            email, 
            mobile,
            query
        }
        
        console.log("Params :", params);
        axios.post(`${baseURL2}${footer.contact}`, params, config)
        .then((res) => {
            console.log(res);
            if(res.data.status === 200 || 201){
                dispatch({
                    type: CONTACT_US,
                    payload: res.data.message
                });
            }
        })
        .catch((err) => console.log(err));
    }
}