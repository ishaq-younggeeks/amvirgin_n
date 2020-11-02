import { baseURL } from "./credential.json";
import axios from "axios";
export const GetData = type => {
  return new Promise(function(resolve, reject) {
    axios
      .get(baseURL + "/" + type)
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        reject(err);
        //console.log(err);
      });
  });
};
