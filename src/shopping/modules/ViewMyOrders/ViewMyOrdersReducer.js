import {GET_ALL_MY_ORDERS, ORDER_DETAILS} from "./ViewMyOrdersConstants";

const initialState = {
    myOrders : [],
    myOrderDetails: [],
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_ALL_MY_ORDERS:
            return{
                ...state,
                myOrders : action.payload
            }
        case ORDER_DETAILS:
            return{
                ...state,
                myOrderDetails: action.payload
            }   
        default:
            return state    
    }
}