import { computeStyles } from "@popperjs/core";
import axios from "axios";
import {baseURL} from "../.././../credential.json";
import {NEWS_CATEGORY, NEWS_LISTING} from "./NewsConstant";

export const newsCategoryFnc = () => {
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        axios
        .get(`${baseURL}/customer/news/categories`, config)
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                dispatch({
                    type: NEWS_CATEGORY,
                    payload: res.data.payload
                })
            }
        })
        .catch((err) => console.log(err));
    }
}

export const newsListingFnc = (category, page) => {
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        axios
        .get(`${baseURL}/customer/news/categories/${category}?page=${page}`, config)
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                dispatch({
                    type: NEWS_LISTING,
                    payload: res.data.payload
                })
            }
        })
        .catch((err) => console.log(err));
    }
}
