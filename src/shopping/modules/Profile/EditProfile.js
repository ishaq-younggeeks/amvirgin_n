import React, { Component } from 'react'
import Header from '../../../entertainment/modules/Header';
import SubMenu from '../Home/components/SubMenu'
import Footer from '../Home/components/FooterWhite';
import "./Profile.css"

export default class EditProfile extends Component {
  render() {
    return (
      <div className="shopMain">
       <Header />
       <SubMenu {...this.props}/>
       <div>
         <div>
           <h4>Account</h4>
           <p>Ishaq Hashmi</p>
         </div> 
         <hr/>
         <div className="editcontainer">
           <div className="editbox">
           <div>
             <h4>Edit Profile</h4>
           </div>
           <hr/>
          </div> 

         </div>  

       </div>  
       <Footer/>
      </div>
    )
  }
}
