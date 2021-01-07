import { GET_ALL_ORDERS, VIEW_ORDER,AFTER_STATUS_CHANGE} from './sellerOrderConstant';

const intialState = {
  orders: [],
  viewOrder: [],
  viewAllOrder: [],
  metaData:{}
};

const sellerOrderReducer = (state = intialState, action) => {
  console.log("calling action",action)
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
        orders:state.orders.filter(item => item.key!==action.payload[0])
      }
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
