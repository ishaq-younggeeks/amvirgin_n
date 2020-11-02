import React, { Component } from 'react'
import PaymentNavigation from './PaymentNavigation';
import './Payment.css';
import {getOrderWiseTransaction} from './PaymentAction'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class OrderTransaction extends Component {
  constructor(props){
    super(props)
    this.state = {
      from:"",
      to:"",
      query:"",
      page:"",
      per_page:""

    }
  }
  componentDidMount(){
    this.props.getOrderWiseTransaction()
  }

  ExcelSheet = () => {
    const {orderTransaction} = this.props
    let result = orderTransaction.map(({orderDate,total,orderId,orderNumber,transactionId,})=>{
      let final = {orderDate,total,orderId,orderNumber,transactionId}
      return final
    })
    return result
  }

  onChangeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value},console.log("current state",this.state))
    
  }

  onSubmitHandler = (e,page=null,per_page=null,from=null,to=null,query=null) => {
    e.preventDefault()
    this.props.getOrderWiseTransaction(page,per_page,from,to,query);
  }

  render() {
    console.log("home of payment");
    return (
      <div className="container-fliud" style={{ marginTop: "5%" }}>
        <PaymentNavigation activeTab3="true" />
        <div className="datepicker row">
          <div className="date-head">
            <p>From:</p>
          </div>
          <div className="date-select">
            <input type="date" id="from" name="from" onChange={this.onChangeHandler}/>
          </div>
          <div className="date-head">
            <p>To:</p>
          </div>
          <div className="date-select">
            <input type="date" id="to" name="to" onChange={this.onChangeHandler}/>
          </div>
          <div className="search-submit" disabled={this.state.from && this.state.to ? false : true} onClick={(e)=>this.onSubmitHandler(e,null,null,this.state.from,this.state.to,null)}>
            <i class="fas fa-search"></i>
          </div>
          <div className="date-head" style={{marginLeft:"20px",marginRight:"20px"}}>
            <p>or</p>
          </div>
          <div className="form-group has-search">
          <input type="text" className="form-control" name="query" placeholder="Search by Order No" onChange={this.onChangeHandler}/>
        </div>
        <div className="search-submit" disabled={this.state.query? false : true} onClick={(e)=>this.onSubmitHandler(e,null,null,null,null,this.state.query)}>
            <i class="fas fa-search"></i>
          </div>
          <div style={{marginLeft:"20px"}}>
          <ExcelFile filename="order_transaction" element={<button disabled={this.props.orderTransaction.length?false:true}>Download <i className="fas fa-download"></i></button>}>
                <ExcelSheet data={this.ExcelSheet} name="Payment">
                    <ExcelColumn label="ORDER DATE" value="orderDate"/>
                    <ExcelColumn label="ORDER ID" value="orderId"/>
                    <ExcelColumn label="ORDER NO" value="orderNumber"/>
                    <ExcelColumn label="Transaction Id" value="transactionId"/>
                    <ExcelColumn label=" AMOUNT" value="total"/>
                </ExcelSheet>
            </ExcelFile>
            </div>
        </div>
        <table className="Paymenttable tablelist" style={{width:"90%"}}>
          <thead>
            <tr>
              <th>ORDER DATE</th>
              <th> ORDER ID</th>
              <th>ORDER NO</th>
              <th>Transaction Id</th>
              <th> AMOUNT </th>
            </tr>
          </thead>
          <tbody>
            {this.props.orderTransaction?
            this.props.orderTransaction.map((item,index)=>
            <tr>
              <td>{item.orderDate}</td>
            <td>{item.orderId}</td>
            <td>{item.orderNumber}</td>
            <td>{item.transactionId}</td>
            <td>{item.total}</td>
            </tr>
            )
              :null}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("order transaction ",state.sellerPayment.orderTransaction)
  return {
    orderTransaction:state.sellerPayment.orderTransaction
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderWiseTransaction : (page,per_page,from,to,query) => dispatch(getOrderWiseTransaction(page,per_page,from,to,query))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderTransaction);



