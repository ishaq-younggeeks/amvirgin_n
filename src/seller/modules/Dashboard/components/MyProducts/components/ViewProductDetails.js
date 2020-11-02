import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getProduct, updateProductStatus, clearDetail, editProduct } from "../sellerAddProductAction";
import "./MyProducts.css";

class ViewProductDetails extends Component {
  componentDidMount = () => {
    console.log("slug are", this.props.match.params.slug)
    this.props.getProduct(this.props.match.params.slug);
    // this.props.deleteProduct(this.props.match.params.slug);
    console.log("current props", this.props.location.state);
  };

  componentWillUnmount() {
    console.log("component will unmount called")
    this.props.clearDetail()
  }

  render() {
    const { product } = this.props;
    console.log('product',product)
   
    return ( 
      <>
        <Link type="button" className="btn btn-success btn-lg backbtn" to="/seller/dashboard/myproducts" >
         <i className="fa fa-arrow-left"></i> Back
        </Link>
        <div className="viewdetailscontainer">
          <div className=" detailsCard" style={{marignBottom:"20px"}}>            
            <h1 className="heading productHeading" style={{marginTop:'0'}}>Product Details</h1>
            <div className="row">
              <div className="col-sm-5">
                {product.files && product.files.length?
                <img src={product.files[0].url} className="card-img-top" alt="product pic" style={{objectFit:'cover',height:'600px'}}/>
                :
                <img src={process.env.PUBLIC_URL + '/img/default.png'} className="card-img-top" alt="product pic"/>}
              </div>
              <div className="col-sm-7">        
                <h3  style={{textAlign:'left'}}>
                  {product.category ? product.name : "null"}
                </h3>
                  Short Description:
                <p className="card-text">{product.description}</p>               
                <ul className="list-group list-group-flush">
                  <li className="list-group-item" style={{padding:'10px 3px',border:'none'}}>
                    Product Type:{product.category ? product.category.name : "null"}
                  </li>
                  <li className="list-group-item"  style={{padding:'10px 3px',border:'none'}}>
                    Price: {product.currency} {product.originalPrice}
                  </li>
                  <li className="list-group-item" style={{padding:'10px 3px',border:'none'}}>Taxrate: {product.taxRate}</li>
                  <li className="list-group-item" style={{padding:'10px 3px',border:'none'}}>
                  FulfillmentBy: {product.fulfillmentBy}
                  </li>
                  <li className="list-group-item" style={{padding:'10px 3px',border:'none'}}>
                    Brand Name {product.brand ?product.brand.name:"undefined"}
                  </li>
                  <li className="list-group-item" style={{padding:'10px 3px',border:'none'}}>Stock: {product.stock}</li>
                  <li className="list-group-item" style={{padding:'10px 3px',border:'none'}}>
                   Local Shipping Cost : {product.localShippingCost}
                  </li>
                  <li className="list-group-item" style={{padding:'10px 3px',border:'none'}}>
                   Zonal Shipping Cost : {product.zonalShippingCost}
                  </li>
                  <li className="list-group-item" style={{padding:'10px 3px',border:'none'}}>
                   International Shipping Cost : {product.internationalShippingCost}
                  </li>
                  <li className="list-group-item" style={{padding:'10px 3px',border:'none'}}>
                    Product status: {product.listingStatus}
                  </li>

                  <li className="list-group-item" style={{padding:'10px 3px',border:'none'}}>
                    View Variants : 
                    {product.variants ? product.variants.map(variants=>
                    <>
                      <Link to={`/seller/dashboard/myproducts/${variants.key}`}>
                        {variants.options.map(value=>
                        <>
                          {value.value+" "+value.label+" "}
                        </>
                        )}
                      </Link>,
                    </>
                    ):"No Variants "}
                  </li>           
                </ul>
                <Link className="card-link btn btn-warning" onClick={() => this.props.editProduct(product.key,this.props.history)}>
                  Edit
                </Link>
                <button type="button" className="card-link btn btn-danger" onClick={() => this.props.deleteProduct(product.id,this.props.history) }>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    product: state.sellerAddProduct.product
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProduct: slug => dispatch(getProduct(slug)),
    updateProductStatus: (slug,history) => dispatch(updateProductStatus(slug,history)),
    clearDetail: () => dispatch(clearDetail()),
    editProduct: (slug,history) => dispatch(editProduct(slug,history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProductDetails);
