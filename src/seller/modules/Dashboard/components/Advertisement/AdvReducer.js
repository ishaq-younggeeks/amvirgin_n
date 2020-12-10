import {FETCH_CREATEADVT,CREATEADVT,FETCH_ADVT,CREATEADVT_STATUS, EDIT_ADVT, DELETE_ADVT} from './AdvConstant';

const initialState = {
  advtlist:{},
  savedStatus:{},
  editStatus:{},
  deleteStatus:{}
};

export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_ADVT:
        return {
          ...state,
          advtlist: action.payload,

        };
      case CREATEADVT_STATUS:
        return {
          ...state,
          savedStatus:action.payload                 
        }
      case EDIT_ADVT:
        return {
          ...state,

        }        
      case DELETE_ADVT:
        return {
          ...state,
          deleteStatus:action.payload
        }    
      case "CLEAR_REDUX_STATE":
        return {
          ...state,
          [action.payload.state]: action.payload.load
        };    
      default:
        return state;
    }
    
  }