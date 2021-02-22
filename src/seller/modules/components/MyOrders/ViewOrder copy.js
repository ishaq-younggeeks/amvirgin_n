import "./MyOrders.css";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { ViewOrderItem } from './sellerOrderAction';
import { VIEW_ORDER } from "./sellerOrderConstant";

class ViewOrder extends Component {
  constructor(props){
    super(props)
    this.state = {
      orderid:''
  };   
 }

  componentDidMount = () => {
    let id=localStorage.getItem('orderId');
    this.props.ViewOrderItem(id);   
  };

  render() {      
    return (
      <div className="card ordercard ordertable" style={{padding:'0px 0'}}>
        <div style={{background:'#efefefb8',padding:'10px 20px'}}>
          <h4 style={{ textAlign: "left", fontWeight: "500", color: "#000"}}>My Orders</h4>
        </div> 
        <div className="notaClass">
          {this.props.viewOrder.length? this.props.viewOrder.map((data,id)=>            
            { 
              return(
                  <div className="order" style={{padding:'10px 40px'}}>
                    
                    <div style={{padding:'10px 20px',border:'1px solid #00000030' ,borderLeft:'4px solid #bf0000'}}>
                    {data.product_details ? 
                    <><h4>{data.product_details ? data.product_details.name : 'Empty'}</h4>
                      <div className="row">                          
                        <div className="col-auto" style={{width:'15%'}}>
                          { data.product_details.images  ? 
                            (
                              data.product_details.images.map((img,i)=>i==0 ? 
                              <img src={img.path}  style={{width:'100%',height:'200px',objectFit:'cover',objectPosition:'top'}}/> 
                              : 
                              null)
                            )
                            :
                            <img src={process.env.PUBLIC_URL + '/img/default.png'} style={{width:'100%',height:'100%'}}/>
                          }
                        </div> 
                        <div className="col-auto" style={{width:'25%'}}>
                          <p><b>ORDER DETAILS</b></p>
                          <p>Order: <span>{this.props.viewAllOrder.orderNumber}</span></p>
                          <p>SKU: <span>{data.product_details.sku}</span></p>
                          <p>Procurement SLA : <span>{data.procurementSla}</span></p>
                        </div> 
                        <div className="col-auto" style={{width:'25%'}}>
                          <p><b>PRICE & QTY</b></p>
                          <p>Price: <span>{data.product_details.sellingPrice}</span></p>
                          <p>Quantity: <span>{data.quantity}</span></p>
                        </div>   
                        <div className="col-auto" style={{width:'20%'}}>
                          <p><b>BUYER DETAILS</b></p>
                          <p>Name : <span>{this.props.viewAllOrder.order.address.name}</span></p>
                          <p>Address : <span>{this.props.viewAllOrder.order.address.city.name}</span></p>
                        </div> 
                      </div>
                      
                    </>                    
                    :
                    "Error in Data"
                    }
                    </div> 
                  </div>
                
              )
             }             
            
            
          ):null}          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("view order",state.sellerOrders.viewOrder)
  return ({
      viewOrder:state.sellerOrders.viewOrder,
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    ViewOrderItem: (id) => dispatch(ViewOrderItem(id))
  });
}

export default connect( mapStateToProps, mapDispatchToProps )(ViewOrder);
