import axios from "axios";
import {baseURL, baseURL2} from "../../.././credential.json"; 
import { shop } from "../../../common/apiConstants";
import {GET_ALL_MY_ORDERS, ORDER_DETAILS, TRACK_ORDER_STATUS, ORDER_CANCELLATION, GIVE_REVIEW} from "./ViewMyOrdersConstants";

export const getAllMyOrders = (page) => {
    return(dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        };

        axios
        .get(`${baseURL2}${shop.myOrders}?page=${page}`, config)
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                dispatch({
                    type: GET_ALL_MY_ORDERS,
                    payload: res.data.payload.data
                })
            }
        })
        .catch((err) => console.log(err));
    }
}

export const viewMyOrderDetails = (orderNumber) => {
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        };

        axios
        .get(`${baseURL2}${shop.myOrders}/${orderNumber}`, config)
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                dispatch({
                    type: ORDER_DETAILS,
                    payload: res.data.payload
                })
            }
        })
        .catch((err) => console.log(err));
    }
}

export const orderCancellation = (orderId, reason) => {
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        };
        
        axios
        .put(`${baseURL2}${shop.myOrders}/${orderId}/cancel?reason=${reason}`, {}, config)
        .then((res) => {
            console.log(res);
            if(res.data.status === 200 || 304){
                dispatch({
                    type: ORDER_CANCELLATION,
                    payload: res.data.messsage
                })
            }
        })
        .catch((err) => console.log(err));
    }
}

export const trackOrderStatus = (orderId) => {
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        };

        axios
        .get(`${baseURL2}${shop.myOrders}/${orderId}/track`, config)
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                dispatch({
                    type: TRACK_ORDER_STATUS,
                    payload: res.data.payload
                })
            }
        })
        .catch((err) => console.log(err));
    }
}

export const giveReviewFnc = (key, orderKey) => {
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        axios
        .post(`${baseURL2}customer/products/${key}/reviews/${orderKey}`, config)
        .then((res) => {
            console.log(res);
            if(res.data.status === 200 || 201){
                dispatch({
                    type: GIVE_REVIEW,
                    payload: res.data.message
                })
            }
        })
        .catch((err) => console.log(err));
    }
}