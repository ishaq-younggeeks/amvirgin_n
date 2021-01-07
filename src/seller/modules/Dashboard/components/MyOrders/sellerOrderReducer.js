import { GET_ALL_ORDERS, VIEW_ORDER,AFTER_STATUS_CHANGE, STATUS_CHANGE_ALERT} from './sellerOrderConstant';

const intialState = {
  orders: [],
  viewOrder: [],
  viewAllOrder: [],
  metaData:{},
  message:false
};

const sellerOrderReducer = (state = intialState, action) => {
  
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload,
        metaData:action.payload2,

      };

    case VIEW_ORDER:
      return {
        ...state,
        viewOrder:action.payload,
       }
    case AFTER_STATUS_CHANGE:
      return {
        ...state,
        orders:state.orders.filter(item => action.payload.indexOf(item.orderId)===-1)
      }
    case STATUS_CHANGE_ALERT:
      return {
        ...state,
        message:action.payload
      };
      case "CLEAR_REDUX_STATE":
        return {
          ...state,
          [action.payload.state]: action.payload.load
      };       

    default:
      return state;
  }
};

export default sellerOrderReducer;
