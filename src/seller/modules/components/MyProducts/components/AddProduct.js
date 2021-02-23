import React, { Component, createRef, StrictMode } from "react";
import { connect } from "react-redux";
import Modal from 'react-modal';
import { addProduct, currencyList, categoryList, getAttribute,hsnList,clearError } from "../sellerAddProductAction";
import "./MyProducts.css";
import $ from 'jquery';
//import Toast from 'react-bootstrap/Toast'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import qs from 'query-string';
import {Link} from 'react-router-dom'

class AddProduct extends Component {
  imageButton = createRef();
  constructor(props) {
    super(props);
    this.state = {
      variantButton:true,
      disableButton:true,
      type:"simple",
      categoryId: "",
      brandId:"",
      count:1,
      name: "",
      originalPrice: "",
      listingStatus: "",
      styleCode:"",
      draft: "",
      sku: "",
      country: "",
      city: "",
      state: "",
      zipCode: "",
      address: "",
      images: [],
      imgPreviewUrls: [],
      originalPrice: '',
      sellingPrice: '',
      hsn: '',
      lowStockThreshold:'',
      taxCode: '',
      fulfillmentBy: '',
      stock: '',
      setIsOpen: '',
      procurementSla: '',
      localShippingCost: '',
      zonalShippingCost: '',
      internationalShippingCost: '',
      packageWeight: '',
      packageLength: '',
      packageBreadth: '',
      packageHeight: '',
      domesticWarranty: '',
      internationalWarranty: '',
      warrantySummary: '',
      warrantyServiceType: '',
      coveredInWarranty: '',
      notCoveredInWarranty: '',
      idealFor: '',
      trailer: '',
      maxQuantityPerOrder:'',
      description: '',
      longDescription: '',
      AttributeValue: [],
      AttributesData: [],
      ValueCount: 0,
      primaryImageIndex:1,
      attributes:[],
      setIsOpen1: false,
      setIsOpen2: false,
      setIsOpen2: false,
      setOpenHSN:false,
      setIsOpenImage:false,
      setOpenVariant:false,
      onSubmitactive:false,
      payload:[],
      attributesFilled:[],
      imageCount:5,
      mainImage:[],
      errors:{},
      part1noError:false,
      part2noError:false,
      showToast:false,
      variant:[],
      openSelectVariant:false,
      selectedVariantItem:{},
      productNameArray:[],
      openModalVariant:false

      

    }
    this.openModal = this.openModal.bind(this);
    this.openModal1 = this.openModal1.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.openModal3 = this.openModal3.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addMoreattr = this.addMoreattr.bind(this);
    this.AttributeAddValue = this.AttributeAddValue.bind(this)
  }

  validate = () => {
    const errors = {}
      if(this.state.name.trim()==='')
        errors.name = 'Product name is required';
      if(this.state.originalPrice.trim()==='')
        errors.originalPrice = 'MRP is required';
      if(this.state.sellingPrice==='')
        errors.sellingPrice = 'selling price is required';
        else if(parseInt(this.state.sellingPrice)>parseInt(this.state.originalPrice))
        errors.sellingPrice = 'Selling price should be less than or equal to MRP'
        if(this.state.hsn==='' ||!this.props.hsnDetail.includes(parseInt(this.state.hsn)))
        errors.hsn = 'Please enter relevent HSN';
      if(this.state.listingStatus.trim()==='')
        errors.listingStatus = 'listing status is required';
      
       if(parseInt(this.state.lowStockThreshold)>=parseInt(this.state.stock) && parseInt(this.state.stock) !==0)
        errors.lowStockThreshold = `low Stock should be less then ${this.state.stock} and greater than 0`;
        if(parseInt(this.state.lowStockThreshold)>parseInt(this.state.stock) && parseInt(this.state.stock) ===0)
        errors.lowStockThreshold = `low Stock should be greater than or equal to 0`;
        if(this.state.fulfillmentBy.trim()==='')
        errors.fulfillmentBy = 'fullfillmentby is required';
      if(this.state.sku.trim()==='')
        errors.sku = 'SKU is required';
      if(this.state.stock.trim()==='')
        errors.stock = 'stock is required';
        if(this.state.procurementSla==='')
        errors.procurementSla = 'procurementSla is Required';
          else if(parseInt(this.state.procurementSla)>2)
          errors.procurementSla = 'procurementSla may not be greater than 2';
      if(parseInt(this.state.maxQuantityPerOrder)>parseInt(this.state.stock) && parseInt(this.state.stock)!==0)
        errors.maxQuantityPerOrder =  `max qty per order should be less than or equal to ${this.state.stock}`;
      else  if(parseInt(this.state.maxQuantityPerOrder)>parseInt(this.state.stock) && parseInt(this.state.stock)===0)
        errors.maxQuantityPerOrder =  `max qty per order should be greater or equal to ${this.state.stock}`;  
      if(this.state.localShippingCost.trim()==='')
        errors.localShippingCost = 'local delivery charge is required';
        if(this.state.zonalShippingCost.trim()==='')
        errors.zonalShippingCost = 'zonal delivery charge is required';
      if(this.state.internationalShippingCost.trim()==='')
        errors.internationalShippingCost = 'international delivery charge is required';
      if(this.state.packageBreadth.trim()==='')
        errors.packageBreadth = 'package breadth is required';
        if(this.state.packageHeight.trim()==='')
        errors.packageHeight = 'package Height is required';
      if(this.state.packageLength.trim()==='')
        errors.packageLength = 'package length is required';
      if(this.state.packageWeight.trim()==='')
        errors.packageWeight = 'package weight is required';

      let psCount = Object.keys(errors).length;

      if(this.state.styleCode.trim()==='')
        errors.styleCode = 'styleCode is required';

      // else if(this.state.styleCode.trim().length<8)
      //   errors.styleCode = 'styleCode must be at least 8 character long';
      if(this.state.attributes.length===0 || this.state.attributes.length!==this.props.AttributesDetails.length)
        errors.attributes = 'All attriutes are required';
        let ps2Count =Object.keys(errors).length-psCount;
      if(this.state.images.length===0)
        errors.images = 'images is required';          
        let count = Object.keys(errors).length
        
          errors.total=`total errors ${count}`
          errors.count=count
          if(psCount===0)
            {
              this.setState({part1noError:true});
            }
            else
            this.setState({part1noError:false});
          if(psCount)  
          errors.psCount=psCount
          if(ps2Count){
            errors.ps2Count=ps2Count;
            this.setState({part2noError:false});
          }
            else
            this.setState({part2noError:true});
      if(errors)
      this.setState({disableButton:true})
      
      return count===0?null:errors
    }
  
