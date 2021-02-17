import { API_CALLING,FETCH_CART, ADDTO_CART, DELETE_FROM_CART, UPDATE_ITEM,AFTER_MOVETOWISHLIST_FETCH} from './shoppingCartConstant'


const initialState = {
  isLoading:false,
  carts: [],
  cartprice: ''
};

export default function (state = initialState, action) {
  console.log('action.type', action.type,action.payload)
  //console.log('action payload-------------', action.payload)
  switch (action.type) {
    case API_CALLING:
      return {
        ...state,
        isLoading:true
      }
    case FETCH_CART:
      return {
        ...state,
        carts: action.payload,
        cartprice: action.payload2,
        isLoading:false
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
        carts:state.carts.items.filter(item => item.key!==action.payload)
      }
    default:
      return state;
  }
}

