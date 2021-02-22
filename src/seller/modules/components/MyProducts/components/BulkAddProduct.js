import React, { Component,createRef } from "react";
import { Link } from "react-router-dom";
import qs from "query-string";
import axios from 'axios'
import { baseURL } from "../../../../../credential.json";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
class BulkAddProduct extends Component {
  constructor(props){
    super(props)

    this.state = {
      catalog:"",
      categoryId:"",
      brandId:"",
      uploadtext:"Upload File",
      uploaddisabled:false
    }
  }

  bulkfile = createRef();

  handleAddFile = () => {
    this.bulkfile.current.click();
  };

  handleFileChange = (e) => {
    e.preventDefault();
    console.log("logo ulpoad", e.target.files);
    this.setState({
      [e.target.name]: e.target.files[0],
    },);
    console.log("curent target",e.target.name, [e.target.files[0]]);
    this.uploadTemplate(e.target.files[0])
    }

  downloadTemplate = (e) => {
    //e.preventdefault();
    let token = localStorage.getItem("token");
    
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      params:{
        categoryId:this.state.categoryId,
        brandId:this.state.brandId

      },
      responseType: 'blob'
    };
    axios.get(`${baseURL}/seller/bulk`,config)
    .then(res =>{
      console.log("excel file response",res)
      const url = window.URL.createObjectURL(new Blob([res.data],{type: 'application/vnd.ms-excel'}));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'template.xls'); //or any other extension
      document.body.appendChild(link);
      link.click();
      if(res.status===200)
      {
        ToastsStore.success("downloaded succesfully");
        console.log("toast working succesfully")
      }

    })

  }


  uploadTemplate = (catalog) => {
    //e.preventdefault();
    console.log("calling uload template",catalog)
    let token = localStorage.getItem("token");
    
    let config = {
      headers: {
        Authorization: "Bearer " + token
      },
      responseType: 'blob'
    };

    let data = {
      catalog,
      categoryId:this.state.categoryId,
      brandId:this.state.brandId
    }
    let fd = new FormData();
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
    this.setState({uploadtext:"Uploading...",uploaddisabled:true})
    objectToFormData(data);
    axios.post(`${baseURL}/seller/bulk`,fd,config)
    .then(res =>{
      console.log("excel file response",res)
      if(res.status===200)
      {
        ToastsStore.success("Uploaded succesfully");
        this.setState({uploadtext:"Upload File",uploaddisabled:false})
      }
     
    })
    .catch(err =>{
      ToastsStore.error("Somthing went wrong");
      this.setState({uploadtext:"Upload File",uploaddisabled:false})
    }

    )

  }

  componentDidMount(){
    const queryString = qs.parse(this.props.location.search);
    this.setState({brandId:queryString.brand,categoryId:queryString.category})
    }
  render() {
    return (
      <>
       <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
      <div className="container-fluid" style={{ marginTop: "6%" }}>
        <div>
          <h3>Add Product in Bulk</h3>
        </div>
        <hr />
        <div className="categorycontainer myprocontainer" >
          <div className="w-50 align-items-center" style={{textAlign:"center"}}>
            <div>Enter your details of product in Template</div>
            <div>Downlaod updated template</div>
            <div>
              <button className="btn btn-primary" onClick={this.downloadTemplate}>Download Template</button>
            </div>
          </div>
          <div className="w-50" style={{textAlign:"center"}}>
            <div>Enter your details of product in Template</div>
            <div>Upload updated template</div>
            <div>
            <input
                      type="file"
                      accept="application/vnd.ms-excel"
                      name="catalog"
                      className="form-control"
                      onChange={this.handleFileChange}
                      ref={this.bulkfile}
                      style={{display:'none'}}
                    />
              <button className="btn btn-primary" onClick={this.handleAddFile} disabled={this.state.uploaddisabled}>{this.state.uploadtext}</button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}



export default BulkAddProduct;