    static getDerivedStateFromProps(nextProps, prevState) {
      console.log("next props", nextProps);
      if (nextProps.addProductError && nextProps.addProductError.status === 201) {
        return {
          variantButton:false
        };
      } else return null;
    }
    
  componentDidMount = () => {
    let query = qs.parse(this.props.location.search)
    console.log("parsed ",typeof(query.category));
    this.props.getAttribute(query.category);
    this.props.hsnList();
    // let narray =[`${query.brandName}`,`${query.vertical}`,`${query.subcatgory}`]
    this.setState({categoryId:query.category,brandId:query.brand})
  };

  imageRemoveHandler = id => {
      let imageIndex;
      if(id<=parseInt(this.state.primaryImageIndex)-1 && parseInt(this.state.primaryImageIndex)!=1)
      {
        imageIndex=parseInt(this.state.primaryImageIndex)-1
        this.setState({primaryImageIndex:imageIndex})
      }
    this.setState({
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
   console.log("state are",this.state)
  };

  handleVideoChange = e => {
    e.preventDefault();
    let name= e.target.name;
    let file = e.target.files[0]
    let video=[];
    let reader = new FileReader();
    reader.onload = () => {
      video.push(reader.result)
    }
    // reader.onloadend = () => {
    //   this.setState({
    //     [e.target.name]: file
    //   });
    // }
    reader.readAsDataURL(file);
    this.setState({
      [name]: e.target.files[0]
    })
    console.log("vido target files",e.target.name)
  //   this.setState({
  //     [e.target.name]: e.target.files[0]
  // });


 }

  handleImageChange = e => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    files.forEach(file => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          images: [...this.state.images, file],
          imgPreviewUrls: [...this.state.imgPreviewUrls, reader.result],
        });
      };
      reader.readAsDataURL(file);
    });

    console.log("current state",this.state);
  };

  onSubmitHandler = e => {
    if(e)
    e.preventDefault();

    const fd = new FormData();
    let files = "files[]";
    this.setState({onSubmitactive:true,disableButton:true})
    this.props.clearError();
    const payload = {
      name: this.state.name,
      listingStatus:this.state.listingStatus,
      idealFor:this.state.idealFor?this.state.idealFor:null,
      styleCode:this.state.styleCode,
      originalPrice: parseInt(this.state.originalPrice),
      sellingPrice: parseInt(this.state.sellingPrice),
      fulfillmentBy: this.state.fulfillmentBy,
      hsn: parseInt(this.state.hsn),
      stock: parseInt(this.state.stock),
      lowStockThreshold:parseInt(this.state.lowStockThreshold),
      sku: this.state.sku,
      procurementSla: parseInt(this.state.procurementSla),
     localShippingCost: parseInt(this.state.localShippingCost),
    zonalShippingCost: parseInt(this.state.zonalShippingCost),
    internationalShippingCost: parseInt(this.state.internationalShippingCost),
    packageWeight: parseInt(this.state.packageWeight),
    packageLength: parseInt(this.state.packageLength),
    packageBreadth: parseInt(this.state.packageBreadth),
    packageHeight: parseInt(this.state.packageHeight),
    domesticWarranty:this.state.domesticWarranty?parseInt(this.state.domesticWarranty):null,
    internationalWarranty: this.state.internationalWarranty?parseInt(this.state.internationalWarranty):null,
    warrantySummary:this.state.warrantySummary?this.state.warrantySummary:null,
    warrantyServiceType: this.state.WarrantyServiceType?this.state.warrantyServiceType:null,
    coveredInWarranty:this.state.coveredInWarranty?this.state.coveredInWarranty:null,
    notCoveredInWarranty: this.state.notCoveredInWarranty?this.state.notCoveredInWarranty:null,
    maxQuantityPerOrder:parseInt(this.state.maxQuantityPerOrder),
    primaryImageIndex:parseInt(this.state.primaryImageIndex)-1,
    attributes:this.state.attributes,
    files: this.state.images
    }

    let productData;
     productData = {
      
      categoryId:parseInt( this.state.categoryId),
      brandId:parseInt(this.state.brandId),
      currency:"INR",
      description: this.state.description?this.state.description:null,
      trailer:this.state.trailer?this.state.trailer:null,
      count:this.state.count,
      payload:payload

    };




   

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

    objectToFormData(productData);
    this.props.addProduct(fd);
    console.log("data submission",fd);
  };

  openModal(key) {
    this.setState({ setIsOpen: key })
  }

  addVariant= (arr, id,value,index) => {
    console.log("add",id,value)
    var result = -1;
      const found = arr.some((el,i) => 
      {
      if (el.id === id) {
                result = i;
                return true;
            }
      });
      if (!found){
        arr.push({ id:id, value: [value] });
      }
      else{
        let foundindex=""
       // foundindex= arr[result].value.includes(value)
       if(index){
       arr[result].value[index]=value
      //  if(!foundindex){
      // arr.splice(result, 1, {key:key,value:[...arr[result].value,value]});
      arr.splice(result, 1, {id:id,value:[...arr[result].value]});
       }
       else {
        arr.splice(result, 1, {id:id,value:value});
       }
      //  }
      
    }
    return arr;
    }

  add(arr, key,value,index) {
    console.log("add",key,value)
    var result = -1;
      const found = arr.some((el,i) => 
      {
      if (el.key === key) {
                result = i;
                return true;
            }
      });
      if (!found){
        arr.push({ key:key, value: [value] });
      }
      else{
        let foundindex=""
       // foundindex= arr[result].value.includes(value)
       if(index){
       arr[result].value[index]=value
      //  if(!foundindex){
      // arr.splice(result, 1, {key:key,value:[...arr[result].value,value]});
      arr.splice(result, 1, {key:key,value:[...arr[result].value]});
       }
       else {
        arr.splice(result, 1, {key:key,value:value});
       }
      //  }
      
    }
    return arr;
    }

  AttributeAddValue = (e,key,createVariant) => {
    let value = e.target.value;
    console.log(this.state.AttributeValue)
    if(e.target.type!=="text"){
    let selectedIndex = this.refs.modifierValue.selectedIndex;
   // let key = e.target.getAttribute('data-tag')
    let index = this.refs.modifierValue.options[selectedIndex].getAttribute('data-tag2')
    console.log("selected index",selectedIndex,"key",key,"value",e.target.value,"index of select",index)
    let res = this.add(this.state.attributes,key,e.target.value,e.target.name[0])
    this.setState({attributes:res,[e.target.name]:e.target.value})
    if(createVariant)
    {
      let resCreate=this.addVariant(this.state.variant,key,e.target.value,e.target.name[0])
      this.setState({variant:resCreate})
    }
    
    if(this.state.attributesFilled.includes(e.target.name)===false)
    this.state.attributesFilled.push(e.target.name);
    
    }
    else
    {
    let res = this.add(this.state.attributes,key,e.target.value)
    this.setState({attributes:res,[e.target.name]:e.target.value})
    if(createVariant)
    {
      let resCreate3=this.addVariant(this.state.variant,key,e.target.value,e.target.name[0])
      this.setState({variant:resCreate3})
    }
    
    if(this.state.attributesFilled.includes(e.target.name)===false)
    this.state.attributesFilled.push(e.target.name);
    }
    
    console.log("current state",this.state)
  }
  closeModal(e) {
    if(e)
    e.preventDefault();

    this.setState({ setIsOpen1: false,setIsOpen2: false,setIsOpen3: false,setOpenVariant:false,setIsOpenImage:false})
  }
  closeModalinner(){
    this.setState({ setIsOpen: null })
  }

  afterOpenModal =() => {
    $(".ReactModal__Content ReactModal__Content--after-open").scrollTop();
  }

  openModal1() {
    this.setState({ setIsOpen1: true })

  }

  openModal2() {
    this.setState({ setIsOpen2: true })

  }

  openModal3() {
    this.setState({ setIsOpen3: true })

  }

  openImageModal = () => {
    this.setState({setIsOpenImage:true})
  }

  openModalSection = (e,modal) =>{
      e.preventDefault();
    console.log("modal",modal);
    this.setState({ setOpenHSN: true })
  }

  closeModalHSN = () => {
    this.setState({ setOpenHSN: false })
  }

  closeModalSelectVariant = () => {
    this.setState({openSelectVariant:false})
  }

  selectHSN = (e,item) => {
    e.preventDefault();
    this.setState({ setOpenHSN: false,hsn:item })
  }

  addMoreattr() {
    let num = parseInt(this.state.ValueCount) + 1
    console.log(num);
    this.setState({ ValueCount: num })
  }
  saveData = (e) =>{
    if(e){
      e.preventDefault();
      }
    const errors = this.validate();
    console.log("errors are",errors);
    this.setState({errors:errors || {},showToast:true,disableButton:true});
    this.closeModal();
    ToastsStore.success("Changes saved succesfully");
    if(errors)
    {
      
    return;
    }

   let {name,listingStatus,originalPrice,sellingPrice,fulfillmentBy,procurementSla,packageWeight,packageLength,packageBreadth,packageHeight,hsn,stock ,sku,attributes,styleCode,images,}=this.state;
    if(name && listingStatus && attributes && fulfillmentBy && procurementSla && packageWeight && packageLength && packageBreadth && packageHeight && stock  && styleCode && originalPrice && sellingPrice && sku && hsn && images)
      this.setState({disableButton:false})
  }

  openVariant = () => {
    this.setState({ setOpenVariant: true })
  }

  openvariantDialog = () => {
    this.setState({openModalVariant:true})

  }

  variantDialog = (type) =>{
    this.createVariant(type);
    this.setState({openModalVariant:false})

  }

  createVariant = (type) => {
    this.props.clearError();
    if(type==="skip"){
      this.setState({
        variantButton:true,
        disableButton:true,
        onSubmitactive:false,
        type:"variant",
        listingStatus:"",
        idealFor:"",
        originalPrice:"",
        listingStatus: "",
        draft: "",
        sku: "",
        images: [],
        imgPreviewUrls: [],
        sellingPrice: '',
        lowStockThreshold:'',
        fulfillmentBy: '',
        stock: '',
        setIsOpen: '',
        procurementSla: '',
        localShippingCost: '',
        zonalShippingCost: '',
        internationalShippingCost: '',
        packageWeight: '',
         packageLength: '',
         packageBreadth: '',
        packageHeight: '',
        domesticWarranty: '',
        internationalWarranty: '',
         warrantySummary: '',
        warrantyServiceType: '',
        coveredInWarranty: '',
        notCoveredInWarranty: '',
        idealFor: '',
        trailer: '',
        attributes:[],
        maxQuantityPerOrder:'',
        AttributeValue: [],
        AttributesData: [],
        ValueCount: 0,
        primaryImageIndex:1,
        part2noError:false,
        part1noError:false,
        count:this.state.count+1
      },() => {
        this.saveData();
    })
    }
    else {
      this.setState({
        variantButton:true,
        disableButton:true,
        onSubmitactive:false,
        type:"variant",
        listingStatus:"",
        idealFor:"",
        originalPrice:"",
        listingStatus: "",
        draft: "",
        sku: "",
        sellingPrice: '',
        lowStockThreshold:'',
        fulfillmentBy: '',
        stock: '',
        setIsOpen: '',
        procurementSla: '',
        localShippingCost: '',
        zonalShippingCost: '',
        internationalShippingCost: '',
        packageWeight: '',
         packageLength: '',
         packageBreadth: '',
        packageHeight: '',
        domesticWarranty: '',
        internationalWarranty: '',
         warrantySummary: '',
        warrantyServiceType: '',
        coveredInWarranty: '',
        notCoveredInWarranty: '',
        idealFor: '',
        trailer: '',
        attributes:[],
        maxQuantityPerOrder:'',
        AttributeValue: [],
        AttributesData: [],
        ValueCount: 0,
        part2noError:false,
        part1noError:false,
        count:this.state.count+1
      },() => {
        this.saveData();
    })
    }
      
      this.state.attributesFilled.map((item)=>{delete this.state[item]})

    
      //images: this.state.images

  }
    _renderVarient = (item,array) => {
      console.log("attributes array",array)
      const [res] = array.filter((data)=>data.id===item.key)
      console.log("res of attriutes",res);
      let data=""
      let result =   res.value.map((finddata,index)=>{
        data+=index?`& ${finddata}`:finddata
        })
        return data;
        
    }

    createNewVariant = (item) =>{
      this.setState({openSelectVariant:true,selectedVariantItem:item})
    }
    createProductVariant = (e) => {
      e.preventDefault();
      this.saveData();
    }

    componentWillUnmount(){
      this.props.clearError();
    }

    componentWillReceiveProps(){
      
    }

  render() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };
    const customStyles2 = {
      content: {
        width:'60vw',
        top: '50%',
        left: '55%',
        right: 'auto',
        bottom: 'auto',
        height:"-webkit-fill-available",
        margin: '2% 0 5% 0',
        padding:'20px',
        transform: 'translate(-50%, -50%)'
      }
    };

    const customStyles3 = {
      content: {
        width:'35vw',
        top: '40%',
        left: '55%',
        right: 'auto',
        bottom: 'auto',
        height:"auto",
        margin: '2% 0 5% 0',
        padding:'20px',
        transform: 'translate(-50%, -50%)'
      }
    };

    const customStylesHsn = {
      content: {
        width:'30vw',
        top: '50%',
        left: '75%',
        right: 'auto',
        bottom: 'auto',
        height:"-webkit-fill-available",
        margin: '2% 0 5% 0',
        padding:'20px',
        transform: 'translate(-50%, -50%)',
        zIndex:10
      }
    }
    const StylesImgDialog = {
      content: {
        width:'30vw',
        top: '50%',
        left: '55%',
        right: 'auto',
        bottom: 'auto',
        margin: '2% 0 5% 0',
        padding:'20px',
        transform: 'translate(-50%, -50%)',
        zIndex:10
      }
    }
    const { addProductError, AttributesDetails } = this.props;
    const {errors} =this.state;
    return (
      <div className="card myproductcontainer1" style={{ marginTop: '6%', padding: '0', border: '1px solid lightgrey', borderRadius: '8px' }}>
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        <div style={{ background: '#00000008', padding: '10px' }}><h4 style={{ fontWeight: '500', fontSize: '20px' }}>Add Product</h4></div>
        <div style={{ margin: '10px 15px', paddingTop: '8px', border: '1px solid #00000030', borderRadius: '5px' }}>
          <center><h4 style={{ fontWeight: '500', color: '#bf0000' }}>Product Details</h4></center>
          <hr/>
          <form onSubmit={this.onSubmitHandler} style={{ padding: '2px 25px' }}>
            <div className="row spacing">
              <div className="col-auto colwidth50" style={{ background: '#efefef', padding: "20px"}}>
                <label className="mr-sm-2" htmlFor="status" style={{ color: "#000" }}>
                  Product Photo {errors.images && <span className="alert alert-danger col-auto colwidth100">{errors.images}</span>}
                </label>
                <input className="upload" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp" onChange={this.handleImageChange} multiple ref={this.imageButton} style={{ display: "none" }} max-upload="5"/>
                <center>
                  <div className="col">
                  <img src='https://static.thenounproject.com/png/187803-200.png' onClick={this.openImageModal} style={{ width: '100px',cursor:"pointer" }} />
                  </div>
                  {this.state.imgPreviewUrls.slice(parseInt(this.state.primaryImageIndex)-1,parseInt(this.state.primaryImageIndex)).map((imagePreviewUrl, i) => {
                  return (
                    <div key={`imgPreviewUrlswer${i}`} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
                      <img key={i} alt="previewImg" src={imagePreviewUrl} style={{ height: "200px", width: "200px" }} id="previewImg" />
                    </div>
                  );
                })}
                </center>
                <Modal
             isOpen={this.state.setIsOpenImage}
             onRequestClose={this.closeModal}
             ariaHideApp={false}
             style={customStyles3
             }>
                <center>
                  <h3>Upload Picture(s)</h3>
                  <hr/>
                  <img src='https://static.thenounproject.com/png/187803-200.png' onClick={this.handleAddImage} style={{ width: '100px',cursor:"pointer"}} />
                </center>
                {this.state.imgPreviewUrls.map((imagePreviewUrl, i) => {
                  return (
                    <div key={`imgPreviewUrls${i}`} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
                      <div style={{ color: "red", cursor: "pointer" }} onClick={() => this.imageRemoveHandler(i)} key={i} >
                        <i className="fas fa-times-circle" style={{ fontSize: "24px" }}></i>
                      </div>
                      <img key={i} alt="previewImg" src={imagePreviewUrl} style={{ height: "200px", width: "200px" }} id="previewImg" />
                      <input type="radio" name="primaryImageIndex" value={i+1} onChange={this.onChangeHandler} checked={parseInt(this.state.primaryImageIndex) === i+1} />
                    </div>
                  );
                })}
                <center style={{marginTop:"40px"}}>
               <Link className="btn btn-primary" onClick={this.saveData}>Save & Close</Link>
               <Link className="btn btn-primary" onClick={this.closeModal} style={{marginLeft:"10px"}}>Close</Link>
               </center>
               </Modal>
              </div>
              <div className="col-auto " style={{ width: "50%" }}>
                <div className="row spacing">
                  <div className="col-auto colwidth100">
                  {errors.total && <div className="alert alert-danger col-auto colwidth100">{errors.total}</div>}
                    <div className="row innerboxmodal" onClick={this.openModal1}>
                      <div className="col-auto colwidth100">
                        <label className="mr-sm-2" htmlFor="status" style={{ color: "#000" }}>
              <span>{errors.psCount>0?<i className="fa fa-lg fa-exclamation-circle" style={{color:"red"}}></i>:null}{this.state.part1noError?<i className="fa fa-lg fa-check-circle" style={{color:"green"}}></i>:null}</span> Price Stock and Shipping Information
              {errors.psCount>0?<span className="" style={{color:"#721c24",background:"#f8d7da",marginLeft:"5px",padding:"2px"}}>{errors.psCount} errors</span>:null}
                        </label>
                      </div>
                    </div>
                    <div className="row innerboxmodal" onClick={this.openModal2}>
                      <div className="col-auto colwidth100">
                        <label className="mr-sm-2" htmlFor="status" style={{ color: "#000" }}>
                        <span>{errors.ps2Count>0?<i className="fa fa-lg fa-exclamation-circle" style={{color:"red"}}></i>:null}{this.state.part2noError?<i className="fa fa-lg fa-check-circle" style={{color:"green"}}></i>:null}</span> Product Desciption
                        {errors.ps2Count>0?<span className="" style={{color:"#721c24",background:"#f8d7da",marginLeft:"5px",padding:"2px"}}>{errors.ps2Count} errors</span>:null}
                        </label>
                      </div>
                    </div>
                    <div className="row innerboxmodal " onClick={this.openModal3}>
                      <div className="col-auto colwidth100">
                        <label className="mr-sm-2" htmlFor="status" style={{ color: "#000" }}>
                          Additional Information
                        </label>
                      </div>
                    </div>
                  </div>
                  <button id="submitButton" type="submit" className="btn-block upaddattribtn" disabled={this.state.disableButton}>Add</button>
                  <br/>
                  <div style={{display:"flex"}}>
                  {addProductError && Object.keys(addProductError).length ? (
                  <p style={{marginLeft:"20px"}} className={addProductError.status===201?"text-success":"text-danger"}>{addProductError.res}</p>
                ):this.state.onSubmitactive?<><p id="uploadProgress" style={{color:"blue"}}>saving in progress....<span></span></p>
                </>:""}
                  {addProductError.status===201?<Link to="/seller/dashboard/myproducts"> Click here for Your Product Listing.</Link>:null}
                </div>
                </div>
              </div>
            </div>

            <Modal
             isOpen={this.state.setIsOpen3}
             onRequestClose={this.closeModal}
             ariaHideApp={false}
             style={customStyles2
             }>
              <div className="col-auto colwidth100">
              WARRANTY DETAILS
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="domesticWarranty" style={{ color: "#000" }} >
                      Domestic Warranty
                    </label>
                    <input type="number" min="0" pattern="\d+" name="domesticWarranty" className="form-control" onChange={this.onChangeHandler} value={this.state.domesticWarranty} min="0"/>
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="internationalWarranty" style={{ color: "#000" }} >
                      International  Warranty
                    </label>
                    <input type="number" min="0" name="internationalWarranty" className="form-control" onChange={this.onChangeHandler} value={this.state.internationalWarranty}/>
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="warrantySummary" style={{ color: "#000" }} >
                      Warranty Summary
                    </label>
                    <input type="text" name="warrantySummary" className="form-control" onChange={this.onChangeHandler} value={this.state.warrantySummary}/>
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="warrantyServiceType" style={{ color: "#000" }} >
                      Warranty Service Type
                    </label>
                    {/* <input type="text" name="WarrantyServiceType" className="form-control" onChange={this.onChangeHandler} value={this.state.WarrantyServiceType}/> */}
                    <select className="custom-select mr-sm-2" name="warrantyServiceType" onChange={this.onChangeHandler} value={this.state.WarrantyServiceType}>
                      <option value="select" hidden>Select</option>
                      <option value="on-site">on Site</option>
                      <option value="walk-in">Walk in</option>
                    </select>

                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="coveredInWarranty" style={{ color: "#000" }} >
                      Covered in Warranty
                    </label>
                    <input type="text" name="coveredInWarranty" className="form-control" onChange={this.onChangeHandler} value={this.state.coveredInWarranty}/>
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="notCoveredInWarranty" style={{ color: "#000" }} >
                      Not Covered in Warranty
                    </label>
                    <input type="text" name="notCoveredInWarranty" className="form-control" onChange={this.onChangeHandler} value={this.state.notCoveredInWarranty}/>
                  </div>
                </div>
                PRODUCT DESCRIPTION
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="idealFor" style={{ color: "#000"}} >
                      Ideal For<span style={{ color: 'rgba(21,20,20,0.8)',marginLeft:"5px"  }} data-toggle="tooltip" title="Ideal for Refer to which gender the product would be most suitable" data-placement="top"><i className="fa fa-question-circle fa-lg"></i></span>
                    </label>
                    <select className="custom-select mr-sm-2" name="idealFor" onChange={this.onChangeHandler} value={this.state.idealFor}>
                      <option value="select" hidden>Select</option>
                      {/* <option value="Men-women">Men & Women</option> */}
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      {/* <option value="Baby Boy & Bady Girl">Baby Boy & Bady Girl</option>
                      <option value="Baby Boys">Baby Boys</option>
                      <option value="Baby Girls">Baby Girls</option>
                      <option value="Boy & Girl">Boy & Girl</option> */}
                      <option value="boys">Boys</option>
                      <option value="girls">Girls</option>
                      {/* <option value="Girls">UNISEX</option> */}
                    </select>
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="trailer" style={{ color: "#000" }} >
                      Video URL
                    </label>
                    <input type="file" accept="video/*" name="trailer" className="form-control" onChange={this.handleVideoChange}/>
                  </div>
                  <div className="form-group col-auto colwidth100">
                    <label htmlFor="description" style={{ color: "#000" }}>
                      Description:
                    </label>
                    <textarea className="form-control" rows="5" id="description" name="description" onChange={this.onChangeHandler} value={this.state.description}></textarea>
                  </div>

                  {/* <div className="form-group col-auto colwidth100">
                    <label htmlFor="longDescription" style={{ color: "#000" }}>
                      Long Description:
                    </label>
                    <textarea className="form-control" rows="8" id="longDescription" name="longDescription" value={this.state.longDescription} onChange={this.onChangeHandler}>
                    </textarea>
                  </div> */}
                </div>
                <Link className="btn btn-primary" onClick={this.saveData}>Save & close</Link>
                <Link className="btn btn-primary" onClick={this.closeModal} style={{marginLeft:"10px"}}>close</Link>
              </div>
            </Modal>
            <Modal
             isOpen={this.state.setIsOpen2}
             onRequestClose={this.closeModal}
             ariaHideApp={false}
             style={customStyles2}
             >
            <div className="w-100">
              PRODUCT ATTRIBUTES<br/>
              <div className="row subrow" stylw={{padding:"20px"}}>
                
                  <div className="col-auto colwidth25">
                    <label className="mr-sm-2 " htmlFor="styleCode" style={{ color: "#000",paddingLeft:"68px" }} >
                      style Code<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                  </div>
                  <div className="col-auto colwidth50">
                    <input type="text" name="styleCode" className="form-control" onChange={this.onChangeHandler} value={this.state.styleCode} readOnly={this.state.type==="variant"?true:false}/>
                    {errors.styleCode && <div className="alert alert-danger">{errors.styleCode}</div>}
                  </div>
                  <div className="col-auto colwidth25"></div>
                 
                  {AttributesDetails.map((res,index) => {
                    return (
                      <React.Fragment key={index}>
                      <div className="col-auto colwidth25">
                        <label className="mr-sm-2" htmlFor="status" style={{ color: "#000",float:'right' }}>
                          {res.label} <span style={{ color: '#ff0000' }}>*</span>
                        </label>
                        </div>
                        <div className="col-auto colwidth50" style={{marginTop:"5px"}}>
                        {res.predefined === true ?
                          <>
                            {res.multiValue === true ?
                              <>
                               {(() => {
                                      const items = [];
                                      for (let i = 0; i <= this.state.ValueCount; i++) {
                                        items.push(
                                          <select
                                           className="custom-select mr-sm-2"
                                            name={i+res.label}
                                            ref="modifierValue"
                                            value={this.state[i+res.label]}
                                            onChange={(e)=>this.AttributeAddValue(e,res.key,res.useToCreateVariants)} >
                                            
                                            <option hidden>Select One</option>
                                            {res.values.map((value, index) => {
                                              return (
                                                  <option key={res.label+index} value={value} data-tag={res.key} data-tag2={i}>{value}</option>
                                              )
                                            })}
                                          </select>
                                        )
                                      }
                                      return items;
                                    })()}
                                     <button style={{ padding: "10px" }} onClick={this.addMoreattr} disabled={this.state.ValueCount>=res.maxValues-1}>+</button>
                                {/* <Modal
                                  isOpen={this.state.setIsOpen == res.key}
                                  onRequestClose={this.closeModalinner}
                                  style={customStyles}>
                                  <div className="col-auto" style={{ width: '300px' }}>
                                    
                                   
                                    <br />
                                   
                                  </div>

                                </Modal> */}
                              </>
                              :
                              <select
                               className="custom-select mr-sm-2"
                                name={res.label}
                                value={this.state[res.label]}
                                ref="modifierValue"
                                  onChange={(e)=>this.AttributeAddValue(e,res.key,res.useToCreateVariants)} >
                                <option hidden>Select One</option>
                                {res.values.map((value, i) => {
                                  return (
                                    <option value={value} data-tag={res.key} data-tag2={i}>{value}</option>
                                  )
                                })}
                              </select>
                            }
                          </>
                          :
                          <input type="text" name={res.label} className="form-control" onChange={(e)=>this.AttributeAddValue(e,res.key,res.useToCreateVariants)} value={this.state[res.label]}/>
                        }
                        <br />
                      </div>
                      
                      <div className="col-auto colwidth25"></div>
                      
                      </React.Fragment>
                    )
                  })
                }
                <div className="col-auto colwidth30"></div>
                 {errors.attributes && <div className="col-auto col-width50 alert alert-danger">{errors.attributes}</div>}
              </div>
              <Link className="btn btn-primary" onClick={this.saveData}>Save & close</Link>
              <Link className="btn btn-primary" onClick={this.closeModal} style={{marginLeft:"10px"}}>close</Link>
            </div>
          </Modal>
          <Modal
           isOpen={this.state.setIsOpen1}
           onRequestClose={this.closeModal}
           ariaHideApp={false}
           onAfterOpen={this.afterOpenModal}
           shouldFocusAfterRender={false}
           style={customStyles2}
          >
            <div className="row spacing">
              <div className="col-auto colwidth100">
                PRODUCT DETAILS<br />
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="status" style={{ color: "#000" }}>
                      Product Name <span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.onChangeHandler}  />
                    {errors.name && <div className="alert alert-danger">{errors.name}</div>}
                    <br />
                  </div>
                </div>
                PRICING DETAILS
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="originalPrice" style={{ color: "#000" }}>
                      MRP<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <input type="number" min="0" name="originalPrice" className="form-control" onChange={this.onChangeHandler} value={this.state.originalPrice} />
                    {errors.originalPrice && <div className="alert alert-danger">{errors.originalPrice}</div>}
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="sellingPrice" style={{ color: "#000" }}>
                      Your Selling Price<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <input type="number" min="0" name="sellingPrice" className="form-control" onChange={this.onChangeHandler} value={this.state.sellingPrice}/>
                    {errors.sellingPrice && <div className="alert alert-danger">{errors.sellingPrice}</div>}
                  </div>
                </div>
                TAX DETAILS
                <div className='row subrow'>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="hsn" style={{ color: "#000" }}>
                      HSN<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <input type="number" min="0" name="hsn" className="form-control" onChange={this.onChangeHandler} value={this.state.hsn}/>
                    {errors.hsn && <div className="alert alert-danger">{errors.hsn}</div>}
                    <Link className="text-info" onClick={(e)=>this.openModalSection(e,"setOpenHSN")}>Please find Relavant Hsn Code</Link>
                  </div>
                  {/* <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="taxcode" style={{ color: "#000" }}>
                      Tax Code
                  </label>
                    <select className="custom-select mr-sm-2" id="currency" name="taxCode" onChange={this.onChangeHandler} value={this.state.taxCode}>
                      <option hidden>Select One</option>
                      <option value='GST_0'>GST_0</option>
                      <option value='GST_3'>GST_3</option>
                      <option value='GST_5'>GST_5</option>
                      <option value='GST_12'>GST_12</option>
                      <option value='GST_18'>GST_18</option>
                      <option value='GST_18'>GST_28</option>
                      <option value='GST_APPAREL'>GST_APPAREL</option>
                    </select>
                    {errors.taxCode && <div className="alert alert-danger">{errors.taxCode}</div>}
                  </div> */}
                </div>              
                STATUS DETAILS
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="status" style={{ color: "#000" }}>
                      Listing Status<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <select className="custom-select mr-sm-2" id="status" name="listingStatus" onChange={this.onChangeHandler} value={this.state.listingStatus} >
                      <option value="select" hidden>Select</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    {errors.listingStatus && <div className="alert alert-danger">{errors.listingStatus}</div>}
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="lowStockThreshold" style={{ color: "#000" }}>
                      Low Stock Threshold
                    </label>
                    <input type="number" min="0" name="lowStockThreshold" className="form-control" onChange={this.onChangeHandler} value={this.state.lowStockThreshold}/>
                    {errors.lowStockThreshold && <div className="alert alert-danger">{errors.lowStockThreshold}</div>}
                  </div>
                </div>
                INVENTORY DETAILS
                <div className="row subrow">
                  <div className="col-auto colwidth25">
                    <label className="mr-sm-2" htmlFor="fulfilmentby" style={{ color: "#000" }}>
                      Fullfilment by<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <select className="custom-select mr-sm-2" name="fulfillmentBy" onChange={this.onChangeHandler} value={this.state.fulfillmentBy}>
                      <option value="select" hidden>Select</option>
                      <option value="seller">seller</option>
                      <option value="seller-smart">seller Smart</option>
                    </select>
                    {errors.fulfillmentBy && <div className="alert alert-danger">{errors.fulfillmentBy}</div>}
                  </div>
                  <div className="col-auto colwidth25">
                    <label className="mr-sm-2" htmlFor="sku" style={{ color: "#000" }}>
                      SKU<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <input type="text" name="sku" className="form-control" onChange={this.onChangeHandler} value={this.state.sku}/>
                    {errors.sku && <div className="alert alert-danger">{errors.sku}</div>}
                  </div>
                  <div className="col-auto colwidth25">
                    <label className="mr-sm-2" htmlFor="stock" style={{ color: "#000" }}>
                      Stock<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <input type="number" min="0" name="stock" className="form-control" onChange={this.onChangeHandler} value={this.state.stock}/>
                    {errors.stock && <div className="alert alert-danger">{errors.stock}</div>}
                  </div>
                  <div className="col-auto colwidth25">
                    <label className="mr-sm-2" htmlFor="procurementsla" style={{ color: "#000" }}>
                      Procurement SLA<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <input type="number" min="0" name="procurementSla" className="form-control" placeholder="Dispatch in Days" onChange={this.onChangeHandler} value={this.state.procurementSla}/>
                    {errors.procurementSla && <div className="alert alert-danger">{errors.procurementSla}</div>}
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="maxQuantityPerOrder" style={{ color: "#000" }}>
                      Maximum Quantity per order
                    </label>
                    <input type="number" min="0" name="maxQuantityPerOrder" className="form-control" onChange={this.onChangeHandler} value={this.state.maxQuantityPerOrder}/>
                    {errors.maxQuantityPerOrder && <div className="alert alert-danger">{errors.maxQuantityPerOrder}</div>}
                  </div>
                </div>
                DELIVERY CHARGES DETAILS
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="localShippingCost" style={{ color: "#000" }} >
                      Local Delivery Charges<span style={{ color: '#ff0000' }}>*</span>
                  </label>
                  <div className="row">
                  <div className="col-auto colwidth98">
                    <input type="number" min="0" name="localShippingCost" className="form-control" onChange={this.onChangeHandler} value={this.state.localShippingCost}/>
                    </div>
                    <span className="" style={{ color: '#000000' }}>INR</span>
                  </div>
                    {errors.localShippingCost && <div className="alert alert-danger">{errors.localShippingCost}</div>}
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="zonalShippingCost" style={{ color: "#000" }} >
                      Zonal Delivery Charges<span style={{ color: '#ff0000' }}>*</span>
                  </label>
                  <div className="row">
                  <div className="col-auto colwidth98">
                    <input type="number" min="0" name="zonalShippingCost" className="form-control" onChange={this.onChangeHandler} value={this.state.zonalShippingCost}/>
                  </div>
                  <span style={{ color: '#000000' }}>INR</span>
                  </div>
                    {errors.zonalShippingCost && <div className="alert alert-danger">{errors.zonalShippingCost}</div>}
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="internationalShippingCost" style={{ color: "#000" }} >
                      International Delivery Charges<span style={{ color: '#ff0000' }}>*</span>
                  </label>
                  <div className="row">
                  <div className="col-auto colwidth98">
                    <input type="number" min="0" name="internationalShippingCost" className="form-control" onChange={this.onChangeHandler} value={this.state.internationalShippingCost}/>
                    </div>
                  <span style={{ color: '#000000' }}>INR</span>
                  </div>
                    {errors.internationalShippingCost && <div className="alert alert-danger">{errors.internationalShippingCost}</div>}
                  </div>
                </div>
                PACKAGING DETAILS
                <div className="row subrow">
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="packageWeight" style={{ color: "#000" }} >
                      Package Weight<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <div className="row">
                  <div className="col-auto colwidth98">
                    <input type="number" min="0" name="packageWeight" className="form-control" onChange={this.onChangeHandler} value={this.state.packageWeight}/>
                    </div>
                  <span style={{ color: '#000000' }}>Kg</span>
                  </div>
                    {errors.packageWeight && <div className="alert alert-danger">{errors.packageWeight}</div>}
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="packageLength" style={{ color: "#000" }} >
                      Package Length<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <div className="row">
                  <div className="col-auto colwidth98">
                    <input type="number" min="0" name="packageLength" className="form-control" onChange={this.onChangeHandler} value={this.state.packageLength}/>
                    </div>
                  <span style={{ color: '#000000' }}>cm</span>
                  </div>
                    {errors.packageLength && <div className="alert alert-danger">{errors.packageLength}</div>}
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="packageBreadth" style={{ color: "#000" }} >
                      Package Breadth<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <div className="row">
                  <div className="col-auto colwidth98">
                    <input type="number" min="0" name="packageBreadth" className="form-control" onChange={this.onChangeHandler} value={this.state.packageBreadth} pattern="\d*" min="0"/>
                    </div>
                  <span style={{ color: '#000000' }}>cm</span>
                  </div>
                    {errors.packageBreadth && <div className="alert alert-danger">{errors.packageBreadth}</div>}
                  </div>
                  <div className="col-auto colwidth50">
                    <label className="mr-sm-2" htmlFor="packageHeight" style={{ color: "#000" }} >
                      Package Height<span style={{ color: '#ff0000' }}>*</span>
                    </label>
                    <div className="row">
                  <div className="col-auto colwidth98">
                    <input type="number" min="0" name="packageHeight" className="form-control" onChange={this.onChangeHandler} value={this.state.packageHeight}/>
                    </div>
                  <span style={{ color: '#000000' }}>cm</span>
                  </div>
                    {errors.packageHeight && <div className="alert alert-danger">{errors.packageHeight}</div>}
                  </div>
                </div>
              </div>
              <Link className="btn btn-primary" onClick={this.saveData}>Save & close</Link>
              <Link className="btn btn-primary" onClick={this.closeModal} style={{marginLeft:"10px"}}>close</Link>
              </div>
              <Modal
              isOpen={this.state.setOpenHSN}
              onRequestClose={this.closeModalHSN}
              ariaHideApp={false}
              style={customStylesHsn}>
              <table>
                <tr>
                  <th>HSN code</th>
                  <th>Select corresponding</th>
                </tr>
                {this.props.hsnDetail?this.props.hsnDetail.map((item)=>{
                  return (
                    <tr>
                  <td>{item}</td>
                  <td><button className="btn btn-primary" onClick={(e)=>this.selectHSN(e,item)}>Select</button></td>
                </tr>
                  )
                }):""}

               </table> 
    
            </Modal> 
            </Modal>
            <Modal
              isOpen={this.state.setOpenVariant}
              onRequestClose={this.closeModal}
              ariaHideApp={false}
              style={customStyles2}>
               <div> 
              <div><p>Choose at least one of the following attribute to create a nwe product variant</p></div>
              <div></div>
              <div className="row subrow">
              <div className="col-auto colwidth50">
              {this.state.setOpenVariant && AttributesDetails.map((item)=>{
               
                return (
              item.useToCreateVariants?
                  <React.Fragment>
                    
                      
                        <div>{item.label}</div>
                        <div className="row">
                          <div>{this._renderVarient(item,this.state.variant)}</div>
                          <button onClick={(e)=>this.createNewVariant(item)}>Create new</button>
                        </div>
                     
                  </React.Fragment>:null
                )
              })}
                       </div>
                     
              </div>
              <Link className="btn btn-primary" onClick={this.createProductVariant}>Create Product Variant</Link>
              <Link className="btn btn-primary" onClick={this.closeModal} style={{marginLeft:"10px"}}>close</Link>
              </div>
              <Modal
              isOpen={this.state.openSelectVariant}
              onRequestClose={this.closeModalSelectVariant}
              ariaHideApp={false}
              style={customStylesHsn}>
                      <div className="col-auto colwidth25">
                        <label className="mr-sm-2" htmlFor="status" style={{ color: "#000",float:'right' }}>
                          {this.state.selectedVariantItem.label} <span style={{ color: '#ff0000' }}>*</span>
                        </label>
                        </div>
                        <div className="col-auto colwidth50" style={{marginTop:"5px"}}>
                        {this.state.selectedVariantItem.predefined === true ?
                          <>
                            {this.state.selectedVariantItem.multiValue === true ?
                              <>
                               {(() => {
                                      const items = [];
                                      for (let i = 0; i <= this.state.ValueCount; i++) {
                                        items.push(
                                          <select
                                           className="custom-select mr-sm-2"
                                            name={i+this.state.selectedVariantItem.label}
                                            ref="modifierValue"
                                            value={this.state[i+this.state.selectedVariantItem.label]}
                                            onChange={(e)=>this.AttributeAddValue(e,this.state.selectedVariantItem.key,this.state.selectedVariantItem.useToCreateVariants)} >
                                            
                                            <option hidden>Select One</option>
                                            {this.state.selectedVariantItem.values.map((value, index) => {
                                              return (
                                                  <option key={this.state.selectedVariantItem.label+index} value={value} data-tag={this.state.selectedVariantItem.key} data-tag2={i}>{value}</option>
                                              )
                                            })}
                                          </select>
                                        )
                                      }
                                      return items;
                                    })()}
                                     <button style={{ padding: "10px" }} onClick={this.addMoreattr} disabled={this.state.ValueCount>=this.state.selectedVariantItem.maxValues-1}>+</button>
                               
                              </>
                              :
                              <select
                               className="custom-select mr-sm-2"
                                name={this.state.selectedVariantItem.label}
                                value={this.state[this.state.selectedVariantItem.label]}
                                ref="modifierValue"
                                  onChange={(e)=>this.AttributeAddValue(e,this.state.selectedVariantItem.key,this.state.selectedVariantItem.useToCreateVariants)} >
                                <option hidden>Select One</option>
                                {this.state.selectedVariantItem.values.map((value, i) => {
                                  return (
                                    <option value={value} data-tag={this.state.selectedVariantItem.key} data-tag2={i}>{value}</option>
                                  )
                                })}
                              </select>
                            }
                          </>
                          :
                          <input type="text" name={this.state.selectedVariantItem.label} className="form-control" onChange={(e)=>this.AttributeAddValue(e,this.state.selectedVariantItem.key,this.state.selectedVariantItem.useToCreateVariants)} value={this.state[this.state.selectedVariantItem.label]}/>
                        }
                        <br />
                      </div>
                      
                      <div className="col-auto colwidth25"></div>
                      
              </Modal>
            </Modal>
            <Modal
              isOpen={this.state.openModalVariant}
              onRequestClose={this.closeModalSelectVariant}
              ariaHideApp={false}
              style={StylesImgDialog}>
                <div>Are you want to use Same Image for this variant</div>
                <div className="row float-right mr-3">
                  <div>
                    <button className="btn btn-primary" onClick={()=>this.variantDialog("skip")}>Skip</button>
                    </div>
                    <div>
                    <button className="btn btn-primary ml-1" onClick={()=>this.variantDialog("proceed")}>proceed</button>
                    </div>
                </div>
            </Modal>     
             
          </form>
          <div className="variantContainer">
            <div className="variant">
            <div className="variant-child1">
              <p>Creating variant makes product togther</p>
            </div>
            <div className="createVarient">
              <button className="btn btn-primary " onClick={this.openvariantDialog} disabled={this.state.variantButton}>Create Varient</button>
            </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("attribute detail",state.sellerAddProduct.AttributesDetails)
  return {
    addProductError: state.sellerAddProduct.addProductError,
    AttributesDetails: state.sellerAddProduct.AttributesDetails,
    hsnDetail:state.sellerAddProduct.hsnCode
  };
};

const mapDispatchToProp = dispatch => {
  return {
    addProduct: productData => dispatch(addProduct(productData)),
    getAttribute: (categoryId) => dispatch(getAttribute(categoryId)),
    hsnList:() => dispatch(hsnList()),
    clearError:() => dispatch(clearError())
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(AddProduct);