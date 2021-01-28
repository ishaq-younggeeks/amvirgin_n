import axios from "axios";
import {baseURL} from "../../.././credential.json"; 
import {GET_ALL_MY_ORDERS} from "./ViewMyOrdersConstants";

export const getAllMyOrders = (page) => {
    return(dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        };

        axios
        .get(`${baseURL}/customer/orders?page=${page}`, config)
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