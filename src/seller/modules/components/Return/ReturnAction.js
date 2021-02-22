import {baseURL} from "../../../../credential.json"
import axios from "axios";
import {ALL_RETURN_ORDERS, APPROVE_RETURN, DISAPPROVE_RETURN} from "./ReturnConstant";
import { seller } from "../../../../common/apiConstants";

export const getAllReturnOrders = () => {
    return (dispatch) => {
        let token = localStorage.getItem("token");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        axios
        .get(`${baseURL}${seller.returns}`, config)
        .then(res => {
            console.log("Return Orders :", res);
            if(res.data.status === 200){
                dispatch({
                    type: ALL_RETURN_ORDERS,
                    payload: res.data.payload
                })
            }
        })
        .catch(err => {
            console.log("error", err);
        })
    }
}

export const approveReturn = (key) => {
    return (dispatch) => {
        let token = localStorage.getItem('token');
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        console.log("API", config);
        axios
        .post(`${baseURL}${seller.returns}${key}/approve`, {}, config)
        .then(res => {
            console.log("Return Response", res);
            if(res.data.status === 200){
                dispatch({
                    type: APPROVE_RETURN,
                    payload: key
                })
            console.log("res", res);    
            }
        })
        .catch(err => {
            console.log("Approve ", err);
        })
    }
}

export const disApproveReturn = (key) => {
    return (dispatch) => {
        let token = localStorage.getItem('token');
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        axios
        .post(`${baseURL}${seller.returns}${key}/disapprove`, {}, config)
        .then(res => {
            console.log("Return Response", res);
            if(res.data.status === 200){
                dispatch({
                    type: DISAPPROVE_RETURN,
                    payload: key
                })
            console.log("res", res);    
            }
        })
        .catch(err => {
            console.log("Disapprove ", err);
        })
    }
}