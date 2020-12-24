import React, { Component } from 'react'
import PaymentNavigation from './PaymentNavigation';
import './Payment.css';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import ReactExport from "react-data-export";
import {getPaymentHistory, getPaymentHistoryInitial} from './PaymentAction'
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
      per_page:""

    }
  }

  componentDidMount(){
    this.props.getPaymentHistoryInitial();
  }

  ExcelSheet = () => {
    const {paymentHistory} = this.props
    let result = paymentHistory.map(({paidAt,amount,account,transactionId})=>{
      let final = {paidAt,amount,account,transactionId}
      return final
    })
    return result
  }

  onChangeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value},console.log("current state",this.state))
    
  }

  onSubmitHandler = (e,page=null,per_page=null,from=null,to=null,query=null) => {
    e.preventDefault()
    this.props.getPaymentHistory(page,per_page,from,to,query);
  }

  render() {
    const {paymentHistory} = this.props
    console.log("home of payment");
    return (
      <div className="container-fliud" style={{ marginTop: "5%" }}>
        <PaymentNavigation activeTab2="true" />
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
            <i className="fas fa-search"></i>
          </div>
          <div className="date-head" style={{marginLeft:"20px",marginRight:"20px"}}>
            <p>or</p>
          </div>
          <div className="form-group has-search">
          <input type="text" className="form-control" name="query" placeholder="Search by Order ID" onChange={this.onChangeHandler} minLength="2"/>
        </div>
        <div className="search-submit" disabled={this.state.query ? false : true} onClick={(e)=>this.onSubmitHandler(e,null,null,null,null,this.state.query)}>
            <i className="fas fa-search"></i>
          </div>
          <div style={{marginLeft:"20px"}}>
          <ExcelFile filename="paymenthistory" element={<button disabled={this.props.paymentHistory.length?false:true} onClick={() => alert("Downloading Payments Report!")}>Download <i className="fas fa-download"></i></button>}>
                <ExcelSheet data={this.ExcelSheet} name="Payment">
                    <ExcelColumn label="Payment Date" value="paidAt"/>
                    <ExcelColumn label="BANK ACCOUNT" value="account"/>
                    <ExcelColumn label="NEFT ID" value="transactionId"/>
                    <ExcelColumn label="PAYMENT AMOUNT" value="amount"/>
                </ExcelSheet>
            </ExcelFile>
            </div>
        </div>
        <table className="Paymenttable tablelist" style={{width:"90%"}}>
          <thead>
            <tr>
              <th>PAYMENT DATE</th>
              <th> BANK ACCOUNT </th>
              <th>Transaction Id</th>
              <th> NEFT ID </th>
              <th> PAYMENT AMOUNT </th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory?paymentHistory.map((item,index) =>
             <tr key={item.account}>
             <td>{item.paidAt}</td>
            <td>{item.account}</td>
            <td>{item.transactionId}</td>
            <td>{item.neftId}</td>
            <td>{item.amount}</td>
           </tr>
 
            ):null
           
  }
          </tbody>
        </table>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log("previous payment ",state.sellerPayment.paymentHistory)
  return {
    paymentHistory:state.sellerPayment.paymentHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPaymentHistory : (page,per_page,from,to,query) => dispatch(getPaymentHistory(page,per_page,from,to,query)),
    getPaymentHistoryInitial: () => dispatch(getPaymentHistoryInitial())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PreviousPayment);

