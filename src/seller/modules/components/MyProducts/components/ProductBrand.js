import React, { Component, createRef, StrictMode } from "react";
import { connect } from "react-redux";
import qs from 'query-string';
import axios from 'axios'
import { baseURL } from "../../../../../credential.json";
import "../Addproduct.css"
import {categoryList,GetBrandNames,BrandApproval,ApprovedBrands,generateProductToken } from "../sellerAddProductAction";
import Modal from 'react-modal';
import {Link}  from 'react-router-dom'


class ProductBrand extends Component {

    constructor(props){
        super(props);
        this.state={
            category:"",
            setIsOpen:false,
            searchBrand:"",
            selectSearchId:"",
            activeListing:false,
            activeApproval:false,
            activePending:false,
            listingBrand:"",
            listingType:"",
            vertical:"",
            subcategory:"",
            mainCategory:""
        }
        this.openModal=this.openModal.bind(this);
        this.closeModal=this.closeModal.bind(this);
        this.GetBrandNames=this.GetBrandNames.bind(this);
    }
    componentDidMount(){
     console.log("current",this.props.location.search);
      let query = qs.parse(this.props.location.search)
      console.log("parsed query",query);
    this.setState({category:query.category,listingType:query.listing,vertical:query.vertical,subcatgory:query.subcatgory,mainCategory:query.mainCategory},console.log("search bar",this.state.listingType,typeof(this.state.listingType)))
      console.log("current category",this.state.category);
      this.props.ApprovedBrands(query.mainCategory);
    }

    openModal(){
        this.setState({setIsOpen:true})
    }

    closeModal(){
        this.setState({setIsOpen:false})
    }

    GetBrandNames(e){
      let name = e.target.value;
      
      if(name.length>=2){
      this.setState({setIsOpen:true,searchBrand:e.target.value})
        
        this.props.GetBrandNames(name,parseInt(this.state.category));
      }
      else{
        console.log("calling when less then 2");
        this.setState({searchBrand:name,setIsOpen:false})
      }
    }

    selectBrand = (id,name) => {
      this.setState({selectSearchId:id,searchBrand:name,setIsOpen:false})
    }

    checkBrand = (id,name) => {
      console.log("check brand called",id)
      if(id || this.state.searchBrand)
      {
      
      // this.props.BrandApproval(parseInt(id));
      console.log("approved brand",this.props.approvedbrand)
      let res = this.props.approvedbrand.findIndex((item)=>item.name===this.state.searchBrand)
      if(res===-1 ){
      this.setState({activeListing:false,activePending:false,activeApproval:true,setIsOpen:false,listingBrand:this.state.searchBrand})
      }
      else if (this.props.approvedbrand[res].status==="approved"){
      this.setState({activeListing:true,activePending:false,activeApproval:false,setIsOpen:false,listingBrand:this.state.searchBrand});
      }
      else {
        this.setState({activeListing:false,activePending:true,setIsOpen:false,listingBrand:this.state.searchBrand})
      }
      }
    }

    selectApproved = (e,id,name) => {
      e.preventDefault();
      this.setState({activeListing:true,activePending:false,activeApproval:false,listingBrand:name,listingBrandId:id});
    }

    queryString = () => {
      const query = { category: this.state.category, brandName: this.state.listingBrand,brand:this.state.listingBrandId,vertical:this.state.vertical,subcatgory:this.state.subcatgory,mainCategory:this.state.mainCategory};
      const searchString = qs.stringify(query);
      return searchString
      // `category=${this.props.match.params.query}&brand=${this.state.listingBrand}`
    }

    queryStringBrand = () => {
      const query = { brand:this.state.selectSearchId, brandName: this.state.searchBrand,category:this.state.category,listing:this.state.listingType,mainCategory:this.state.mainCategory,vertical:this.state.vertical,subcatgory:this.state.subcatgory};
      const searchString = qs.stringify(query)
      return searchString
    }

    createProduct = () => {
      this.props.generateProductToken();
    }
    
