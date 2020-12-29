import { func } from "prop-types";
import {FETCH_DASHBOARD_DETAILS, FETCH_DASHBOARD_RANGE} from "./DashboardConstant";

const initialState = {
    dashboardDetails:{},
    dashboardRange:{}
};

export default function(state=initialState, action){
    switch(action.type){
        case FETCH_DASHBOARD_DETAILS:
            return{
                ...state,
                dashboardDetails:action.payload
            }
        case FETCH_DASHBOARD_RANGE:
            return{
                ...state,
                dashboardRange:action.payload
            }    
        default:
            return state;    
    }
};