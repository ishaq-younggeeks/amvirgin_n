import React, { Component,createRef } from 'react'
import Modal from 'react-modal';

export default class EditBankDetail extends Component {
	imageButton2 = createRef();

		constructor(props){
			super(props);
			this.state={
				accountHolderName:"",
				accountNumber:"",
				bankName:"",
				branch:"",
				cityId:"",
				countryId:"",
				ifsc:"",
				businessType:"",
				cancelledCheque:"",
				stateId:"",
				previewproofDoc:"",
				previewcCheque:""

			}
		}


		componentDidMount() {
			const {bankDetails} = this.props;
			this.props.countryList();
			this.props.stateList(bankDetails.country.key);
			this.props.cityList(bankDetails.state.key);
			this.setState({
				accountHolderName:bankDetails.accountHolderName,
				accountNumber:bankDetails.accountNumber,
				bankName:bankDetails.bankName,
				branch:bankDetails.branch,
				cityId:bankDetails.city.key,
				countryId:bankDetails.country.key,
				branch:bankDetails.branch,
				ifsc:bankDetails.ifsc,
				businessType:bankDetails.businessType,
				previewcCheque:bankDetails.cancelledCheque,
                stateId:bankDetails.state.key,
			},console.log("current state",this.state))

			this.handleImageChange = this.handleImageChange.bind(this);
		}


    closeModal = () => {
        this.props.closeModal();
		}

		onChangeHandler = (e) => {
			this.setState({ [e.target.name]: e.target.value },console.log("current state",this.state))
		}

		onChangeList = e => {

			this.setState({
			  [e.target.name]: e.target.value
			});

			if(e.target.name==="countryId" && e.target.value!==this.state.countryId)
			{
				let countryId = parseInt(e.target.value)
				this.setState({cityId:"",stateId:""})
        this.props.stateList(countryId);
        this.props.clearState("cities",[])
			}

			 if(e.target.name==="stateId" && e.target.value!==this.state.stateId)
			{
				let stateId = parseInt(e.target.value)
				this.setState({cityId:""})

				this.props.cityList(stateId);
			}
			

			//   let res = await  axios.get(`${baseURL}/seller/countries/states/${stateId}/cities`)
			//   this.setState({citylist: {load: true,city:res.data.data}})
		  }

		  handleAddImage = (e,picked) => {
        e.preventDefault();
			if(picked==="1")
			this.imageButton1.current.click();
			else
			this.imageButton2.current.click();
		};

		handleImageChange(e,preview){
			e.preventDefault();
			console.log("logo ulpoad",e.target.files);
			console.log("logo ulpoad", e.target.files);
			let reader = new FileReader();
			reader.onloadend = () => {
				this.setState({
					[preview]:reader.result
				});
			  };
			  reader.readAsDataURL(e.target.files[0]);
			this.setState({
					[e.target.name]: e.target.files[0]
			});
			console.log(e.target)
			//this.saveData();
		};
		
		onSubmitHandler = (e) => {
			e.preventDefault();

			// const file = new File( this.state.signature,{
			// 	type: 'image/jpeg'})

				function srcToFile(src, fileName, mimeType){
					return (fetch(src)
						.then(function(res){return res.arrayBuffer();})
						.then(function(buf){return new File([buf], fileName, {type:mimeType});})
					);
				}
				
				//usage example: (works in Chrome and Firefox)
				//convert src to File and upload to server php
				

			let data={
				accountHolderName:this.state.accountHolderName,
				accountNumber:this.state.accountNumber,
				bankName:this.state.bankName,
				branch:this.state.branch,
				ifsc:this.state.ifsc,
				businessType:this.state.businessType,
				pan:this.state.pan,
				cityId:parseInt(this.state.cityId),
				stateId:parseInt(this.state.stateId),
				countryId:parseInt(this.state.countryId),
				cancelledCheque:this.state.cancelledCheque?this.state.cancelledCheque:null,

			}

			const fd = new FormData();

			let objectToFormData = function(obj, form, namespace) {
				let formKey;
				
				for(var property in obj) {
					if(obj.hasOwnProperty(property)) {          
						if(namespace) {
							formKey = namespace + '[' + property + ']';
						} else {
							formKey = property;
						}
					 
						// if the property is an object, but not a File,
						// use recursivity.
						if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
	
							objectToFormData(obj[property], fd, formKey);
						}
				 
					else {   
							// if it's a string or a File object
							fd.append(formKey, obj[property])
					}
						
					}
				}
					
			};

			objectToFormData(data);

			if(this.state.addressProofDocument==="" && this.state.cancelledCheque==="")
			{	
				console.log("called blank input");
				srcToFile(this.state.previewproofDoc, 'new.jpeg', 'image/jpeg')
				.then(file=>{
					fd.append("addressProofDocument",file)
					srcToFile(this.state.previewcCheque, 'new.jpeg', 'image/jpeg')
					.then(file =>{
						fd.append("cancelledCheque",file)
						this.props.saveBankDetails(fd);
					})
				})
				
			}

			else if(this.state.addressProofDocument==="")
			{
				srcToFile(this.state.previewproofDoc,'new.jpeg','image/jpeg')
				.then(file=>{
					fd.append("addressProofDocument",file)
					this.props.saveBankDetails(fd);
				})
			}
			else if(this.state.cancelledCheque==="")
			{
				srcToFile(this.state.previewcCheque, 'new.jpeg', 'image/jpeg')
					.then(file =>{
						fd.append("cancelledCheque",file)
						this.props.saveBankDetails(fd);
					})
			}

