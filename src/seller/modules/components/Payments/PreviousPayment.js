import React, { Component } from 'react'
import PaymentNavigation from './PaymentNavigation';
import './Payment.css';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import ReactExport from "react-data-export";
import {getPaymentHistoryFromTo, getPaymentHistorySearch, getPaymentHistoryInitial} from './PaymentAction';
import PaymentFilter from "./PaymentFilter";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class PreviousPayment extends Component {
  constructor(props){
    super(props)
    this.state = {
      from:"",
      to:"",
      query:"",
      page:"",
      per_page:"",
      paymentError: "",
      pagination: 10,
      maxPage: 1,
      maxDate: new Date().toISOString().slice(0, 10)
    }
  }

  componentDidMount(){
    this.props.getPaymentHistoryInitial(1, 10);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.metaData !== this.props.metaData){
      this.setState({
        maxPage: this.props.metaData.last_page
      });
    };
  };

  ExcelSheet = () => {
    const {paymentHistory} = this.props
    let result = paymentHistory.map(({date, key, description, quantity, sales, sellingFee, courierCharges, total})=>{
      let final = {date, key, description, quantity, sales, sellingFee, courierCharges, total}
      return final
    })
    return result
  }

  onChangeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value},console.log("current state",this.state))
  }

  validate = () => {
    let paymentError = "";
    if(!this.state.query.trim()){
      paymentError = "Field cannot be blank!"
    }

    if(paymentError){
      this.setState({paymentError})
      return false
    }
    return true;
  }

  onSubmitHandler1 = (e,page=null,per_page=null,from=null,to=null,query=null) => {
    e.preventDefault()
    this.props.getPaymentHistoryFromTo(page,per_page,from,to,query);
  }

  onSubmitHandler2 = (e,page=null,per_page=null,from=null,to=null,query=null) => {
    e.preventDefault()
    let isValid = this.validate();
    if(isValid){
      this.props.getPaymentHistorySearch(page,per_page,from,to,query);
      this.setState({
        paymentError : ""
      })
    }
  }

  render() {
    const {paymentHistory, metaData} = this.props;
    console.log("MetaData :", metaData);
    return (
      <div className="container-fliud" style={{ marginTop: "5%" }}>
        <PaymentNavigation activeTab2="true" />
        <div className="datepicker row">
        <PaymentFilter metaData={this.props.metaData} maxPage = {this.state.maxPage} myOrderList={this.props.getPaymentHistoryInitial} {...this.props}/>
          <div style={{marginLeft:"45px"}} className="date-head">
            <h5>From :</h5>
          </div>
          <div className="date-select">
            <input type="date" id="from" name="from" max={this.state.maxDate} onChange={this.onChangeHandler}/>
          </div>
          <div className="date-head">
            <h5>To :</h5>
          </div>
          <div className="date-select">
            <input type="date" id="to" name="to" max={this.state.maxDate} onChange={this.onChangeHandler}/>
          </div>
          <div className="search-submit" disabled={this.state.from && this.state.to ? false : true} onClick={(e)=>this.onSubmitHandler1(e,null,null,this.state.from,this.state.to,null)}>
            <i className="fas fa-search"></i>
          </div>
          <div className="date-head" style={{marginLeft:"20px",marginRight:"20px"}}>
            <h5>OR</h5>
          </div>
          <div className="form-group has-search">
          <input type="text" className="form-control" name="query" placeholder="Search by Order ID" onChange={this.onChangeHandler} minLength="2"/>
          <p style={{color:"red"}}>{this.state.paymentError}</p>
        </div>
        <div className="search-submit" disabled={this.state.query ? false : true} onClick={(e)=>this.onSubmitHandler2(e,null,null,null,null,this.state.query)}>
            <i className="fas fa-search"></i>
          </div>
          <div style={{marginLeft:"20px"}}>
          <ExcelFile filename="Payment_History" element={<button style={{fontSize:"18px", padding:"5px", borderRadius:"5px" }} disabled={this.props.paymentHistory.length?false:true} onClick={() => alert("Downloading Payments Report!")}>Download <i className="fas fa-download"></i></button>}>
                <ExcelSheet data={this.ExcelSheet} name="Payment">
                    <ExcelColumn label="DATE" value="date"/>
                    <ExcelColumn label="ORDER ID" value="key"/>
                    <ExcelColumn label="DESCRIPTION" value="description"/>
                    <ExcelColumn label="QUANTITY" value="quantity"/>
                    <ExcelColumn label="PRODUCT SALES" value="sales"/>
                    <ExcelColumn label="SELLING FEES" value="sellingFee"/>
                    <ExcelColumn label="COURIER CHARGES" value="courierCharges"/>
                    <ExcelColumn label="TOTAL" value="total"/>
                </ExcelSheet>
            </ExcelFile>
            </div>
        </div>
        <table className="Paymenttable tablelist" style={{width:"90%"}}>
          <thead>
            <tr>
              <th>DATE</th>
              <th>ORDER ID</th>
              <th>DESCRIPTION</th>
              <th>QUANTITY</th>
              <th>PRODUCT SALES</th>
              <th>SELLING FEES</th>
              <th>COURIER CHARGES</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory && paymentHistory.length > 0 ? Array.from(paymentHistory).map((item,index) =>
             <tr key={item.key}>
             <td>{item.date}</td>
            <td>{item.key}</td>
            <td>{item.description ? item.description : "N/A"}</td>
            <td>{item.quantity}</td>
            <td>{item.sales}</td>
            <td>{item.sellingFee}</td> 
            <td>{item.courierCharges}</td>
            <td>{item.total}</td>
           </tr>
            ):<tr><td colSpan="8" align="center"><h3>No Data to Display :(</h3></td></tr>}    
          </tbody>
        </table>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log("previous payment ",state.sellerPayment.paymentHistory)
  return {
    paymentHistory:state.sellerPayment.paymentHistory,
    metaData:state.sellerPayment.paymentsMeta
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPaymentHistoryInitial: (current, perPage) => dispatch(getPaymentHistoryInitial(current, perPage)),
    getPaymentHistoryFromTo : (page,per_page,from,to,query) => dispatch(getPaymentHistoryFromTo(page,per_page,from,to,query)),
    getPaymentHistorySearch : (page,per_page,from,to,query) => dispatch(getPaymentHistorySearch(page,per_page,from,to,query)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PreviousPayment);

