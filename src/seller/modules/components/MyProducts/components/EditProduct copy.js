import React, { Component, createRef } from "react";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { updateProduct,
         currencyList,
         categoryList,
         countryList,
         stateList,
         cityList,
         attributeList,
         deleteAttributes,
         deleteProductImage
        } from "../sellerAddProductAction";
import "./MyProducts.css";
import axios from 'axios'
import { baseURL } from "../../../../../../credential.json";

class EditProduct extends Component {
  imageButton = createRef();
  state = {
    productName: this.props.editProduct.name,
    categoryId: this.props.editProduct.category['id'],
    productMode: this.props.editProduct.productMode,
    productType: this.props.editProduct.productType,
    originalPrice: this.props.editProduct.originalPrice,
    currency: this.props.editProduct.currency,
    taxRate: this.props.editProduct.taxRate,
    offerType: this.props.editProduct.offerType,
    offerValue: this.props.editProduct.offerValue,
    listingType: this.props.editProduct.listingType,
    status: this.props.editProduct.status,
    promoted: '',
    promotionStartDate:this.props.editProduct.promotionStart.replace(" ","T"),
    promotionEndDate:this.props.editProduct.promotionEnd.replace(" ","T"),
    visibility: this.props.editProduct.visibility?1:0,
    shippingCostType: this.props.editProduct.shippingCostType,
    shippingCost: this.props.editProduct.shippingCost,
    inStock: this.props.editProduct.stock,
    draft: this.props.editProduct.draft?1:0,
    sku: this.props.editProduct.sku,
    shortDescription: this.props.editProduct.shortDescription,
    longDescription: this.props.editProduct.longDescription,
    country: this.props.editProduct.countryId,
    city: this.props.editProduct.cityId,
    state: this.props.editProduct.stateId,
    zipCode: this.props.editProduct.zipCode,
    address: this.props.editProduct.address,
    images: [],
    imgPreviewUrls: this.props.editProduct.images,
    deleteServerImage: [],
    data: {},
    statelist:{
      load:false,
      state:[]
    },
    citylist:{
      load:false,
      city:[]
    },
    attributeslist:{
      load:false,
      data:[]
    },
    attributesvalue:{
      load:false,
      values:[]
    },
    add_modifier: this.props.editProduct.attributes,
    attributes:[],
    attributename:"",
    attributevalue:"",
    attbfromserver:this.props.editProduct.attributes
  };

  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      this.props.currencyList();
      this.props.categoryList();
      this.props.countryList();
      this.props.stateList(parseInt(this.props.editProduct.countryId));
      this.props.cityList(parseInt(this.props.editProduct.stateId));
      this.props.attributeList(parseInt(this.props.editProduct.category['id']))
      console.log("country id sending",this.props)
    }
    // this.setState({data:this.props.editProduct})
    console.log("attributes from server", this.props.editProduct.attributes)
  };

  onChangeCateogryId = async e => {
    console.log("target value",e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
      let categoryId = parseInt(e.target.value)
      let res = await  axios.get(`${baseURL}/seller/categories/${categoryId}/attributes`)
      this.setState({attributeslist: {load: true,data:res.data.data}})
      console.log("attributes loaded",this.state.attributeslist)

    }

    onChangeAttributes = async e => {
      this.setState({
        [e.target.name]: e.target.value
      });
      let attributeId = parseInt(e.target.value)
      let res = await  axios.get(`${baseURL}/seller/attributes/${attributeId}/values`)
     // this.setState({attributes: {Key: e.target.value}})
     this.setState({attributesvalue: {load: true,values:res.data.data}})
      console.log("attributesf",this.state.attributename,this.state.attributes)
    }

    addattributes(arr, key,name) {
      var result = -1;
        const found = arr.some((el,i) => 
        {
        if (el.key === key) {
                  result = i;
                  return true;
              }
        });	
        if (!found) arr.push({ key:key, values: [name] });
        else{
          let foundindex=""
          foundindex= arr[result].values.includes(name)
          if(!foundindex){
         arr.splice(result, 1, {key:key,values:[...arr[result].values,name]});
          }
        
      }
      console.log("index",result)
      return arr;
      }

      addmod(arr, key,name,value_key,value) {
        var result = -1;
          const found = arr.some((el,i) => 
          {
          if (el.key === key) {
                    result = i;
                    return true;
                }
          });	
          if (!found) arr.push({ key:key,name:name, values: [{key:value_key,value:value}] });
          else{
            let foundindex=""
             foundindex= arr[result].values.map((arr)=>arr.value).includes(value)
            console.log("foundindex",foundindex)
            if(!foundindex){
              console.log("not found")
           arr.splice(result, 1, {key:key,name:name,values:[...arr[result].values,{key:value_key,value:value}]});
            }
          
        }
        console.log("index",result)
        return arr;
        }

  modifierSave = (event) => {
      event.preventDefault();
      let selectedIndex = this.refs.modifierName.selectedIndex;
      let attributename = this.refs.modifierName.options[selectedIndex].getAttribute('data-tag')
      let selectedIndex_v = this.refs.modifierValue.selectedIndex;
      let attributevalue = this.refs.modifierValue.options[selectedIndex_v].getAttribute('data-tag')
   //     let attributeName = this.refs.modifierName.getAttribute('data-tag')
      let newModifierName = this.refs.modifierName.value;
      let newModifierValue = this.refs.modifierValue.value;
      if (newModifierName && newModifierValue) {
          this.addModifier(parseInt(newModifierName),attributename,parseInt(newModifierValue), attributevalue);
           let temp = this.addattributes(this.state.attributes, parseInt(newModifierName),parseInt(newModifierValue))
            this.setState({attributes:temp})
         // this.setState({attributes:[...this.state.attributes,{key:parseInt(newModifierName),values:[parseInt(newModifierValue)]}]})
          console.log(this.state.attributes,"save attributes")
          this.refs.modifierForm.reset();
      }
  }


  remove = (arr,deleteindex,key,name="",uniqueId=null) => {
    let arrayobject =arr.filter((item)=>item.key===key)
    let [{values}]= arrayobject
    if(uniqueId)
    {
      this.props.deleteAttributes(uniqueId)
    }
    if(name===""){
      let index = values.indexOf(deleteindex)
       values.splice(index,1)
    }
    else
      values.splice(deleteindex,1)

    console.log("values reamin",values)
    var result = -1;
    const found = arr.some((el,i) => 
    {
    if (el.key === key) {
              result = i;
              return true;
          }
    });	
      // arr.splice(result, 1, {key:searchkey,values:[...arr[result].values.slice(0,deleteindex),...arr[result].values.slice(deleteindex+1,length)]});
      if(values.length>0){
        if(name==="")
      arr.splice(result, 1, {key:key,values:[...values]})
      else
      arr.splice(result, 1, {key:key,name:name,values:[...values]})
    //    arr.splice(result, 1, {key:searchkey,values:[...values]});
      }
      else
        arr.splice(result, 1);

    
  console.log("index",deleteindex)
  return arr;

  }

    removeModifier = (itemIndex,key,attributekey,valuekey,uniqueId) => {
      console.log("remove modifer", itemIndex,key,attributekey,this.state.attributes)
      let arrayobject = this.state.add_modifier.filter((item)=>item.key===attributekey)
      let [{values}]= arrayobject
     let temp =this.remove(this.state.add_modifier,itemIndex,attributekey,key,uniqueId)
      this.setState({ add_modifier: temp });
      console.log("values length",values.length);
      if(this.state.attributes.length>0){
      let temp2 =this.remove(this.state.attributes,valuekey,attributekey)
      this.setState({ attributes: temp2 });
     }
      //alert(itemIndex);
     // console.log("item index",itemIndex);
      // this.state.add_modifier.splice(itemIndex, 1);
      // this.setState({ add_modifier: this.state.add_modifier });
      // this.state.attributes.splice(itemIndex,1)
      // this.setState({attributes:this.state.attributes})
      //
  }
  addModifier = (newModifierName,attributename,newModifierValue, attributevalue) => {
    console.log("key",newModifierName,"name",attributename,"values_key",newModifierValue,"value",attributevalue)
      // console.clear();
      // add_modifier.unshift({
      //     index: add_modifier.length + 1,
      //     value: [modifierItem, modifierValue],
      //     done: false
      // });

     let temp = this.addmod(this.state.add_modifier,newModifierName,attributename,newModifierValue, attributevalue)
      this.setState({ add_modifier: temp });
      
  } 

  activeAttribute = (key,values) => {

    this.setState({activeAttribute:key})
    this.setState({activeValues:values})
  }

  
  
  onChangeList = async  e => {
    console.log("selecting country",typeof(e.target.value),e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
    if(e.target.name==="country"){
      let countryId = parseInt(e.target.value)
      this.props.stateList(countryId);
      this.setState({state:"",city:""})
      // let res = await  axios.get(`${baseURL}/seller/countries/${countryId}/states`)
      //this.setState({statelist: {load: true,state:res.data.data}})

    }
    else {
      let stateId = parseInt(e.target.value)
      this.props.cityList(stateId)
    //  let res = await  axios.get(`${baseURL}/seller/countries/states/${stateId}/cities`)
     // this.setState({citylist: {load: true,city:res.data.data}})

    }
  }

  imageRemoveHandler = (serverid, id) => {
    console.log("deleted image id", id)
      this.props.deleteProductImage(serverid)

    // ,imgfromserver: this.state.imgfromserver.filter(
    //   (img, index) => index !== id
    // )
    this.setState({
      //deleteServerImage: [...this.state.deleteServerImage, serverid],
      images: this.state.images.filter((image, index) => index !== id),
      imgPreviewUrls: this.state.imgPreviewUrls.filter(
        (img, index) => index !== id
      )
    });

  };

  handleAddImage = () => {
    this.imageButton.current.click();
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
     console.log("state of attribute list",this.state.attributes,"add_modifier",this.state.add_modifier)
  };

  handleImageChange = e => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    files.forEach(file => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          images: [...this.state.images, file],
          imgPreviewUrls: [...this.state.imgPreviewUrls, { "url": reader.result }]
        });
      };
      reader.readAsDataURL(file);
    });
    console.log("image preview url", this.state.imgPreviewUrls, "image state", this.state.images);
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    // console.log("form data before",formData);
    // formData.append("files[]", this.state.images);
    // console.log("form data After",formData);
    // console.log(this.state);
    let files = "files[]";
    const productData = {
      productName: this.state.productName,
      originalPrice: parseInt(this.state.originalPrice),
      currency: this.state.currency,
      categoryId: parseInt(this.state.categoryId),
      offerType: parseInt(this.state.offerType),
      offerValue: parseInt(this.state.offerValue),
      taxRate: parseInt(this.state.taxRate),
      productType: this.state.productType,
      listingType: this.state.listingType,
      productMode: this.state.productMode,
      status: parseInt(this.state.status),
      promoted: parseInt(this.state.promoted),
      promotionStart: this.state.promotionStartDate.replace("T", " "),
      promotionEnd: this.state.promotionEndDate.replace("T", " "),
      visibility: parseInt(this.state.visibility),
      shippingCostType: this.state.shippingCostType,
      shippingCost: parseInt(this.state.shippingCost),
      stock: parseInt(this.state.inStock),
      draft: parseInt(this.state.draft),
      sku: this.state.sku,
      shortDescription: this.state.shortDescription,
      longDescription: this.state.longDescription,
      countryId: parseInt(this.state.country),
      stateId: parseInt(this.state.state),
      cityId: parseInt(this.state.city),
      zipCode: parseInt(this.state.zipCode),
      address: this.state.address,
      attributes:JSON.stringify(this.state.attributes)
      //"files[]": this.state.images
    };

    for (const property in productData) {
      console.log("dfsfsdfs", productData[property]);
      formData.append(property, productData[property]);
    }

    this.state.images.map((element) => {
      formData.append("files[]", element, element.name);
    })
    // const element = this.state.images[0];

    console.log("formdata", formData.get("visibility"))
    console.log("product files we sending ", productData.files);
    console.log("sending data", formData)
    //this.props.updateProduct(formData, this.props.editProduct.id, this.state.deleteServerImage);
    this.props.updateProduct(formData, this.props.editProduct.id);
    // this.setState({
    //   productName: "",
    //   originalPrice: "",
    //   currency: "",
    //   productType: "",
    //   offerType: ""
    // });
  };

  render() {
    const { currencies, categories, countries,statelist,cities,attributes, addProductError } = this.props;
    return (
      <div className="card myproductcontainer1">
        <form onSubmit={this.onSubmitHandler}>
          <div className="row">
            <div className="col-sm-4">
              <div style={{padding:'3%',background:'#ff00000d'}}>
              <input className="upload" type="file" accept="image/*" onChange={this.handleImageChange} multiple ref={this.imageButton} style={{ display: "none" }} />
              <div className="row">
              {this.state.imgPreviewUrls.map((imagePreviewUrl, i) => {
                return (  
                    <div className="col-sm-6">
                      <div style={{ display: "flex", flexWrap: "wrap"}} >
                        <div style={{ color: "red", cursor: "pointer",position:'relative',top:'10px',left:'30px' }} onClick={() => this.imageRemoveHandler(imagePreviewUrl['id'], i)} key={imagePreviewUrl['id'] || i}>
                          <i className="fas fa-times-circle" style={{fontSize:"24px"}}></i>
                        </div>                    
                          <img key={i} alt="previewImg" src={imagePreviewUrl['url']} style={{ height: "200px", width: "200px" }} id="previewImg" />  
                      </div>
                    </div>
                
                );
              })}
                  </div>

              {addProductError ?
                (<p style={{ color: "red" }}>{addProductError}</p>)
                :
                null
              }
              <button type="button" className="btn btn-block" style={{width:'100%',background:'#bf0000',boxShadow:'10px 10px 10xp #00000035'}} onClick={this.handleAddImage} >
                Upload Images
              </button>
              </div>
              <br />
            </div>
            <div className="col-sm-8">
              <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="false">
                <div className="card" style={{ border: 'none',padding:'0px 35px'  }}>
                  <div className="card-header" role="tab" id="headingOne1" style={{margin:'6px',borderBottom:'1px solid rgba(0,0,0,.125)',borderRadius:'5px'}}>
                    <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true"
                      aria-controls="collapseOne1">
                      <h3 className="mb-0" style={{ float: 'left' }}>
                        Basic Information
                    </h3>
                    </a>
                  </div>
                  <div id="collapseOne1" className="collapse show" role="tabpanel" aria-labelledby="headingOne1"
                    data-parent="#accordionEx">
                    <div className="card-body" >
                      <div className="col-auto my-1">
                        <label className="mr-sm-1" htmlFor="Productname" style={{ color: "#000" }} >
                          Product Name
                        </label>
                        <input type="text" name="productName" defaultValue={this.state.productName} className="form-control" placeholder="Product Name" onChange={this.onChangeHandler} />
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="currency" style={{ color: "#000" }} >
                              Currency
                             </label>
                            <select className="custom-select mr-sm-2" id="currency" name="currency" value={this.state.currency} onChange={this.onChangeHandler}>
                              <option value="select">Select</option>
                              {currencies.map(currency => {
                                return (
                                  <option key={currency} value={currency}>
                                    {currency}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <br />
                          <div className="col-auto my-1">
                            <label htmlFor="Productmode" style={{ color: "#000" }}>
                              Product Mode:
                            </label>
                            <input type="text" name="productMode" value={this.state.productMode} className="form-control" placeholder="Product Mode " onChange={this.onChangeHandler} />
                          </div>
                          <br />
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="categories" style={{ color: "#000" }} >
                              Categories
                            </label>
                            <select className="custom-select mr-sm-2" id="categories" name="categoryId" value={this.state.categoryId} onChange={this.onChangeCateogryId} >
                              <option value="select">Select</option>
                              {categories.map(category => {
                                return (
                                  <optgroup label={category.name}>
                                    {category.hasInner === true ?
                                      (category.inner.map((option) => {
                                        return (
                                          <>
                                            <option key={option.id} value={option.id} style={{ color: "red" }} disabled>
                                              {option.name}
                                            </option>
                                            {option.hasInner ?
                                              (
                                                option.inner.map((sub) => {
                                                  return (
                                                    <option key={sub.id} value={sub.id}>
                                                      {sub.name}
                                                    </option>
                                                  )
                                                })
                                              )
                                              :
                                              null
                                            }
                                          </>
                                        )
                                      }))
                                      :
                                      <option key={category.id} value={category.id}>{category.name}</option>
                                    }
                                  </optgroup>
                                );
                              })}
                            </select>
                          </div>
                                      <div className="form-group">
                                         <div className="row">
                                             <div className="col-md-6 rightborder">
                                                 <label className="control-label">Attributes</label>
                                                 <div className="">
                                               <table className="table table-condensed tb5">
                                                   <thead>
                                                       <tr>
                                                           <th></th>
                                                           <th>Name</th>
                                                           <th>attributes</th>
                                                       </tr>
                                                   </thead>
                                                   <ModifierList items={this.state.add_modifier} removeModifier={this.removeModifier} activeAttribute={this.activeAttribute}/>
                                               </table>

                                               <div className="modal fade" id="removemodifer" role="dialog">
                                           <div className="modal-dialog">
                                               <div className="modal-content">
                                                   <div className="modal-header">
                                                       <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                       <h4 className="modal-title">Remove Attributes</h4>
                                                   </div>
                                                      <div className="modal-body">
                                                      <form method="" ref="modifierForm" className="form-horizontal">
                                                         <table className="table table-condensed tb5">
                                                             <thead>
                                                                 <tr>
                                                                     <th></th>
                                                                     <th>Name</th>
                                                                     <th>attributes</th>
                                                                 </tr>
                                                             </thead>
                                                             <tbody>
                                                             <RemoveList items={this.state.add_modifier} removeModifier={this.removeModifier} activeAttribute={this.state.activeAttribute} itemsattribute={this.state.attributes} />
                                                             </tbody>
                                                         </table>
                                                         </form>
                                                       </div>
                                               </div>
                                           </div>
                                       </div>

                                       <div>
                                           <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addmodifiernormal">+ Add Attributes</button>
                                           <div className="modal fade" id="addmodifiernormal" role="dialog">
                                               <div className="modal-dialog">
                                                   <div className="modal-content">
                                                       <div className="modal-header">
                                                           <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                           <h4 className="modal-title">Add Attributes</h4>
                                                       </div>
                                                       <form method="" ref="modifierForm" className="form-horizontal">
                                                           <div className="modal-body">
                                                           <div className="col-auto my-1">
                                                                 <label
                                                                   className="mr-sm-2"
                                                                   htmlFor="currency"
                                                                   style={{ color: "#000" }}
                                                                 >
                                                                   Attributes Name
                                                                 </label>
                                                                 <select
                                                                   className="custom-select mr-sm-2"
                                                                   id="attributename"
                                                                   name="attributename"
                                                                   ref="modifierName"
                                                                   //value={this.state.attributename}
                                                                   onChange={this.onChangeAttributes}
                                                                 >
                                                                   <option value="select">Select</option>
                                                                   {console.log("attributes list",attributes)}
                                                                   {this.state.attributeslist.load ?this.state.attributeslist.data.map(attributes => {
                                                                     return (
                                                                       <option key={attributes.id} value={attributes.id} data-tag={attributes.name}>
                                                                         {attributes.name}
                                                                       </option>
                                                                     );
                                                                   }):attributes && attributes.map(attributes =>{
                                                                     return (
                                                                      <option key={attributes.id} value={attributes.id} data-tag={attributes.name}>
                                                                      {attributes.name}
                                                                    </option>
                                                                     )
                                                                   })}
                                                                 </select>
                                                               </div>
                                                               <div className="form-group">
                                                               <div className="col-auto my-1">
                                                                {/*                                                     
                                                                 {this.state.attributesvalue.load?(this.state.attributesvalue.values.map((value,index) => {
                                                                     return (
                                                                        <div className="sizecheckbox">
                                                                 <input type="checkbox" id="attributevalue" name="attributevalue" key={index} value={index}  onChange={this.onChangeHandler} ref="modifierValue"/>
                                                                 <label key={index} for= "attributevalue">{value} </label></div>
                                                                 )
                                                                })):""} */}
                                                                 <select
                                                                   className="custom-select mr-sm-2"
                                                                   id="attributevalue"
                                                                   name="attributevalue"
                                                                   ref="modifierValue"
                                                                 //  value={this.state.attributevalue}
                                                                   onChange={this.onChangeHandler}
                                                                 >
                                                                   <option value="select">Select</option>
                                                                   {this.state.attributesvalue.load?(this.state.attributesvalue.values.map((value,index) => {
                                                                     console.log("values are coming")
                                                                     return (
                                                                       <option key={value.id} value={value.id} data-tag={value.value}>
                                                                         {value.value}
                                                                       </option>
                                                                     );
                                                                   })):""}
                                                                 </select>
                                                               </div>
                                                               </div>
                                                               <div className="form-group">
                                                                   <label className="col-sm-4 control-label"></label>
                                                                   <div className="col-sm-5">
                                                                       <button type="button" onClick={this.modifierSave} className="btn btn-primary btn-sm">Submit</button>
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       </form>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                        </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="col-auto my-1">
                            <label htmlFor="ProductPrice" style={{ color: "#000" }}>
                              Product Price:
                            </label>
                            <input type="text" name="originalPrice" value={this.state.originalPrice} className="form-control" placeholder="Product Price" onChange={this.onChangeHandler} />
                          </div>
                          <br />
                          <div className="col-auto my-1">
                            <label htmlFor="ProductType" style={{ color: "#000" }}>
                              Product Type:
                             </label>
                            <input type="text" name="productType" value={this.state.productType} className="form-control" placeholder="Product Type" onChange={this.onChangeHandler} />
                          </div>
                          <br />
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="visibility" style={{ color: "#000" }} >
                              Visibility
                            </label>
                            <select className="custom-select mr-sm-2" id="visibility" name="visibility" value={this.state.visibility} onChange={this.onChangeHandler}>
                              <option value="select">Select</option>
                              <option value="1">True</option>
                              <option value="0">False</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="col-auto my-1">
                        <label htmlFor="shortDescription" style={{ color: "#000" }}>
                          Short Description:
                        </label>
                        <input type="text" className="form-control" rows="4" id="shortDescription" name="shortDescription" value={this.state.shortDescription} onChange={this.onChangeHandler} />
                      </div>
                      <div className="col-auto my-1">
                        <label htmlFor="longDescription" style={{ color: "#000" }}>
                          Long Description:
                        </label>
                        <textarea className="form-control" rows="4" id="longDescription" name="longDescription" value={this.state.longDescription} onChange={this.onChangeHandler} ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card" style={{ border: 'none',padding:'0px 35px' }}>
                  <div className="card-header" role="tab" id="headingOne2" style={{margin:'6px',borderBottom:'1px solid rgba(0,0,0,.125)',borderRadius:'5px'}}>
                    <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne2" aria-expanded="false"
                      aria-controls="collapseOne2">
                      <h3 className="mb-0" style={{ float: 'left' }}>
                        Product Other Information <i className="fas fa-fa-plus"/>
                      </h3>
                    </a>
                  </div>
                  <div id="collapseOne2" className="collapse" role="tabpanel" aria-labelledby="headingOne2"
                    data-parent="#accordionEx">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="TaxRate" style={{ color: "#000" }} >
                              Tax Rate
                            </label>
                            <input type="text" name="taxRate" value={this.state.taxRate} className="form-control" placeholder="Tax Rate" onChange={this.onChangeHandler} />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="status" style={{ color: "#000" }}>
                              Status
                            </label>
                            <select className="custom-select mr-sm-2" id="status" name="status" value={this.state.status} onChange={this.onChangeHandler} >
                              <option value="select">Select</option>
                              <option value="0">Push</option>
                              <option value="1">Pull</option>
                              <option value="2">Hold</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="promoted" style={{ color: "#000" }} >
                              Promoted
                            </label>
                            <select className="custom-select mr-sm-2" id="promoted" name="promoted" value={this.state.promoted} onChange={this.onChangeHandler} >
                              <option value="select">Select</option>
                              <option value="0">No</option>
                              <option value="1">Yes</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="promotionStartDate" style={{ color: "#000" }} >
                              Promotion Start Date:
                            </label>
                            <input type="datetime-local" id="promotionStartDate" name="promotionStartDate" step="1" value={this.state.promotionStartDate} onChange={this.onChangeHandler} />
                          </div>
                          <br/>
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="promotionStartDate" style={{ color: "#000" }} >
                              Offer Type
                            </label>
                            <select className="custom-select mr-sm-2" id="offerType" name="offerType" value={this.state.offerType} onChange={this.onChangeHandler} >
                              <option value="select">Select</option>
                              <option value="1">flatrate</option>
                              <option value="2">%</option>
                            </select>
                          </div>
                          <br />
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="SKU" style={{ color: "#000" }}>
                              SKU
                            </label>
                            <input type="text" name="sku" value={this.state.sku} className="form-control" placeholder="Sku" onChange={this.onChangeHandler} />
                          </div>
                          <br/>
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="shippingCostType" style={{ color: "#000" }} >
                              Shipping Cost Type
                            </label>
                            <select className="custom-select mr-sm-2" id="shippingCostType" name="shippingCostType" value={this.state.shippingCostType} onChange={this.onChangeHandler} >
                              <option value="select">Select</option>
                              <option value="free">Free</option>
                              <option value="paid">Paid</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="promotionStartDate" style={{ color: "#000" }}>
                              Promotion End Date:
                            </label>
                            <input type="datetime-local" id="promotionEndDate" name="promotionEndDate" step="1" value={this.state.promotionEndDate} onChange={this.onChangeHandler} />
                          </div>
                          <br/>
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="promotionStartDate" style={{ color: "#000" }}>
                              Offer Value
                            </label>
                            <input type="text" name="offerValue" value={this.state.offerValue} className="form-control" placeholder="Offer Value" onChange={this.onChangeHandler} />
                          </div>
                          <br/>
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="Items" style={{ color: "#000" }}>
                              Items in Stock
                            </label>
                            <input type="text" name="inStock" value={this.state.inStock} className="form-control" placeholder="Item in Stock" onChange={this.onChangeHandler} />
                          </div>
                          <br/>                                       
                          <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="shippingCost" style={{ color: "#000" }}>
                              Shipping Cost
                            </label>
                            <input type="text" name="shippingCost" value={this.state.shippingCost} className="form-control" placeholder="Shipping Cost" onChange={this.onChangeHandler} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                      <div className="col-sm-12">
                        <br/>
                        <div className="col-auto my-1">
                          <label className="mr-sm-2" htmlFor="listingType" style={{ color: "#000" }} >
                            Listing Type
                          </label>
                          <select className="custom-select mr-sm-2" id="listingType" name="listingType" value={this.state.listingType} onChange={this.onChangeHandler} >
                            <option value="select">Select</option>
                            <option value="all">All</option>
                            <option value="specific">Specific</option>
                          </select>
                        </div>
                        <br/>        
                        <div className="col-auto my-1">
                          <label className="mr-sm-2" htmlFor="draft" style={{ color: "#000" }} >
                            Draft
                          </label>
                          <select className="custom-select mr-sm-2" id="draft" name="draft" value={this.state.draft} onChange={this.onChangeHandler} >
                            <option value="select">Select</option>
                            <option value="1">True</option>
                            <option value="0">False</option>
                          </select>
                        </div> 
                        <br/>
                        <div className="col-auto my-1">
                          <label
                            className="mr-sm-2"
                            htmlFor="currency"
                            style={{ color: "#000" }}
                          >
                            Country
                          </label>
                          <select
                            className="custom-select mr-sm-2"
                            id="country"
                            name="country"
                            value={this.state.country}
                            onChange={this.onChangeList}
                          >
                            <option value="select">Select</option>
                            {countries.map(country => {
                              return (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {console.log("state list are",statelist,cities)}
                        <div className="col-auto my-1">
                          <label
                            className="mr-sm-2"
                            htmlFor="currency"
                            style={{ color: "#000" }}
                          >
                            State
                          </label>
                          <select
                            className="custom-select mr-sm-2"
                            id="state"
                            name="state"
                            value={this.state.state}
                            onChange={this.onChangeList}
                          >
                            <option value="select">Select</option>
                            {statelist?statelist.map(state => {
                              return (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              );
                            }):""}
                          </select>
                        </div>
                        <div className="col-auto my-1">
                          <label
                            className="mr-sm-2"
                            htmlFor="currency"
                            style={{ color: "#000" }}
                          >
                            City
                          </label>
                          <select
                            className="custom-select mr-sm-2"
                            id="city"
                            name="city"
                            value={this.state.city}
                            onChange={this.onChangeHandler}
                          >
                            <option value="select">Select</option>
                            {cities?cities.map(city => {
                              return (
                                <option key={city.id} value={city.id}>
                                  {city.name}
                                </option>
                              );
                            }):""}
                          </select>
                        </div>
                        <div className="col-auto my-1">
                          <input type="text" name="zipCode" value={this.state.zipCode} className="form-control" placeholder="zipcode" onChange={this.onChangeHandler} />
                        </div>
                        <div className="col-auto my-1">
                          <input type="text" name="address" value={this.state.address} className="form-control" placeholder="address" onChange={this.onChangeHandler} />
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input type="submit" value="Update Product" style={{width:'20%',marginTop:'3%',background:'#bf0000'}} className="btn btn-block" />
          </div>
        </form>
      </div>
    );
  }
}



class ModifierList extends Component {
  render() {
    console.log("current modifer" ,this.props.items)
      var items = this.props.items.map((item, index) => {
          return (
              <ModifierListItem key={item} item={item} index={index} removeModifier={this.props.removeModifier} activeAttribute={this.props.activeAttribute} />
          );
      });
      return (
          <tbody>{items}</tbody>
      );
  }
}

class ModifierListItem extends Component {
  constructor(props) {
      super(props);
      // this.onModifierClose = this.onModifierClose.bind(this);
  }
  // onModifierClose() {
  //     var index = parseInt(this.props.index);
  //     this.props.removeModifier(index);
  // }
  onactiveAttribute = (key) => {
    this.props.activeAttribute(key);
  }
  render() {
      return (
          <tr key={this.props.item.index}>
              <td>{/*<input type="checkbox" name="normal-modifier" value={this.props.item.index} onChange={this.onChange} />*/}</td>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.values.map((value,index)=>(index ? ', ' : '') + value['value'])}</td>
              {/* {this.props.item.values.map((modval) =>
                  <td>{modval}</td>
              )} */}
              {/* <td><i className="fa fa-close closesection" onClick={this.onModifierClose}></i></td> */}
              <td><span data-toggle="modal" data-target="#removemodifer" className="btn btn-primary btn-sm"  onClick={() => this.onactiveAttribute(this.props.item.name)}>View more</span></td>
          </tr>
      );
  }
}


class RemoveList extends Component {

  onModifierClose = (index,key,attributekey,valuekey,uniqueId) => {
    //var index = parseInt(index);
    this.props.removeModifier(index,key,attributekey,valuekey,uniqueId);
}
  
render() {
  console.log("remove attribute",this.props.items)
  console.log("props list ",this.props.items.filter((item)=>item.name===this.props.activeAttribute),this.props.activeAttribute,this.props.activeValues);
  return (
    this.props.items.filter((item)=>item.name===this.props.activeAttribute).map((item,index) =>{

      return (
        <>
        {item.values.map((value,index) =>{
          return(
        <tr key={index}>
              <td>{/*<input type="checkbox" name="normal-modifier" value={this.props.item.index} onChange={this.onChange} />*/}</td>
              <td>{item.name}</td>
          <td>{value.value}</td>
              <td><i className="fa fa-close closesection" onClick={() => this.onModifierClose(index,item.name,item.key,value.key,value.uniqueId)}></i></td>
       </tr>
          )}
       )}
        </>


      )
    })
  )

}

}


const mapStateToProps = state => {
  return {
    addProductError: state.sellerAddProduct.addProductError,
    currencies: state.sellerAddProduct.currencies,
    categories: state.sellerAddProduct.categories,
    countries: state.sellerAddProduct.countries,
    statelist: state.sellerAddProduct.statelist,
    cities: state.sellerAddProduct.cities,
    attributes: state.sellerAddProduct.attributes
  };
};

const mapDispatchToProp = dispatch => {
  return {
    updateProduct: (productData, slug) => dispatch(updateProduct(productData, slug)),
    currencyList: () => dispatch(currencyList()),
    categoryList: () => dispatch(categoryList()),
    countryList: () => dispatch(countryList()),
    stateList: (countryId) => dispatch(stateList(countryId)),
    cityList: (stateId) => dispatch(cityList(stateId)),
    attributeList: (categoryId) => dispatch(attributeList(categoryId)),
    deleteAttributes: (id) =>dispatch(deleteAttributes(id)),
    deleteProductImage:(id) => dispatch(deleteProductImage(id))

  };
};

export default connect(mapStateToProps, mapDispatchToProp)(EditProduct);
