import axios from "axios";
import { baseURL } from "../credential.json";


export const getSessionProfile = () => {
  //console.log("hitting session profile")
  return async dispatch => {
    try {
      const session = localStorage.getItem("session");
      let url = `${baseURL}/customer/sessions`
      if(session!=="undefined"){

          let res = await axios.get(`${url}/${session}`)

          if(!res.data.valid){

            let res =   await axios.get(`${url}/start`)
            localStorage.setItem("session",res.data.session)
          }
      }
      else {
        let res =   await axios.get(`${url}/start`)

        localStorage.setItem("session",res.data.session)

      }
      

      }catch (err){
        console.log("session",err);
     } 

  }
}