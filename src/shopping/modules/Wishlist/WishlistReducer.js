import { API_CALL,FETCH_WISHLIST, DELETE_WISHLIST,MOVETO_CART } from './WishlistConstant';

const initialState = {
    isLoading:false,
    product:[] ,
}

export default function (state=initialState,action){
    switch (action.type) {
        case API_CALL:
            return{
                ...state,
                isLoading:true
            }
        case FETCH_WISHLIST:
        return{
            ...state,
            product:action.payload,
            isLoading:false
        };
        case MOVETO_CART:
            return {
                ...state,
                product:[...state.product.filter(item=>item.key!==action.payload)]
            }
        default:
        return state;
    }
}
