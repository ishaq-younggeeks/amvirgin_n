import React, { Component,createRef } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { SubIssue } from "./SubIssueConstant";
import {connect} from 'react-redux';
import {saveTicketDetails} from './SellerSupportAction';

 class CreateTicket extends Component {
  fileUploadButton = createRef();
  constructor(props) {
    super(props);
    this.state = {
      email:this.props.sellerDetails?this.props.sellerDetails.email:"",
      subject: "",
      description:"",
      attachments:[],
      callbackNumber:this.props.sellerDetails?this.props.sellerDetails.mobile:"",
      issue:this.props.issue,
      subIssue:"",
      orderId:[]

    };
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value },console.log("current state",this.state));
  };

  handleAddFile = () => {
    this.fileUploadButton.current.click();
  };

  handleFileChange = e => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    files.forEach(file => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          attachments: [...this.state.attachments, file],});
      };
      reader.readAsDataURL(file);
    });
    console.log("current state",this.state)
  };


 

  removeFile = (i) => {
    this.setState({
      attachments: this.state.attachments.filter((image, index) => index !== i)
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    let data = {
      email:this.state.email,
      subject:this.state.subject,
      description:this.state.description,
      attachments:this.state.attachments,
      callbackNumber:this.state.callbackNumber,
      orderId:this.state.orderId,
      issue:this.state.issue,
      subIssue:this.state.subIssue
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
      this.props.saveTicketDetails(fd)

  }

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        maxHeight:"600px",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
    return (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.props.openCreateTicket}
        ariaHideApp={false}
        style={customStyles}
      >
        <div className="row">
          <div className="col-md-12">
            Please fill the below detail to create a ticket :-
            <form onSubmit={this.onSubmitHandler}>
              <div className="form-group row">
                <div className="col-sm-4 text-left">
                  <label className="" htmlFor="email">
                    Primary Email<span style={{ color: "#ff0000" }}>*</span>
                  </label>
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeHandler}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4 text-left">
                  <label className="" htmlFor="subject">
                    Subject<span style={{ color: "#ff0000" }}>*</span>
                  </label>
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={this.state.subject}
                    onChange={this.onChangeHandler}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4 text-left">
                  <label className="" htmlFor="subIssue">
                   Sub Issue Type<span style={{ color: "#ff0000" }}>*</span>
                  </label>
                </div>
                <div className="col-sm-6">
                  <select name="subIssue" id="cars" onChange={this.onChangeHandler} value={this.state.subIssue}>
                  <option value={""}>Select</option>
                    {SubIssue
                      ? SubIssue[this.props.issue].map((item) => {
                          return <option value={item}>{item}</option>;
                        })
                      : null}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4 text-left">
                  <label className="" htmlFor="description">
                    Desciption<span style={{ color: "#ff0000" }}>*</span>
                  </label>
                </div>
                <div className="col-sm-6">
                  <textarea
                    type="texarea"
                    rows="4"
                    cols="50"
                    className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangeHandler}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4 text-left">
                  <div onClick={this.handleAddFile} style={{ cursor:"pointer",border:"1px solid dodgerblue"}}>
                    Attachments<i class="fa fa-paperclip"></i>
                  </div>
                </div>
                <div className="">
                  <input
                    className="upload"
                    type="file"
                    accept="*"
                    onChange={this.handleFileChange}
                    multiple
                    ref={this.fileUploadButton}
                    style={{ display: "none" }}
                    max-upload="5"
                  />
                </div>
                <div>
                  {this.state.attachments.length ? this.state.attachments.map((item,index)=>{
                    return (
                      <div>
                        {item.name}<span><i className="fa fa-window-close" onClick={()=>this.removeFile(index)} style={{marginLeft:"10px",color:"red",cursor:"pointer"}}></i></span>
                        </div>
                    )
                  }):null}
                  </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4 text-left">
                  <label className="" htmlFor="callbackNumber">
                    Callback Number<span style={{ color: "#ff0000" }}>*</span>
                  </label>
                </div>
                <div className="col-sm-6">
                  <input
                    type="number"
                    className="form-control"
                    name="callbackNumber"
                    value={this.state.callbackNumber}
                    onChange={this.onChangeHandler}
                    min="0"
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-auto colwidth25">
                  <button
                    onClick={this.props.openCreateTicket}
                    className="btn btn-outline-dark w-100"
                    style={{ padding: "10px 5px" }}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-auto colwidth25">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Create"
                  />
                </div>
                
              </div>
              <div className="row">
                <div style={{background:this.props.savedStatus.status===200?"rgba(40, 167, 69, 0.9)":"rgba(0, 0, 0, 0.9)",marginLeft:"10px"}}>
													{this.props.savedStatus && this.props.savedStatus.message && <center><p style={{color:this.props.savedStatus.status===200?"white":"red",padding:"10px"}}>{this.props.savedStatus.message} </p></center>}
												</div>
                  </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sellerDetails:state.sellerAuth.currentUser,
    savedStatus: state.sellerSupport.savedStatus,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveTicketDetails:(data)=> dispatch(saveTicketDetails(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateTicket)