import React, { Component } from 'react';
import axios from 'axios'
import { baseURL } from "../../../../credential.json";
import $ from 'jquery'

class AddAdress extends Component {
  constructor(props){
    super(props);
    this.state = {
        name:this.props.editAddress.length?this.props.editAddress[0].name:"",
        mobile: "",
        alternateMobile: "",
        pinCode: "",
        countryId:101,
        stateList:[],
        state: "",
        city: "",
        address: "",
        locality: "",
        saturdayWorking: false,
        sundayWorking: false,
        addressType: "",
        citylist:{
          load:false,
          city:[]
        }
    }
  }

  async componentDidMount(){
    console.log("component did mount called");
    let res =await axios.get(`${baseURL}/seller/countries/${this.state.countryId}/states`)
    this.setState({stateList:res.data.data})
    console.log("state list are",this.props.editAddress)
   // this.props.stateList(this.state.countryId);
  }

  componentDidUpdate(prevprops){
    if(prevprops!==this.props)
    {
    }
  }

  onChangeNumberHandler = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
    console.log("state update",this.state)
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("state update",this.state)
  };

  onChangeList = async  e => {
    this.setState({
      [e.target.name]: e.target.value
    });
      let stateId = parseInt(e.target.value)
      let res = await  axios.get(`${baseURL}/seller/countries/states/${stateId}/cities`)
      this.setState({citylist: {load: true,city:res.data.data}})
  }

  onSubmitHandler = e => {
    e.preventDefault();
    let data = {
        name: this.state.name,
        mobile: this.state.mobile,
        alternateMobile: this.state.alternateMobile,
        pinCode: this.state.pinCode,
        stateId: this.state.state,
        cityId: this.state.city,
        address: this.state.address,
        locality: this.state.locality,
        saturdayWorking: JSON.parse(this.state.saturdayWorking),
        sundayWorking: JSON.parse(this.state.sundayWorking),
        type: this.state.addressType
    }
    this.props.saveAddressDetail(data);
    console.log("working",data)
    
  }

  render() {
    return (
      <>
        <div className="modal fade modaladdress" id="myAddress" role="dialog">
          <div className="modal-dialog">

        	  {/* <!-- Modal content--> */}
        	  <div className="modal-content">
        	    <div className="modal-header">
                <h4 className="modal-title">Add New Address</h4>
        	  	  <button type="button" className="close" data-dismiss="modal">&times;</button>
        	    </div>
            <div className="modal-body">

            <form className="addressform"  onSubmit={() =>this.onSubmitHandler()}>

             <div className="input-field">
             <input
               type="text"
               id="name"
               name="name"
               value={this.state.name}
               onChange={this.onChangeHandler}
               required />
              <label for="name">Name *</label>
              </div>

              <div className="input-field">
               <input
                type="tel"
                id="mobile"
                name="mobile"
                value={this.state.mobile}
                maxLength="10"
                onChange={this.onChangeNumberHandler}
                required />
               <label for="mobile">Mobile No.*</label>
              </div>

              <div className="input-field">
                <input
                 type="tel"
                 id="mobile2"
                 name="alternateMobile"
                 maxLength="10"
                 value={this.state.alternateMobile}
                 onChange={this.onChangeNumberHandler}
                 required />
                <label for="mobile2">Alternate Mobile No.</label>
              </div>

              <div className="input-field">
                <input 
                 type="text"
                 id="pincode"
                 name="pinCode"
                 maxLength="6"
                 pattern="\d*"
                 value={this.state.pinCode}
                 onChange={this.onChangeNumberHandler}
                 required />
                <label for="pincode">Pin Code *</label>
              </div>

              <div className="input-field">

                <select
                  className=""
                  id="state"
                  name="state"
                  value={this.state.state}
                  onChange={this.onChangeList}
                >
                  <option value="select">Select state</option>
                  {this.state.stateList.length && this.state.stateList.map(state => {
                return (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                );
              })}
                </select>
                {/* <label for="state">State *</label> */}
              </div>

              <div className="input-field">
                <select
                  className=""
                  id="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChangeHandler}
                >
                  <option value="select">Select City</option>
                  {this.state.citylist.load?(this.state.citylist.city.map(city => {
                return (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                );
              })):""}
                </select>
                {/* <label for="city-field">City/District *</label> */}
              </div>

              <div className="input-field">
                <input
                 type="text"
                 id="address1"
                 name="address"
                 value={this.state.address}
                 onChange={this.onChangeHandler}
                 required />
                <label for="address1">Address (House No, Building, Street, Area) *</label>
              </div>

              <div className="input-field">
                <input
                 type="text"
                 id="address2"
                 name="locality"
                 value={this.state.locality}
                 onChange={this.onChangeHandler} 
                 required />
                <label for="address2">Locality*</label>
              </div>
              <div className="input-field homeoffice">
                <input className="rb-home" name="addressType" value="home" id="rb-home" type="radio" onChange={this.onChangeHandler}/>
                <label className="label" for="rb-email">Home</label>
                <br/>
                <input className="rb-office" name="addressType" value="office" id="rb-office" type="radio" onChange={this.onChangeHandler}/>
                <label className="label" for="rb-phone">Office</label>
                <div className="office">
                  <div className="input-field officecheck">
                    <input type="checkbox" className="satwork" value={true} name="saturdayWorking" onChange={this.onChangeHandler}/>
                      Saturday Working &nbsp;
                    <input type="checkbox" className="satwork" value={true} name="sundayWorking" onChange={this.onChangeHandler}/>
                      Sunday Working
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="submit" className="submitbtn" data-dismiss="" onClick={this.onSubmitHandler}>Submit</button>
            <button type="button" className="closebtn" data-dismiss="modal">Close</button>
          </div>
        </div>

        </div>
      </div>
    </>
    );
  }
}

export default AddAdress;