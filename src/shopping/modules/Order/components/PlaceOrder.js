import React, { Component } from 'react'
import Header from '../../../../entertainment/modules/Header';
import Footer from '../../Home/components/FooterWhite';
import {Link} from 'react-router-dom'
import PriceDetail from './PriceDetail'
import AddAddress from './AddAdress'
import EditAddress from './EditAddress';
import $ from 'jquery'

export default class PlaceOrder extends Component {
  constructor(props){
    super(props)
    this.state = {
      editAddress:[],
      isOpen:false,
      selectedAddress:""
    }
  }

  

  componentDidMount() {
    console.log("cart price",this.props.cartprice)
    this.props.addressDetail()
  }

  RemoveHandler = (id) => {
    this.props.deleteAddress(id)
  }

  updateHandler =async (id) => {
    console.log("address id",id);
    let res =await this.props.addressdata.filter((address)=>address.key===id);
     this.setState({editAddress:res,isOpen: !this.state.isOpen})
     $('#myavModal').css("display","block");
//    console.log("edit address data",this.state.editAddress);
    //this.props.updateSavedAddress(id)
  }

  handleModal = () => {
    this.setState({isOpen:!this.state.isOpen})
  }

  onselectAddress = (e) => {
    this.setState({selectedAddress:e.target.value},console.log("value of selected address",typeof(this.state.selectedAddress)))

  }



  render() {
      console.log("address data", this.props.addressdata)
    return (
      <>
        <Header />
        <div className="redsection">
        <div className="container addressbody">
          <h4>Select Delivery Address</h4>
          <div className="addresspart">
            <div className="leftsection">

              <div className="flexsection">
              {this.props.addressdata && this.props.addressdata.length?
                        (
                          this.props.addressdata.map((address,index) => {
                            console.log("address id",address.key)
                        return (
                          <React.Fragment key={address.key}>  
                            <div className="address">
                              <label className="container" key={`radio_${index}`}>
                                <input
                                 type="radio"
                                  checked={parseInt(this.state.selectedAddress)===address.key}
                                   name="radio"
                                   value={address.key}
                                   onChange={this.onselectAddress}
                                />
                                <span className="checkmark"></span>
                              </label>
                              <div className="addressfield">

                                <div className="address-name">{address.name}</div>
                                <div className="address-type"><span>{address.type}</span></div>
                                <div className="address-address">
                                <div className="address-field">{address.address}</div>
                                  <div>{address.locality}</div>
                                  <span>{address.city.name}</span>
                                  <span>{address.pinCode}</span>
                                  <div>{address.state.name}</div>
                                  <div className="address-mobile">
                                    <span>Mobile: </span>
                                    <span>{address.mobile}</span>
                                  </div>
                                </div>

                              </div>

                              <div  className="buttonsection">
                                <button  className="remove" value={address.key} onClick={() => this.RemoveHandler(address.key)}>Remove</button>
                                <button className="edit" onClick={() => this.updateHandler(address.key)}>Edit</button>
                              </div>
                            </div>
                         </React.Fragment>
                    )})
                    )
                    :""}

                    <div className="address new">
                    <button className="newaddress btn-lg" type="button" data-toggle="modal" data-target="#myAddress">
        			  <div> + Add New Address</div>
                    </button>
                    </div>

                </div>

            </div>


            <div className="rightsection">

            {/* <div className="deliverydate">
              <h6>Estimated Delivery Date</h6>

              <div className="product">
                <img src="img/shop1.jpg" />
                <p>12 Jan 2020</p>
              </div>

              <div className="product">
                <img src="img/shop1.jpg" />
                <p>12 Jan 2020</p>
              </div>

              <div className="product">
                <img src="img/shop1.jpg" />
                <p>12 Jan 2020</p>
              </div>
            </div>
            <hr/> */}
         <PriceDetail displayButton={true}/>
            </div>
          </div>
        </div>
       {/* <AddAddress saveAddressDetail={this.props.saveAddressDetail} />  */}
       <AddAddress saveAddressDetail={this.props.saveAddressDetail} editAddress={this.state.editAddress}/>
       {this.state.isOpen?<EditAddress editAddress={this.state.editAddress} updateSavedAddress={this.props.updateSavedAddress} handleModal={this.handleModal}/>:""}
       
              </div>
        <Footer/>
        
      </>
    )
  }
}
