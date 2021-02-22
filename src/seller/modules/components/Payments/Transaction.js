import React, { Component } from 'react'
import PaymentNavigation from './PaymentNavigation';
import './Payment.css';
import {getTransactionsOverview, getTransactionsFromTo, getTransactionsSearch} from './PaymentAction'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ReactExport from "react-data-export";
import TransactionsModal from './TransactionsModal';
import PaymentFilter from "./PaymentFilter";
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
      per_page:"",
      modalIsOpen: false,
      paymentsDetails: [],
      transactionId: "",
      transactionError: "",
      pagination: 10,
      maxPage: 1,
      maxDate: new Date().toISOString().slice(0, 10)
    }
  }

  componentDidMount(){
    this.props.getTransactionsOverview(1, 10)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.metaData !== this.props.metaData){
      this.setState({
        maxPage: this.props.metaData.last_page
      });
    };
  };

  ExcelSheet = () => {
    const {orderTransaction} = this.props
    let result = orderTransaction.map(({bankAccount, referenceId, amount, paidAt})=>{
      let finalAmount = amount.received
      let final = {bankAccount, referenceId, finalAmount, paidAt}
      return final
    })
    return result
  }

  onChangeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value},console.log("current state",this.state))
    
  }

  validate = () => {
    let transactionError = "";
    if(!this.state.query.trim()){
      transactionError = "Field cannot be blank!"
    }
    else if(this.state.query.length < 8){
      transactionError = "Enter atleast 8 Characters!"
    }

    if(transactionError){
      this.setState({transactionError})
      return false
    }
    return true;
  }

  onSubmitHandler1 = (e,page=null,per_page=null,from=null,to=null,query=null) => {
    e.preventDefault()
    this.props.getTransactionsFromTo(page,per_page,from,to,query);
  }

  onSubmitHandler2 = (e,page=null,per_page=null,from=null,to=null,query=null) => {
    e.preventDefault();
    let isValid = this.validate();
    if(isValid){ 
    this.props.getTransactionsSearch(page,per_page,from,to,query);
    this.setState({
      transactionError: ""
      });
    }
  }

  customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  }

  render() {
    console.log("home of payment");
    console.log("metaData Transactions :", this.props.metaData)
    return (
      <div className="container-fliud" style={{ marginTop: "5%" }}>
        <PaymentNavigation activeTab3="true" />
        <div className="datepicker row">
        <PaymentFilter metaData={this.props.metaData} maxPage = {this.state.maxPage} myOrderList={this.props.getTransactionsOverview} {...this.props}/>
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
          <input type="text" className="form-control" name="query" placeholder="Search by Transaction ID" onChange={this.onChangeHandler}/>
          <p style={{color:"red"}}>{this.state.transactionError}</p>
        </div>
        <div className="search-submit" disabled={this.state.query? false : true} onClick={(e)=>this.onSubmitHandler2(e,null,null,null,null,this.state.query)}>
            <i className="fas fa-search"></i>
          </div>
          <div style={{marginLeft:"20px"}}>
          <ExcelFile filename="Order_Transaction" element={<button style={{fontSize:"18px", padding:"5px", borderRadius:"5px" }} disabled={this.props.orderTransaction.length?false:true} onClick={() => alert("Downloading Transaction Report!")}>Download <i className="fas fa-download"></i></button>}>
                <ExcelSheet data={this.ExcelSheet} name="Payment">
                    <ExcelColumn label="BANK ACCOUNT" value="bankAccount"/>
                    <ExcelColumn label="TRANSACTION ID" value="referenceId"/>
                    <ExcelColumn label="AMOUNT RECEIVED" value="finalAmount"/>
                    <ExcelColumn label="PAID AT" value="paidAt"/>
                </ExcelSheet>
            </ExcelFile>
            </div>
        </div>
        <table className="Paymenttable tablelist" style={{width:"90%"}}>
          <thead>
            <tr>
              <th>BANK ACCOUNT</th>
              <th>TRANSACTION ID</th>
              <th>AMOUNT RECEIVED</th>
              {/* <th>AMOUNT REQUESTED</th> */}
              <th>PAID AT</th>
              <th>VIEW DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orderTransaction && this.props.orderTransaction.length > 0 ?
            this.props.orderTransaction.map((item,index)=> (
            <tr key={item.referenceId}>
            <td>{item.bankAccount}</td>
            <td>{item.referenceId}</td>
            <td>{item.amount.received}</td>
            {/* <td>{item.amount.requested}</td> */}
            <td>{item.paidAt}</td>
            <td><button
                className="btn toolnewtip"
                onClick={() => {
                this.setState({ paymentsDetails: item.payments, 
                transactionId : item.referenceId});
                this.openModal()
                }}
                >
                <i className="fas fa-eye" />
                <span className="tooltiptext">View</span>
                </button></td>
            </tr>
            )):<tr><td colSpan="5" align="center"><h3>No Data to Display :(</h3></td></tr>}
          </tbody>
        </table>
        <TransactionsModal 
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={this.customStyles}
        paymentsDetails={this.state.paymentsDetails}
        transactionId={this.state.transactionId}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("order transaction ",state.sellerPayment.orderTransaction)
  return {
    orderTransaction:state.sellerPayment.orderTransaction,
    metaData:state.sellerPayment.transactionsMeta
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionsOverview : (current, perPage) => dispatch(getTransactionsOverview(current, perPage)),
    getTransactionsFromTo: (page,per_page,from,to,query) => dispatch(getTransactionsFromTo(page,per_page,from,to,query)),
    getTransactionsSearch: (page,per_page,from,to,query) => dispatch(getTransactionsSearch(page,per_page,from,to,query))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderTransaction);



