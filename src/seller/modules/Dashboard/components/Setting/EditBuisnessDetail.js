import React, { Component, createRef } from "react";
import Modal from "react-modal";

export default class EditBuisnessDetail extends Component {
  imageButton = createRef();
  imageButton1 = createRef();
  imageButton3 = createRef();
  imageButton4 = createRef();

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gstIN: "",
      tan: "",
      signature: "",
      rbaFirstLine: "",
      rbaSecondLine: "",
      rbaPinCode: "",
      rbaCityId: "",
      rbaStateId: "",
      rbaCountryId: "",
      addressProofType: "",
      addressProofDocument: "",
      previewsignature: "",
      previewaddressProofDocument: "",
      pan: "",
      previewpanProofDocument: "",
      panProofDocument: "",
      gstCertificate:"",
      previewgstCertificate:""

    };
  }

  componentDidMount() {
    const { buisnessDetails } = this.props;
    this.props.countryList();
    this.props.stateList(buisnessDetails.rbaCountry.key);
    this.props.cityList(buisnessDetails.rbaState.key);

    // this.setState({stateList:res.data.data,citylist: {load: true,city:res2.data.data}})
    this.setState(
      {
        name: buisnessDetails.name,
        gstIN: buisnessDetails.gstIN,
        tan: buisnessDetails.tan,
        rbaFirstLine: buisnessDetails.rbaFirstLine,
        rbaSecondLine: buisnessDetails.rbaSecondLine,
        rbaPinCode: buisnessDetails.rbaPinCode,
        rbaCityId: buisnessDetails.rbaCity.key,
        rbaStateId: buisnessDetails.rbaState.key,
        rbaCountryId: buisnessDetails.rbaCountry.key,
        previewsignature: buisnessDetails.signature,
        pan: buisnessDetails.pan.pan_no,
        previewpanProofDocument: buisnessDetails.pan.document,
        addressProofType: buisnessDetails.addressProof
          ? buisnessDetails.addressProof.type
          : "",
        previewaddressProofDocument: buisnessDetails.addressProof
          ? buisnessDetails.addressProof.document
          : "",
          previewgstCertificate: buisnessDetails.gstCertificate
          ? buisnessDetails.gstCertificate
          : "",  
      },
      console.log("current state", this.state)
    );

    this.handleImageChange = this.handleImageChange.bind(this);
  }

  closeModal = () => {
    this.props.closeModal();
  };

  onChangeHandler = (e) => {
    this.setState(
      { [e.target.name]: e.target.value },
      console.log("current state", this.state)
    );
  };

  onChangeList = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (
      e.target.name === "rbaCountryId" &&
      e.target.value !== this.state.rbaCountryId
    ) {
      let countryId = parseInt(e.target.value);
      this.setState({ rbaCityId: "", rbaStateId: "" });
      this.props.stateList(countryId);
      this.props.clearState("cities", []);
    }

    if (
      e.target.name === "rbaStateId" &&
      e.target.value !== this.state.rbaStateId
    ) {
      let stateId = parseInt(e.target.value);
      this.setState({ rbaCityId: "" });

      this.props.cityList(stateId);
    }

    //   let res = await  axios.get(`${baseURL}/seller/countries/states/${stateId}/cities`)
    //   this.setState({citylist: {load: true,city:res.data.data}})
  };

  handleAddImage = (e, picked) => {
    e.preventDefault();
    if (picked === "1") this.imageButton1.current.click();
    else if (picked === "3") this.imageButton3.current.click();
    else if (picked === "4") this.imageButton4.current.click();
    else  this.imageButton.current.click();
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

  onSubmitHandler = (e) => {
    e.preventDefault();

    // const file = new File( this.state.signature,{
    // 	type: 'image/jpeg'})

    function srcToFile(src, fileName, mimeType) {
      console.log("src:", src, "filename:", fileName);
      return fetch(src)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], fileName, { type: mimeType });
        });
    }

    //usage example: (works in Chrome and Firefox)
    //convert src to File and upload to server php

    let data = {
      name: this.state.name,
      gstIN: this.state.gstIN,
      tan: parseInt(this.state.tan),
      signature: this.state.signature ? this.state.signature : null,
      gstCertificate:this.state.gstCertificate?this.state.gstCertificate:null,
      rbaFirstLine: this.state.rbaFirstLine,
      rbaSecondLine: this.state.rbaSecondLine,
      rbaPinCode: parseInt(this.state.rbaPinCode),
      rbaCityId: parseInt(this.state.rbaCityId),
      rbaStateId: parseInt(this.state.rbaStateId),
      rbaCountryId: parseInt(this.state.rbaCountryId),
      pan: this.state.pan,
      panProofDocument: this.state.panProofDocument
        ? this.state.panProofDocument
        : null,
      addressProofType: this.state.addressProofType,
      addressProofDocument: this.state.addressProofDocument
        ? this.state.addressProofDocument
        : null,
    };

    const fd = new FormData();

    let objectToFormData = function (obj, form, namespace) {
      let formKey;

      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (namespace) {
            formKey = namespace + "[" + property + "]";
          } else {
            formKey = property;
          }

          // if the property is an object, but not a File,
          // use recursivity.
          if (
            typeof obj[property] === "object" &&
            !(obj[property] instanceof File)
          ) {
            objectToFormData(obj[property], fd, formKey);
          } else {
            // if it's a string or a File object
            fd.append(formKey, obj[property]);
          }
        }
      }
    };

    objectToFormData(data);
    let fileDoc = [
      { value: this.state.signature, property: "signature" },
      { value: this.state.panProofDocument, property: "panProofDocument" },
      {
        value: this.state.addressProofDocument,
        property: "addressProofDocument",
      },
      {
        value: this.state.gstCertificate,
        property: "gstCertificate",
      }
    ];
    let count = 0
    let preview=false;
    let fileDocfinal=[]
