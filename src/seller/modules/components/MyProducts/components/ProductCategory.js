import React, { Component, createRef, StrictMode } from "react";
import { connect } from "react-redux";
import axios from 'axios'
import { baseURL } from "../../../../../credential.json";
import {categoryList } from "../sellerAddProductAction";
import '../Addproduct.css'
import Modal from 'react-modal';
import {Link}  from 'react-router-dom'
import $ from 'jquery'
import qs from 'query-string';



class ProductCategory extends Component {

    constructor(props){
        super(props);
        this.state={
          render:"",
          active:true,
          available:true,
          id:0,
          selected:0,
          vertical:"",
          listingType:"",
          subcatgory:"",
          mainCategory:""
        }
    }

    handleClick = (e,compName, key,available,name) => {
        e.preventDefault();
      $( "#main li" ).find("i").remove();
        $( "#main li" ).removeClass( "active" );
        $( "#childcategory li" ).removeClass( "active" );
        $( "#childcategory li" ).find("i").remove();
        $( "#subchildcategory li" ).removeClass( "active" ); 
        $( `#mainctgry${key}` ).addClass( "active" );


      if(available)
      {
        $( `#mainctgry${key}` ).append(`<i class="fa fa-hand-o-right" style='float:right;color:red'></i>`);
        this.setState({render:compName,id:key,available:available,vertical:name})
      }
      else
      this.setState({render:"",available:available,selected:key,vertical:name,mainCategory:key});
        if(this.state.active)
        this.setState({active:!this.state.active})
      //this.activeClass()        
  }

  setSubcategory = (name) => {
    this.setState({subcatgory:name})
  }

  activeComponent = (available,key) => {
    if(available)
    this.setState({active:true,available:available,selected:key,mainCategory:key})
    else
    this.setState({active:false,available:available,selected:key,mainCategory:key},console.log("current state are",this.state))

  }

  activeBrand = (available,key) => {
    this.setState({available:available,selected:key})
    console.log("active id",this.state.id);
  }

  _renderSubComp(){
      switch(this.state.render){
          case 'SubCategory': return <SubCategory categories={this.props.categories} handleClick={this.handleClick} id={this.state.id} _renderSubComp={this._renderSubComp} active={this.state.active} activeComponent={this.activeComponent} setSubcategory={this.setSubcategory} activeBrand={this.activeBrand}/>
          default : return ""
      }
  }

  queryString = () => {
    const query = { mainCategory:this.state.mainCategory,category: this.state.selected,listing:this.state.listingType,vertical:this.state.vertical,subcatgory:this.state.subcatgory};
    const searchString = qs.stringify(query);
    return searchString
  }

 

    componentDidMount = () => {
      if (localStorage.getItem("token")) {
        this.props.categoryList();
      }

      let query = qs.parse(this.props.location.search)
      console.log("parsed query",query);
    this.setState({listingType:query.listing})
    };
    render(){
      console.log("getting categories in list",this.props.categories)
        return(
          <>
          <div className="container-fliud" style={{ marginTop: "6%" }}>
            <div>
              <h1>
                {this.state.listingType==="single"?"Add single Product":"Add Product in Bulk"}
              </h1>
              </div>
            <div className="categorycontainer myprocontainer">
              <div className="catcont1" id="main">
              <ul>
                {this.props.categories && this.props.categories.map((category,index) => {
                  return (
                    <li key={category.key} id={'mainctgry'+category.key} style={{padding:'5px 10px ',border:'1px solid #efefef',}}><Link onClick={(e)=> this.handleClick(e,"SubCategory",category.key,category.children.available,category.name)}>{category.name}</Link>
                    </li>
                  );
                })}
              </ul>
              
              </div> 
            {this._renderSubComp()}
            {this.state.available?
              <div className="selcatbtn1"> Select the category you want to sell </div>:(
              <>
                <div className="selcatbtn1">
                  {/* <center>
                    <p>vertical:<span>Men</span></p>
                    </center> */}
                   <p>please select brand to sell in this vertical</p>
                   </div>
               <Link className="nxtbtncat" to={{pathname:`/seller/dashboard/ProductBrand`,search:this.queryString()}}>Select Brand</Link>
              </>
              )}
          </div>
          </div>
          </>
            
        )
    }

}


class SubCategory extends React.Component{
  constructor(props){
    super(props);
    this.state={
      render:"",
      active:false,
      id:0
    }
}

handleClick = (e,compName, key,available,name) => {
  e.preventDefault();
  $( "#childcategory li" ).find("i").remove();
  $( "#childcategory li" ).removeClass( "active" );
  $( "#subchildcategory li" ).removeClass( "active" ); 
  $( `#child${key}` ).addClass( "active" );
  if(available)
  {
    $( `#child${key}` ).append(`<i class="fa fa-hand-o-right" style='float:right;color:red'></i>`);
  }
  this.setState({render:compName,id:key});
   this.props.activeComponent(available,key)
   this.props.setSubcategory(name)
}

_renderSubComp(){
  const [{children}]=this.props.categories.filter((category)=>category.key===this.props.id)
  switch(this.state.render){
      case 'SubChildCategory': return <SubChildCategory activeBrand={this.props.activeBrand} children={children} id={this.state.id} setSubcategory={this.props.setSubcategory}/>
      default : return ""
  }
}

  render() {
    const [{children}]=this.props.categories.filter((category)=>category.key===this.props.id)
    console.log("result",children);
      return (
          <>
           <div className="catcont1" id="childcategory">
              <ul key={123}>
              {children && children.items.length && children.items.map((category,index) => {
                return (
                  <li style={{padding:'5px 10px ',border:'1px solid #efefef'}} id={'child'+category.key} key={`sub_${index}`}><Link onClick={(e) =>this.handleClick(e,"SubChildCategory",category.key,category.children.available,category.name)}>{category.name}</Link>
                  </li>
                );
              })}
              </ul>
              
                         </div>
            
            {this.props.active?this._renderSubComp():""}
          </>
      )
  }
}

class SubChildCategory extends React.Component{
  constructor(props){
    super(props);
    this.state={
      render:"",
      id:0
    }
}

handleClick = (e,compName, key,available,name) => {
  e.preventDefault();
  $( "#subchildcategory li" ).removeClass( "active" ); 
  $( `#subchild${key}` ).addClass( "active" );
  this.setState({render:compName,id:key});
  this.props.activeBrand(available,key)
  this.props.setSubcategory(name)
}

  render() {
    
   const [{children}]=this.props.children.items.filter((category)=>category.key===this.props.id)
   console.log("result of child",children)
      return (
          <>
           <div className="catcont1" id="subchildcategory">
              <ul>
              {children && children.items.length && children.items.map((category,index) => {
                return (
                  <li style={{padding:'5px 10px ',border:'1px solid #efefef'}} id={'subchild'+category.key} key={`subchild_${index}`}><Link onClick={(e) =>this.handleClick(e,"",category.key,false,category.name)}>{category.name}</Link>
                  </li>
                );
              })}
             
              </ul>
             

            </div>
          
          </>
      )
  }
}



const mapStateToProps = state => {
  return {
    categories: state.sellerAddProduct.categories,
  };
};

const mapDispatchToProp = dispatch => {
  return {
    categoryList: () => dispatch(categoryList())
  };
};
export default connect(mapStateToProps, mapDispatchToProp)(ProductCategory);

