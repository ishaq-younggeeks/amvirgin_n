// import {myData,fetchingData,product,release} from './ProductDetailAction';
import { DASHBOARD_DATA } from "./HomeConstant";

const ACTION_HANDLERS = {
  [DASHBOARD_DATA]: (state, action) => {
    return {
      ...state,
      dashboardData: action.data,
    };
  },
};

const initialState = {
  data: {},
};

export default function EntertainmentDashboard(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
