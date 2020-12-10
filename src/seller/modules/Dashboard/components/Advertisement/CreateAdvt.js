import React, { Component,createRef } from 'react'
import AdvtNavigation from "./AdvtNavigation";
import Modal from "react-modal";

import "./Advt.css";

export default class CreateAdvt extends Component {
  imageBanner = createRef();
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      message: "",
      banner: "",
      previewBanner: "",
    };
  }


    

  handleAddImage = (e) => {
    e.preventDefault();
    this.imageBanner.current.click();
  };

  handleImageChange(e, preview) {
    e.preventDefault();
    console.log("logo ulpoad", e.target.files);
    console.log("logo ulpoad", e.target.files);
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        [preview]: reader.result,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
    this.setState({
      [e.target.name]: e.target.files[0],
    });
    console.log(e.target);
    //this.saveData();
  }

  onChangeHandler = (e) => {
    this.setState(
      { [e.target.name]: e.target.value },
      console.log("current state", this.state)
    );
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    let data = {
      subject:this.state.subject,
      message:this.state.message,
      banner:this.state.banner,
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
      this.props.creatAdvt(fd)

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

    console.log("saved status",this.props.savedStatus)
    return (
      <Modal
        isOpen={this.props.openModal}
        onRequestClose={this.props.closeModal}
        ariaHideApp={false}
        style={customStyles}
      >
      <div>
      <h3>Create Advertisement : </h3>
      </div>
      <hr/>
      <div className="container-fliud" style={{ marginTop: "5%" }}>
        <form onSubmit={this.onSubmitHandler} autoComplete="off">
          <div className="form-group row">
            <div className="col-sm-4 text-left">
              <label className="" htmlFor="subject">
                Subject<span style={{color:"red"}}>*</span>
              </label>
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="subject"
                value={this.state.subject}
                onChange={this.onChangeHandler}
                maxLength="50"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-4 text-left">
              <label className="" htmlFor="message">
                Message
              </label>
            </div>
            <div className="col-sm-6">
              <textarea
                className="form-control"
                rows="4"
                cols="50"
                name="message"
                value={this.state.message}
                onChange={this.onChangeHandler}
                maxLength="150"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-4 text-left">
              <label htmlFor="banner">Banner<span style={{color:"red"}}>*</span></label>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="banner"
                  className="form-control"
                  onChange={(e) =>
                    this.handleImageChange(e, "previewBanner")
                  }
                  ref={this.imageBanner}
                  style={{ display: "none" }}
                />
                
              </div>
            </div>
            <div style={{marginLeft:"16px"}}>
            <button
                  className="btn btn-primary"
                  onClick={(e) => this.handleAddImage(e)}
                >
                  upload
                </button>
              </div>
            <div
              className="col-sm-4"
              style={{ height: "200px", width: "150px" }}
            >
              <img
                alt="previewImg"
                src={
                  this.state.previewBanner
                    ? this.state.previewBanner
                    : "https://static.thenounproject.com/png/187803-200.png"
                }
                style={{ height: "200px", width: "180px" }}
                id="previewImg"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto colwidth25">
              <button className="btn btn-outline-dark w-100 h-100" onClick={this.props.closeModal}>
                Cancel
                </button>{' '}
              </div>      
            <div className="col-auto colwidth25">
              <input
                type="submit"
                className="btn btn-primary"
                value="Create"
              />
            </div>
          </div>
        </form>
        <div>
                    {this.props.savedStatus && <p style={{color:this.props.savedStatus.status===200?"green":"red"}}>{this.props.savedStatus.message}</p>}
                </div>
        
      </div>
      </Modal>
    )
  }
}
