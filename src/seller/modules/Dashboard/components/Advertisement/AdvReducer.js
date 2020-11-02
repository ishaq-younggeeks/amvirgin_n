import {FETCH_CREATEADVT,CREATEADVT,FETCH_ADVT,CREATEADVT_STATUS} from './AdvConstant';

const initialState = {
  advtlist:{},
  savedStatus:{},
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
        case "CLEAR_REDUX_STATE":
          return {
            ...state,
            [action.payload.state]: action.payload.load
        };        
      default:
        return state;
    }
    
  }