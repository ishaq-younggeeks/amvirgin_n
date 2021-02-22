import {GET_ALL_MY_ORDERS, ORDER_DETAILS, TRACK_ORDER_STATUS, ORDER_CANCELLATION, GIVE_REVIEW} from "./ViewMyOrdersConstants";

const initialState = {
    myOrders : [],
    myOrderDetails: [],
    orderTracking: [],
    cancelReason: "",
    giveReview: ""
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
        case TRACK_ORDER_STATUS:
            return{
                ...state,
                orderTracking: action.payload
            }
        case ORDER_CANCELLATION:
            return{
                ...state,
                cancelReason: action.payload
            }  
        case GIVE_REVIEW:
            return{
                ...state,
                giveReview: action.payload
            }               
        default:
            return state    
    }
}