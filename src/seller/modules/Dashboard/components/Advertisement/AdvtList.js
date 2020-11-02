import React, { Component,useEffect } from "react";
import { Link } from "react-router-dom";

 const  Advlist = (props) => {
  

  useEffect(()=>{
      props.fetchAdvt()
  },[])

    return (
      <div className="container-fliud" style={{ marginTop: "5%" }}>
        {/* <div className="datepicker row">
          <div className="date-head">
            <p>From:</p>
          </div>
          <div className="date-select">
            <input type="date" id="from" name="from" />
          </div>
          <div className="date-head">
            <p>To:</p>
          </div>
          <div className="date-select">
            <input type="date" id="to" name="to" />
          </div>
          <div className="search-submit">
            <i class="fas fa-search"></i>
          </div>
        </div> */}
        <table className="Paymenttable" style={{width:"50%"}}>
          <thead>
            <tr>
             
              <th>SUBJECTS</th>
              <th>MESSAGE</th>
              <th>BANNER</th>
            </tr>
          </thead>
          <tbody>
            {props.advtlist.length?props.advtlist.map((item,index) =>{
              return (
               <tr key={index}>
              
              <td>{item.subject}</td>
              <td>{item.message}</td>
               <td>
                 <img id="bannerimg" src={item.image?item.image:"/images/altimg.png"} style={{width:'200px',height:'100px',display:"block!important"}} alt="banner" />
               </td>
               
             </tr>
            )}):null}
            
           
           
          </tbody>
        </table>
      </div>
    );
  
}

export default Advlist;
