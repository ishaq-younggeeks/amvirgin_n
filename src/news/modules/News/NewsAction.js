import axios from "axios";
import {baseURL} from "../.././../credential.json";
import {NEWS_CATEGORY, NEWS_LISTING, ARTICLE_DETAILS} from "./NewsConstant";
import {news} from '../../../common/apiConstants';

export const newsCategoryFnc = () => {
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        axios
        .get(`${baseURL}${news.categories}`, config)
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
        .get(`${baseURL}${news.categories}${category}?page=${page}`, config)
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

export const articleDetailsFnc = (newsId) => {
    return (dispatch) => {
        let token = localStorage.getItem("UserToken");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        };

        axios
        .get(`${baseURL}${news.articles}${newsId}`, config)
        .then((res) => {
            console.log(res);
            if(res.status === 200){
                dispatch({
                    type: ARTICLE_DETAILS,
                    payload: res.data
                })
            }
        })
        .catch((err) => console.log(err));
    }
}
