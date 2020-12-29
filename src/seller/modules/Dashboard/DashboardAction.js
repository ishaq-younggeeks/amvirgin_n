import axios from "axios";
import { FETCH_DASHBOARD_DETAILS, FETCH_DASHBOARD_RANGE } from "./DashboardConstant";
import { baseURL } from "../../../credential.json";

export const getDashboardDetails = () => {
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(`${baseURL}/seller/dashboard`, config)
      .then((res) => {
        console.log("Seller Dashboard API data", res);
        if (res.data.status === 200) {
          dispatch({
            type: FETCH_DASHBOARD_DETAILS,
            payload: res.data.payload,
          });
          dispatch({
            type: FETCH_DASHBOARD_RANGE,
            payload: res.data.payload.range,
          });
        }
      })
      .catch(err => console.log("Error in Seller Dashboard API", err));
  };
};
