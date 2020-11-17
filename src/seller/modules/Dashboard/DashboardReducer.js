import { func } from "prop-types";
import {FETCH_DASHBOARD_DETAILS} from "./DashboardConstant";

const initialState = {
    dashboardDetails:{}
};

export default function(state=initialState, action){
    switch(action.type){
        case FETCH_DASHBOARD_DETAILS:
            return{
                ...state,
                dashboardDetails:action.payload
            }
        default:
            return state;    
    }
};