import React, { Component, createRef, StrictMode } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { baseURL } from "../../../../../../credential.json";
import Modal from "react-modal";
import {
  categoryList,
  GetBrandNames,
  BrandApproval,
  ApprovedBrands,
  clearState
} from "../sellerAddProductAction";
//import { addProduct, currencyList, categoryList, GetAttributes } from "../sellerAddProductAction";
import "./MyProducts.css";
import { Link } from "react-router-dom";
import qs from "query-string";

class ApprovalofBrand extends Component {
  imageButton = createRef();
  constructor(props) {
    super(props);
    this.state = {
      sbmitBtn:"Apply",
      submitdisable:false,
      doctype: "",
      brandName: "",
      brandLogo: "",
      brandId: "",
      category: "",
      offlinemarket: "",
      SellerMarket: "",
      SupplierGSTIN: "",
      SellerGSTIN: "",
      Invoicenumber: "",
      InvoiceDate: "",
      BalExpiryDate: "",
      tmtypes: "",
      statusason: "",
      TmExpireon: "",
      TmAppliedon: "",
      tmstatus: "",
      websiteLink: "",
      sampleMRPTagImage: {},
      isBrandOwner: "",
      brandproof: {},
      Etnumber: "",
      tmclass: "",
      listingType:'',
      openmodal: false,
      activeApproval:false,
      activePending:false,
      activeapproved:false,
      maxDate: new Date().toISOString().slice(0, 10)
      

    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // static getDerivedStateFromProps(nextProps,prevState){
  //   console.log("calling get drive state from props")
  //   if (nextProps.statusapproval && nextProps.statusapproval.status !== 200) {
  //     return {
  //       submitdisable: false,sbmitBtn:'Apply'
  //     };
  //   }
  //   else if (nextProps.statusapproval && nextProps.statusapproval.status === 200) {
  //     return {
  //       sbmitBtn: 'Applied',
  //     };
  //   }

  //   else {
  //     return {
  //       sbmitBtn:"Applying...."
  //   }
  //   }
   
    
  // }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (prevProps.statusapproval !==this.props.statusapproval) {
      console.log("prev props ",prevProps)
      if ( this.props.statusapproval.status !== 200) {
         this.setState({submitdisable: false,sbmitBtn:'Apply'})

      }
      else if (this.props.statusapproval.status === 200) {

          this.setState({sbmitBtn: 'Applied'})

      }
    }
    
  }

  

  componentDidMount() {
    const queryString = qs.parse(this.props.location.search);
    this.setState({
      brandName: queryString.brandName,
      brandId: queryString.brand,
      category: queryString.mainCategory,
      listingType:queryString.listing,
      vertical:queryString.vertical,
      subcatgory:queryString.subcatgory,
      mainCategory:queryString.mainCategory,
      qcategory:queryString.category
      
    });
    // this.props.ApprovedBrands(queryString.category);
  }

  componentWillUnmount(){
    console.log("calling component will unmount")
    this.props.clearState('statusapproval',{})
  }

  handleImageChange(e) {
    e.preventDefault();
    console.log("logo ulpoad", e.target.files);
    this.setState({
      [e.target.name]: e.target.files[0],
    });
    console.log(e.target, [e.target.files[0]]);
    //this.saveData();
  }

  onChangeBrandName = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    let search = e.target.value
      console.log("approved brand",this.props.approvedbrand)
      let res = this.props.approvedbrand.findIndex((item)=>item.name===search)
      if(res===-1 ){
      this.setState({activeApproval:true,activePending:false,activeapproved:false})
      }
      else if (this.props.approvedbrand[res].status==="approved"){
      this.setState({activeApproval:false,activePending:false,activeapproved:true});
      }
      else {
        this.setState({activePending:true,activeApproval:false,activeapproved:false})
      }
      
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddImage = () => {
    this.imageButton.current.click();
  };

  onSubmitDone() {
    this.setState({ openmodal: true });
  }

  closeModal() {
    this.setState({ openmodal: false });
  }

  