    render(){
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              width: "30vw",
              transform             : 'translate(-50%, -50%)'
            }
          };
          console.log("location in brand",this.props.location)
        return(
          <React.Fragment>
            <div className="card selectbrandcont">
                <div className="col-auto colwidth100">
                  <p className="checkbrandtitle">Check for Brand you want to Sell</p>
                  <div className="row brandrow">
                      <div className="branddiv">
                     
                      <input type="text" name="domesticWarranty" className="form-control" placeholder="Enter brand name" onChange={this.GetBrandNames} autoComplete="off" value={this.state.searchBrand}/>
                      {this.state.setIsOpen?<div className="BrandSearch">{this.props.BrandData && this.props.BrandData.map((res,index)=>{
                      return(
                      <Link key={index} onClick={()=>this.selectBrand(res.id,res.name)}><p>{res.name}</p></Link>
                      )
                    })}
                    </div>:""
                    }
                      </div>
                      <div className="branddiv"> <button className="checkbrandbtn"  onClick={()=>this.checkBrand(this.state.selectSearchId)}>Check Brand</button>
                      </div>
                                           
                  </div>
                    
                  Select one of your Approved brands from below :
                  <ul>
                    {!this.props.isBrandLoading? this.props.approvedbrand && this.props.approvedbrand.length? this.props.approvedbrand.map(res=>{
                      {
                        return(
                          res.status==="approved"?
                          <li key={res.key}>
                            <Link className="text-primary" onClick={(e)=>this.selectApproved(e,res.key,res.name)}> {res.name}</Link>
                          </li>:""
                         
                        )
                        
                      }

                    }):<li style={{color:"dodgerblue"}}>no approved brand </li>
                  :null}
                  
                  </ul>  
                         
                </div>
                <div className="activelisting">
                {this.state.activeListing?(
                <div> 
                  <div style={{textAlign:"center"}}>
                <p style={{position:"absolute",right:"30px",margin:"20px", color:"dodgerblue"}}>{this.state.listingBrand}</p>
                  <p style={{position:"absolute",right:"30px"}}>You can start selling under this brand.</p>
                  </div>
                  <Link className="nxtbtncat" onClick={this.createProduct} to={{pathname:this.state.listingType==='single'?`/seller/dashboard/addproduct`:`/seller/dashboard/addproduct/bulk`,search:this.queryString()} }>Create product</Link>
                </div>  
                  ):""}
                {this.state.activeApproval?(
                  <div>
                      
                  <p style={{position:"absolute",right:"30px",margin:"20px", color:"dodgerblue"}}>{this.state.listingBrand}</p>
                  <p style={{position:"absolute",right:"30px"}}>Please apply for an approval to sell under this brand.</p>
                <Link class="nxtbtncat" to={{pathname:"/seller/dashboard/brand-approval",search:this.queryStringBrand()}}>Apply for Brand Approval</Link>
                </div>
                ):""}
                 {this.state.activePending?(
                  <div>
                  <p style={{position:"absolute",right:"30px",margin:"20px", color:"dodgerblue"}}>{this.state.listingBrand}</p>
                  <p style={{position:"absolute",right:"30px"}}>Approval Pending for this Brand.</p>
                </div>
                ):""}
                {this.state.activePending || this.state.activeApproval || this.state.activeListing?(
                 null
                ): <div>
                
                <p style={{position:"absolute",right:"30px",color:"dodgerblue"}}>Follows steps for brand Approval</p>
                <p style={{position:"absolute",right:"30px",marginTop:"30px"}}><span style={{fontWeight:"bold"}}>STEP 1: </span>Search Brand availbility for brand approval using check brand</p>
                <p style={{position:"absolute",right:"30px",marginTop:"50px"}}><span style={{fontWeight:"bold"}}>STEP 2: </span>Click on Apply Brand for approval</p>

              </div>}
                </div>
          </div>
          {/* <div className="card">
          Pending  brands for approval from admin listed below :
                  <ul>
                    {this.props.approvedbrand && this.props.approvedbrand.length? this.props.approvedbrand.map(res=>{
                      {
                        return(
                          res.status==="pending"?
                          <li style={{color:"dodgerblue"}}>
                            {res.name}
                          </li>:""
                         
                        )
                        
                      }

                    }):<li style={{color:"dodgerblue"}}>no approved brand </li>}
                  
                  </ul>  
            </div> */}
          </React.Fragment>  
            
        )
    }

}

const mapStateToProps = state => {
  return {
    BrandData: state.sellerAddProduct.BrandDetails,
    approvedbrand: state.sellerAddProduct.approvedbrand,
    isBrandLoading:state.sellerAddProduct.isBrandLoading
  };
};

const mapDispatchToProp = dispatch => {
  return {
    GetBrandNames:(brandName,category) => dispatch(GetBrandNames(brandName,category)),
    BrandApproval:(brandId)=>dispatch(BrandApproval(brandId)),
    ApprovedBrands:(categoryId)=>dispatch(ApprovedBrands(categoryId)),
    generateProductToken:() => dispatch(generateProductToken())
  }
};
export default connect(mapStateToProps, mapDispatchToProp)(ProductBrand);