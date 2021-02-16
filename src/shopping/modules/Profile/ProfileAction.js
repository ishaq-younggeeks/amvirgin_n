import axios from "axios";
import {baseURL} from "../../../././credential.json";
import { shop } from "../../../common/apiConstants";
import {USERNAME_CHANGE, PASSWORD_CHANGE} from "./ProfileConstant";

export const editUsername = (name) => {
    console.log("Edit Username Calling ", name);
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {name : name}
        };
        axios
        .put(`${baseURL}${shop.profile}`, {name}, config)
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                localStorage.setItem("name", res.data.payload.name);
                dispatch({
                    type: USERNAME_CHANGE,
                    payload: res.data.message
                })
            }
        })
        .catch((err) => console.log(err))
    }
} 

export const editPassword = (currentpwd, newpwd, confirmpwd) => {
    console.log("Edit Password Calling ", currentpwd, newpwd, confirmpwd);
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        console.log("Token :", token);
        let config = {
            headers: {
                Authorization: "Bearer " + token
            },
            params: {
                current: currentpwd,
                new : newpwd,
                confirm: confirmpwd 
            }
        }
        axios
        .put(`${baseURL}${shop.profile}password`, {}, config)
        .then((res) => {
            console.log(res);
            if(res.data.status === 200 || 401){
                dispatch({
                    type: PASSWORD_CHANGE,
                    payload: res.data.message
                })
            }
        })
        .catch((err) => console.log(err))
    }
}