fileDoc.map((item, index) => {

      console.log("calling it", index);
      if (item["value"] === "") 
          fileDocfinal.push(item)
    });
    
  
if(fileDocfinal.length)
{
  let ext = [".png",".jpg","jpeg",".pdf"]
  console.log("calling filedoc final",fileDocfinal.length)
fileDocfinal.map((item,index)=>{

    let temp = "preview" + item.property;
    let source = this.state[`${temp}`]
    let extension = ext.map((item)=>{
      let res = source.search(item)
        if(res!==-1){
          return item
        }
    })
    console.log("extension are",extension)
    srcToFile(source, "new.jpeg", "image/jpeg").then(
      (file) => {
        console.log("calling for",file);
          fd.append(`${item.property}`, file);
        if (fileDocfinal.length === index+1) {
          console.log("calling final fieldoc")
          this.props.saveBusinessDetails(fd);
        }
      }
    );
    
  
})
}
else
{
  console.log("not calling")
this.props.saveBusinessDetails(fd);
}



    // if(this.state.signature==="" && this.state.panProofDocument==="" && this.state.addressProofDocument==="")
    // {
    // 	console.log("called blank input");
    // 	srcToFile(this.state.previewsignature, 'new.jpeg', 'image/jpeg')
    // 	.then(file=>{
    // 		fd.append("signature",file)
    //     srcToFile(this.state.previewpanProofDocument, 'new.jpeg', 'image/jpeg')
    // 		.then(file =>{
    //       fd.append("panProofDocument",file)
    //       srcToFile(this.state.previewaddressProofDocument, 'new.jpeg', 'image/jpeg')
    //       .then(file =>{
    //         fd.append("addressProofDocument",file)
    //         this.props.saveBusinessDetails(fd);
    //       })

    // 		})
    // 	})
    // }
    // else
  };

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        height: "600px",
        marginRight: "-50%",
        width: "50vw",
        transform: "translate(-50%, -50%)",
      },
    };
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.setOpenBdetail}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          style={customStyles}
        >
          <div>
            <h3>Buisness details</h3>
          </div>
          <hr />
          <form onSubmit={this.onSubmitHandler} autoComplete="off">
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="name">
                  Buisness Name
                </label>
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="gstIN">
                  GSTIN
                </label>
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="gstIN"
                  value={this.state.gstIN}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="row">
              <div>
                <label className="col-sm-4" htmlFor="gstCertificate">
                  upload gstCertificate
                </label>
              </div>
              <div className="">
                <input
                  type="file"
                  accept="application/pdf"
                  name="gstCertificate"
                  className="form-control"
                  onChange={(e) =>
                    this.handleImageChange(e, "previewgstCertificate")
                  }
                  ref={this.imageButton4}
                  style={{ display: "none" }}
                />
                <button
                  className="btn btn-primary"
                  onClick={(e) => this.handleAddImage(e, "4")}
                >
                  upload
                </button>
              </div>
              <div style={{width:"100px"}}>
                {this.state.previewgstCertificate}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="tan">
                  TAN
                </label>
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="tan"
                  value={this.state.tan}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="rbaFirstLine">
                  Address Line 1
                </label>
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="rbaFirstLine"
                  value={this.state.rbaFirstLine}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="rbaSecondLine">
                  Adress Line 2
                </label>
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="rbaSecondLine"
                  value={this.state.rbaSecondLine}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="pan">
                  PAN No
                </label>
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="pan"
                  value={this.state.pan}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="row">
              <div>
                <label className="col-sm-4" htmlFor="panProofDocument">
                  upload pancard
                </label>
              </div>
              <div className="">
                <input
                  type="file"
                  accept="image/*"
                  name="panProofDocument"
                  className="form-control"
                  onChange={(e) =>
                    this.handleImageChange(e, "previewpanProofDocument")
                  }
                  ref={this.imageButton3}
                  style={{ display: "none" }}
                />
                <button
                  className="btn btn-primary"
                  onClick={(e) => this.handleAddImage(e, "3")}
                >
                  upload
                </button>
              </div>
              <div>
                <img
                  alt="previewImg"
                  src={this.state.previewpanProofDocument}
                  style={{ height: "200px", width: "200px" }}
                  id="previewImg"
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="addressProofType">
                  Address Proof
                </label>
              </div>
              <div className="col-sm-4">
                <select
                  className=""
                  id="addressProofType"
                  name="addressProofType"
                  value={this.state.addressProofType}
                  onChange={this.onChangeList}
                >
                  <option value="select">Select</option>
                  <option value="aadhar-card">Adhaar</option>
                  <option value="driving-license">Driving License</option>
                  <option value="passport">Passport</option>
                  <option value="electricity-bill">Electricity Bill</option>
                  <option value="phone-bill">Phone Bill</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div>
                <label className="col-sm-4" htmlFor="addressProofDocument">
                  upload address proof
                </label>
              </div>
              <div className="">
                <input
                  type="file"
                  accept="image/*"
                  name="addressProofDocument"
                  className="form-control"
                  onChange={(e) =>
                    this.handleImageChange(e, "previewaddressProofDocument")
                  }
                  ref={this.imageButton1}
                  style={{ display: "none" }}
                />
                <button
                  className="btn btn-primary"
                  onClick={(e) => this.handleAddImage(e, "1")}
                >
                  upload
                </button>
              </div>
              <div>
                <img
                  alt="previewImg"
                  src={this.state.previewaddressProofDocument}
                  style={{ height: "200px", width: "200px" }}
                  id="previewImg"
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="rbaPinCode">
                  PinCode
                </label>
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="rbaPinCode"
                  value={this.state.rbaPinCode}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="rbaCountryId">
                  Country
                </label>
              </div>
              <div className="col-sm-4">
                <select
                  className=""
                  id="rbaCountryId"
                  name="rbaCountryId"
                  value={this.state.rbaCountryId}
                  onChange={this.onChangeList}
                >
                  <option value="select">Select Country</option>
                  {this.props.countries &&
                    this.props.countries.length &&
                    this.props.countries.map((country) => {
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
                <label className="" htmlFor="rbaStateId">
                  State
                </label>
              </div>
              <div className="col-sm-4">
                <select
                  className=""
                  id="rbaStateId"
                  name="rbaStateId"
                  value={this.state.rbaStateId}
                  onChange={this.onChangeList}
                >
                  <option value="select">Select state</option>
                  {this.props.statelist &&
                    this.props.statelist.length &&
                    this.props.statelist.map((state) => {
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
                <label className="" htmlFor="rbaCityId">
                  City
                </label>
              </div>
              <div className="col-sm-4">
                <select
                  className=""
                  id="rbaCityId"
                  name="rbaCityId"
                  value={this.state.rbaCityId}
                  onChange={this.onChangeList}
                >
                  <option value="select">Select City</option>
                  {this.props.cities &&
                    this.props.cities.length &&
                    this.props.cities.map((country) => {
                      return (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="row">
              <div>
                <label className="col-sm-4" htmlFor="signature">
                  Signature
                </label>
              </div>
              <div className="">
                <input
                  type="file"
                  accept="image/*"
                  name="signature"
                  className="form-control"
                  onChange={(e) =>
                    this.handleImageChange(e, "previewsignature")
                  }
                  ref={this.imageButton}
                  style={{ display: "none" }}
                />
                <button
                  className="btn btn-primary"
                  onClick={(e) => this.handleAddImage(e, "2")}
                >
                  upload
                </button>
              </div>
              <div>
                <img
                  alt="previewImg"
                  src={this.state.previewsignature}
                  style={{ height: "200px", width: "200px" }}
                  id="previewImg"
                />
              </div>
            </div>
            <div className="row">
              <div>
                <input
                  type="button"
                  className="btn btn-primary"
                  value="cancel"
                  onClick={this.closeModal}
                />
              </div>
              <div>
                <input type="submit" className="btn btn-primary" value="Save" />
              </div>
              <div
                style={{ background: "rgba(0, 0, 0, 0.9)", marginLeft: "10px" }}
              >
                {this.props.savedStatus && this.props.savedStatus.message && (
                  <center>
                    <p style={{ color: "red", padding: "10px" }}>
                      {this.props.savedStatus.message}{" "}
                    </p>
                  </center>
                )}
              </div>
            </div>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}
