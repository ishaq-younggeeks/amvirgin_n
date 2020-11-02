import { FETCH_CART, ADDTO_CART, DELETE_FROM_CART, UPDATE_ITEM,AFTER_MOVETOWISHLIST_FETCH} from './shoppingCartConstant'


const initialState = {
  carts: [],
  cartprice: ''
};

export default function (state = initialState, action) {
  //console.log('action.type', action.type)
  //console.log('action payload-------------', action.payload)
  switch (action.type) {
    case FETCH_CART:
      return {
        ...state,
        carts: action.payload,
        cartprice: action.payload2
      };
    case ADDTO_CART:
      return {
        ...state,
        carts: action.payload
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        carts: action.payload
      };
    case UPDATE_ITEM:
      return {
        ...state,
        carts: action.payload
      };
    case AFTER_MOVETOWISHLIST_FETCH:
      return {
        ...state,
        carts:state.carts.filter(item => item.key)
      }
    default:
      return state;
  }
}

