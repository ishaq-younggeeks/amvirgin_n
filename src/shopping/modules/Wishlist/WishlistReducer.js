import { FETCH_WISHLIST, DELETE_WISHLIST,MOVETO_CART } from './WishlistConstant';

const initialState = {
    product:[] ,
}

export default function (state=initialState,action){
    switch (action.type) {
        case FETCH_WISHLIST:
        return{
            ...state,
            product:action.payload
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