  onSubmitHandler =  (e) => {
    e.preventDefault();
    this.setState((state, props) => ({
      submitdisable: true,
      sbmitBtn:"Applying..."
    }),console.log("current state",this.state));
    // this.setState({submitdisable:true,sbmitBtn:"Applying..."},console.log("creent sate",this.state))
    if (this.state.brandowner == "true") {
      this.setState({ brandowner: true });
    } else {
      this.setState({ brandowner: false });
    }
    let data;
    //const fd = new FormData(this.state.brandLogo);
    //fd.append('image',this.state.brandLogo,this.state.brandLogo.name);
    if (this.state.doctype == "trademark-certificate") {
      data = {
        name: this.state.brandName,
        productSaleMarketPlace: this.state.offlinemarket?this.state.offlinemarket:null,
        website: this.state.websiteLink ? this.state.websiteLink : null,
        isBrandOwner: this.state.isBrandOwner? parseInt(this.state.isBrandOwner):null,
        documentProof: this.state.brandproof,
        logo: this.state.brandLogo ? this.state.brandLogo:null,
        sampleMRPTagImage: this.state.sampleMRPTagImage?this.state.sampleMRPTagImage:null,
        documentType: this.state.doctype ? this.state.doctype:null,
        categoryId: parseInt(this.state.category),
        trademarkNumber: this.state.Etnumber,
        trademarkStatus: this.state.tmstatus,
        trademarkStatusOn: this.state.statusason,
        trademarkClass: this.state.tmclass,
        trademarkAppliedDate: this.state.TmAppliedon,
        trademarkExpiryDate: this.state.TmExpireon,
        trademarkType: this.state.tmtypes,
       
      };
    } else if (this.state.doctype == "brand-authorization-letter") {
      data = {
        name: this.state.brandName,
      productSaleMarketPlace: this.state.offlinemarket?this.state.offlinemarket:null,
      website: this.state.websiteLink ? this.state.websiteLink : null,
      isBrandOwner: this.state.isBrandOwner? parseInt(this.state.isBrandOwner):null,
      documentProof: this.state.brandproof,
      logo: this.state.brandLogo ? this.state.brandLogo:null,
      sampleMRPTagImage: this.state.sampleMRPTagImage?this.state.sampleMRPTagImage:null,
      documentType: this.state.doctype ? this.state.doctype:null,
      categoryId: parseInt(this.state.category),
        balExpiryDate: this.state.BalExpiryDate,
       
      };
    } else if (this.state.doctype == "invoice") {
      data = {
        name: this.state.brandName,
      productSaleMarketPlace: this.state.offlinemarket?this.state.offlinemarket:null,
      website: this.state.websiteLink ? this.state.websiteLink : null,
      isBrandOwner: this.state.isBrandOwner? parseInt(this.state.isBrandOwner):null,
      documentProof: this.state.brandproof,
      logo: this.state.brandLogo ? this.state.brandLogo:null,
      sampleMRPTagImage: this.state.sampleMRPTagImage?this.state.sampleMRPTagImage:null,
      documentType: this.state.doctype ? this.state.doctype:null,
      categoryId: parseInt(this.state.category),
        invoiceDate: this.state.InvoiceDate,
        invoiceNumber: this.state.Invoicenumber,
        sellerGstIN: this.state.SellerGSTIN,
        supplierGstIN: this.state.SupplierGSTIN,
       
      };
    } else {
      data = {
        name: this.state.brandName,
      productSaleMarketPlace: this.state.offlinemarket?this.state.offlinemarket:null,
      website: this.state.websiteLink ? this.state.websiteLink : null,
      isBrandOwner: this.state.isBrandOwner? parseInt(this.state.isBrandOwner):null,
      documentProof: this.state.brandproof,
      logo: this.state.brandLogo ? this.state.brandLogo:null,
      sampleMRPTagImage: this.state.sampleMRPTagImage?this.state.sampleMRPTagImage:null,
      documentType: this.state.doctype ? this.state.doctype:"",
      categoryId: parseInt(this.state.category),
      };
    }





    

    let fd = new FormData();
    //   for (const property in finalData2) {
    //       fd.append(property, (finalData2[property]));
    //      }

    let objectToFormData = function (obj, form, namespace) {
      // var fd = form || new FormData();
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
    
    this.props.BrandApproval(fd)
    

    
  };

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
    return (
      <div
        className="card myproductcontainer1"
        style={{
          marginTop: "6%",
          padding: "0",
          border: "1px solid lightgrey",
          borderRadius: "8px",
        }}
      >
        <div style={{ background: "#00000008", padding: "10px" }}>
          <h4 style={{ fontWeight: "500", fontSize: "20px" }}>
            Apply for Brand Approval
          </h4>
        </div>
        <div
          style={{
            margin: "10px 5%",
            paddingTop: "8px",
            border: "1px solid #00000030",
            borderRadius: "5px",
          }}
        >
          <center>
            <h4 style={{ fontWeight: "500", color: "#bf0000" }}>
              Brand Details
            </h4>
          </center>
          <hr />
          <form onSubmit={this.onSubmitHandler} style={{ padding: "2px 50px" }}>
            <div className="row spacing">
              <div className="col-auto colwidth100">
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label
                      className="mr-sm-2"
                      htmlFor="brandname"
                      style={{ color: "#000", float: "right" }}
                    >
                      Brand Name<span style={{ color: "#ff0000" }}>*</span>
                    </label>
                  </div>
                  <div className="col-auto colwidth45">
                    <input
                      type="text"
                      name="brandName"
                      className="form-control"
                      value={this.state.brandName}
                      onChange={this.onChangeBrandName}
                      readOnly={true}
                    />
                   
                  </div>
                  {this.state.activeApproval===true?<span><i className="fa fa-check" style={{color:"green",marginTop:"20px"}}></i></span>:null}
                  {this.state.activePending||this.state.activeapproved?<span><i className="fas fa-exclamation-triangle" style={{color:"red",marginTop:"20px"}}></i></span>:null}
                </div>
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label
                      className="mr-sm-2"
                      htmlFor="offlinemarket"
                      style={{ color: "#000", float: "right" }}
                    >
                      Is this Brand widely distributed in offline market?
                    </label>
                  </div>
                  <div className="col-auto colwidth50">
                    <select
                      className="custom-select mr-sm-2"
                      name="offlinemarket"
                      onChange={this.onChangeHandler}
                    >
                      <option>Select One</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label
                      className="mr-sm-2"
                      htmlFor="brandLogo"
                      style={{ color: "#000", float: "right" }}
                    >
                      Brand Logo
                    </label>
                  </div>
                  <div className="col-auto colwidth50">
                    <input
                      type="file"
                      accept="image/*"
                      name="brandLogo"
                      className="form-control"
                      onChange={this.handleImageChange}
                      ref={this.imageButton}
                    />
                  </div>
                </div>
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label
                      className="mr-sm-2"
                      htmlFor="websiteLink"
                      style={{ color: "#000", float: "right" }}
                    >
                      Brand Website Link
                    </label>
                  </div>
                  <div className="col-auto colwidth50">
                    <input
                      type="text"
                      name="websiteLink"
                      className="form-control"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                </div>
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label
                      className="mr-sm-2"
                      htmlFor="yes/noofline"
                      style={{ color: "#000", float: "right" }}
                    >
                      Where do you sell the products of this brand currently?
                    </label>
                  </div>
                  <div className="col-auto colwidth50">
                    <select
                      className="custom-select mr-sm-2"
                      name="SellerMarket"
                      onChange={this.onChangeHandler}
                    >
                      <option>Select One</option>
                      <option value="wholesale distributor">
                        WholeSale Distribution
                      </option>
                      <option value="ither online marketplace">
                        Other online marketplace
                      </option>
                      <option value="brand retail website">
                        Brand Retial Website
                      </option>
                      <option value="Not applicable">Not Applicable</option>
                      <option value="brick and mortar shop">
                        Brick and mortar Shop
                      </option>
                    </select>
                  </div>
                </div>
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label
                      className="mr-sm-2"
                      htmlFor="sampleMRPTagImage"
                      style={{ color: "#000", float: "right" }}
                    >
                      Sample MRP Tag
                    </label>
                  </div>
                  <div className="col-auto colwidth50">
                    <input
                      type="file"
                      accept="image/*"
                      name="sampleMRPTagImage"
                      className="form-control"
                      onChange={this.handleImageChange}
                    />
                  </div>
                </div>
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label
                      className="mr-sm-2"
                      style={{ color: "#000", float: "right" }}
                    >
                      Are you the Brand Owner
                    </label>
                  </div>
                  <div className="col-auto colwidth50">
                    <select
                      className="custom-select mr-sm-2"
                      name="isBrandOwner"
                      onChange={this.onChangeHandler}
                    >
                      <option value="">Select One</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </div>
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label
                      className="mr-sm-2"
                      htmlFor="brandproof"
                      style={{ color: "#000", float: "right" }}
                    >
                      Kindly upload :Trademark Certificate , Brand Authorization
                      Letter or Invoice Copy{" "}
                      
                    </label>
                  </div>
                  <div className="col-auto colwidth50">
                    <input
                      type="file"
                      name="brandproof"
                      className="form-control"
                      onChange={this.handleImageChange}
                      accept="application/pdf"
                    />
                  </div>
                </div>
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label
                      className="mr-sm-2"
                      htmlFor="yes/noofline"
                      style={{ color: "#000", float: "right" }}
                    >
                      Select document type
                    </label>
                  </div>
                  <div className="col-auto colwidth50">
                    <select
                      className="custom-select mr-sm-2"
                      name="doctype"
                      onChange={this.onChangeHandler}
                    >
                      <option value="">Select One</option>
                      <option value="trademark-certificate">
                        Trademark Certificate
                      </option>
                      <option value="brand-authorization-letter">
                        Brand Authorization Letter
                      </option>
                      <option value="invoice">Invoice</option>
                      <option value="other">Other document</option>
                    </select>
                  </div>
                  {this.state.doctype == "trademark-certificate" ? (
                    <>
                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          htmlFor="yes/noofline"
                          style={{ color: "#000", float: "right" }}
                        >
                          ET Number<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>

                      <div className="col-auto colwidth50">
                        <input
                          type="numer"
                          name="Etnumber"
                          className="form-control"
                          onChange={this.onChangeHandler}
                        />
                      </div>

                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          htmlFor="yes/noofline"
                          style={{ color: "#000", float: "right" }}
                        >
                          TM Status<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>

                      <div className="col-auto colwidth50">
                        <select
                          className="custom-select mr-sm-2"
                          name="tmstatus"
                          onChange={this.onChangeHandler}
                        >
                          <option>Select One</option>
                          <option value="Applied">Applied </option>
                          <option value="Rejected  ">Rejected </option>
                          <option value="Registered">Registered</option>
                          <option value="Objected ">Objected</option>
                          <option value="Invalid TM">Invalid TM</option>
                          <option value="Accepted and Advertise ">
                            Accepted and Advertised
                          </option>
                          <option value="Formality Check Fail ">
                            Formality Check Fail
                          </option>
                          <option value="Advertised bef acc ">
                            Advertised bef acc
                          </option>
                          <option value="Recertification filed ">
                            Recertification filed
                          </option>
                          <option value="Accepted ">Accepted</option>
                          <option value="Marked For Exam ">
                            Marked For Exam
                          </option>
                          <option value="Formality Check Pass ">
                            Formality Check Pass
                          </option>
                          <option value="Exam Report Issued ">
                            Exam Report Issued
                          </option>
                          <option value="Send To Vienna Cedificate ">
                            Send To Vienna Cedificate{" "}
                          </option>
                          <option value="Other Applied status ">
                            Other Applied status{" "}
                          </option>
                        </select>
                      </div>

                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          style={{ color: "#000", float: "right" }}
                        >
                          TM Status as on<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      <div className="col-auto colwidth50">
                        <input
                          type="Date"
                          name="statusason"
                          className="form-control"
                          max={this.state.maxDate}
                          onChange={this.onChangeHandler}
                        />
                      </div>
                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          htmlFor="EnterTMClass"
                          style={{ color: "#000", float: "right" }}
                        >
                          Enter TM Class<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      <div className="col-auto colwidth50">
                        <input
                          type="text"
                          name="tmclass"
                          className="form-control"
                          onChange={this.onChangeHandler}
                        />
                      </div>
                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          htmlFor="TMAppliedDate"
                          style={{ color: "#000", float: "right" }}
                        >
                          TM Applied Date<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      <div className="col-auto colwidth50">
                        <input
                          type="Date"
                          name="TmAppliedon"
                          className="form-control"
                          max={this.state.maxDate}
                          onChange={this.onChangeHandler}
                        />
                      </div>
                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          htmlFor="TMExpireDate"
                          style={{ color: "#000", float: "right" }}
                        >
                          TM Expire Date<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      <div className="col-auto colwidth50">
                        <input
                          type="Date"
                          name="TmExpireon"
                          className="form-control"
                          max={this.state.maxDate}
                          onChange={this.onChangeHandler}
                        />
                      </div>
                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          htmlFor="TMExpireDate"
                          style={{ color: "#000", float: "right" }}
                        >
                          Enter TM Type<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      <div className="col-auto colwidth50">
                        <select
                          className="custom-select mr-sm-2"
                          name="tmtypes"
                          onChange={this.onChangeHandler}
                        >
                          <option>Select One</option>
                          <option value="word">Word </option>
                          <option value="device  ">Device </option>
                          <option value="logo">Logo</option>
                          <option value="other">Other </option>
                        </select>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {this.state.doctype == "brand-authorization-letter" ? (
                    <>
                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          style={{ color: "#000", float: "right" }}
                        >
                          Enter BAL Expiry Date<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      <div className="col-auto colwidth50">
                        <input
                          type="Date"
                          name="BalExpiryDate"
                          className="form-control"
                          max={this.state.maxDate}
                          onChange={this.onChangeHandler}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {this.state.doctype == "invoice" ? (
                    <>
                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          htmlFor="TMAppliedDate"
                          style={{ color: "#000", float: "right" }}
                        >
                          Enter Enter Invoice Date<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      <div className="col-auto colwidth50">
                        <input
                          type="Date"
                          name="InvoiceDate"
                          className="form-control"
                          max={this.state.maxDate}
                          onChange={this.onChangeHandler}
                        />
                      </div>

                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          htmlFor="TMAppliedDate"
                          style={{ color: "#000", float: "right" }}
                        >
                          Invoice Number<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      <div className="col-auto colwidth50">
                        <input
                          type="Text"
                          name="Invoicenumber"
                          className="form-control"
                          onChange={this.onChangeHandler}
                        />
                      </div>

                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          htmlFor="TMAppliedDate"
                          style={{ color: "#000", float: "right" }}
                        >
                          Seller GSTIN<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      <div className="col-auto colwidth50">
                        <input
                          type="Text"
                          name="SellerGSTIN"
                          className="form-control"
                          onChange={this.onChangeHandler}
                        />
                      </div>

                      <div className="col-auto colwidth50">
                        <label
                          className="mr-sm-2"
                          htmlFor="TMAppliedDate"
                          style={{ color: "#000", float: "right" }}
                        >
                          Supplier GSTIN<span style={{ color: "#ff0000" }}>*</span>
                        </label>
                      </div>
                      <div className="col-auto colwidth50">
                        <input
                          type="Text"
                          name="SupplierGSTIN"
                          className="form-control"
                          onChange={this.onChangeHandler}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row spacing">
                  <div className="col-auto colwidth25"></div>
                  <div className="col-auto colwidth25">
                    <Link
                      className="btn btn-outline-dark w-100 h-100 text-center"
                      role="button"
                      to={{
                        pathname: `/seller/dashboard/ProductBrand`,
                        search: `category=${this.state.qcategory}&listing=${this.state.listingType}&mainCategory:${this.state.mainCategory}&vertical:${this.state.vertical}&subcatgory:${this.state.subcatgory}`,
                      }}
                      style={{paddingTop:"0.70rem"}}
                    >
                      Cancel
                    </Link>
                  </div>
                  <div className="col-auto colwidth25">
                    <input type="submit" value={this.state.sbmitBtn} className="btn btn-primary" disabled={this.state.submitdisable}/>
                  </div>
                  <div className="col-auto colwidth25"></div>
                </div>
                <div style={{display:"flex"}}>
                    {this.props.statusapproval && <h3 style={{color:this.props.statusapproval.status===200?"green":"red"}}>{this.props.statusapproval.message}</h3> }
                    {this.props.statusapproval && this.props.statusapproval.status===200?<Link to="/seller/dashboard/brandlist"><h3 style={{color:"dogerblue"}}>Click here to Track Approval Listing</h3></Link>:null}
                </div>  
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("status of brand approval",state.sellerAddProduct.statusapproval)
  return {
    BrandData: state.sellerAddProduct.BrandDetails,
    approvedbrand: state.sellerAddProduct.approvedbrand,
    statusapproval: state.sellerAddProduct.statusapproval,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    BrandApproval: (data) => dispatch(BrandApproval(data)),
    GetBrandNames:(brandName,category) => dispatch(GetBrandNames(brandName,category)),
    ApprovedBrands:(categoryId)=>dispatch(ApprovedBrands(categoryId)),
    clearState:(state,type) => dispatch(clearState(state,type))
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(ApprovalofBrand);