			else
				this.props.saveBankDetails(fd);

		}

    render() {
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
			  bottom                : 'auto',
                height				: '600px',
              marginRight           : '-50%',
              width	                : '50vw',
              transform             : 'translate(-50%, -50%)'
              
            }
          };
        return (
            <React.Fragment>
                <Modal
                isOpen={this.props.setOpenBnkdetail}                           
                onRequestClose={this.closeModal}
                ariaHideApp={false}
                style={customStyles}>
                    <div>
							<h3>Bank details</h3>
						</div>
						<hr/>
						<form onSubmit={this.onSubmitHandler} autoComplete="off">
							<div className="form-group row">
								<div className="col-sm-4 text-left">
									<label className="" htmlFor="accountHolderName" >Account Holder Name</label>
								</div>
								<div className="col-sm-4">
									<input type="text" className="form-control" name="accountHolderName" value={this.state.accountHolderName} onChange={this.onChangeHandler}/>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-4 text-left">
									<label className="" htmlFor="accountNumber" >Account Number</label>
								</div>
								<div className="col-sm-4">
									<input type="text" className="form-control" name="accountNumber" value={this.state.accountNumber} onChange={this.onChangeHandler}/>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-4 text-left">
									<label className="" htmlFor="bankName" >Bank Name</label>
								</div>
								<div className="col-sm-4">
									<input type="text" className="form-control" name="bankName" value={this.state.bankName} onChange={this.onChangeHandler}/>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-4 text-left">
									<label className="" htmlFor="ifsc" >Branch</label>
								</div>
								<div className="col-sm-4">
									<input type="text" className="form-control" name="branch" value={this.state.branch} onChange={this.onChangeHandler}/>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-4 text-left">
									<label className="" htmlFor="countryId" >Country</label>
								</div>
								<div className="col-sm-4">
								<select
            					    className=""
            					    id="countryId"
            					    name="countryId"
            					    value={this.state.countryId}
            					    onChange={this.onChangeList}
            					  >
            					    <option value="select">Select Country</option>
            					    {this.props.countries && this.props.countries.length && this.props.countries.map(country => {
            					  return (
            					    <option key={country.id} value={country.id}>
            					      {country.name}
            					    </option>
            					  );
            					})}
            					  </select>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-4 text-left">
									<label className="" htmlFor="stateId" >State</label>
								</div>
								<div className="col-sm-4">
								<select
            					    className=""
            					    id="stateId"
            					    name="stateId"
            					    value={this.state.stateId}
            					    onChange={this.onChangeList}
            					  >
            					    <option value="select">Select state</option>
            					    {this.props.statelist && this.props.statelist.length && this.props.statelist.map(state => {
            					  return (
            					    <option key={state.id} value={state.id}>
            					      {state.name}
            					    </option>
            					  );
            					})}
            					  </select>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-4 text-left">
									<label className="" htmlFor="cityId" >City</label>
								</div>
								<div className="col-sm-4">
								<select
            					    className=""
            					    id="cityId"
            					    name="cityId"
            					    value={this.state.cityId}
            					    onChange={this.onChangeList}
            					  >
            					    <option value="select">Select City</option>
            					    {this.props.cities && this.props.cities.length && this.props.cities.map(country => {
            					  return (
            					    <option key={country.id} value={country.id}>
            					      {country.name}
            					    </option>
            					  );
            					})}
            					  </select>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-4 text-left">
									<label className="" htmlFor="ifsc" >IFSC Code</label>
								</div>
								<div className="col-sm-4">
									<input type="text" className="form-control" name="ifsc" value={this.state.ifsc} onChange={this.onChangeHandler}/>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-4 text-left">
									<label className="" htmlFor="businessType" >Buisness Type</label>
								</div>
								<div className="col-sm-4">
								<select
            					    className=""
            					    id="businessType"
            					    name="businessType"
            					    value={this.state.businessType}
            					    onChange={this.onChangeList}
            					  >
            					    <option value="select">Select</option>
            					    <option value="proprieter">Proprieter</option>
									<option value="partner">Partner</option>
									<option value="">Corporation</option>
            					  </select>
								</div>
							</div>
							<div className="row">
								<div>
								<label className="col-sm-4" htmlFor="cancelledCheque" >Cancelled cheque</label>
								</div>
								<div className="">
									<input type="file"  accept="image/*" name="cancelledCheque" className="form-control" onChange={(e)=>this.handleImageChange(e,"previewcCheque")} ref={this.imageButton2} style={{ display: "none" }} />
									<button className="btn btn-primary" onClick={(e)=>this.handleAddImage(e,"2")}>upload</button>
								</div>
								<div>
								<img  alt="previewImg" src={this.state.previewcCheque} style={{ height: "200px", width: "200px" }} id="previewImg" />
								</div>
							</div>
							<div className="row">
								<div>
									<input type="button" className="btn btn-primary" value="cancel" onClick={this.closeModal}/>
								</div>
								<div>
									<input type="submit" className="btn btn-primary" value="Save"/>
								</div>
								<div style={{background:"rgba(0, 0, 0, 0.9)",marginLeft:"10px"}}>
									{this.props.savedStatus && this.props.savedStatus.message && <center><p style={{color:"red",padding:"10px"}}>{this.props.savedStatus.message} </p></center>}
								</div>
							</div>						
                    </form>                                 
                </Modal>
            </React.Fragment>
        )
    }
}
