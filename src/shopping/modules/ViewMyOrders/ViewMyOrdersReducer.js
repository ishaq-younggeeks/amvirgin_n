import {GET_ALL_MY_ORDERS} from "./ViewMyOrdersConstants";

const initialState = {
    myOrders : []
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_ALL_MY_ORDERS:
            return{
                ...state,
                myOrders : action.payload
            }
        default:
            return state    
    }
}