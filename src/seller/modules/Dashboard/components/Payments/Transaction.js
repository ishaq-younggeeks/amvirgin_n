import React, { Component } from 'react'
import PaymentNavigation from './PaymentNavigation';
import './Payment.css';
import {getOrderWiseTransaction} from './PaymentAction'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ReactExport from "react-data-export";
import TransactionsModal from './TransactionsModal';
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
      transactionId:""
    }
  }

  componentDidMount(){
    this.props.getOrderWiseTransaction()
  }

  ExcelSheet = () => {
    const {orderTransaction} = this.props
    let result = orderTransaction.map(({date,amount,key,transactionId,})=>{
      let finalAmount = amount.requested
      let final = {date,finalAmount,key,transactionId}
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
    return (
      <div className="container-fliud" style={{ marginTop: "5%" }}>
        <PaymentNavigation activeTab3="true" />
        <div className="datepicker row">
          <div className="date-head">
            <p>From:</p>
          </div>
          <div className="date-select">
            <input type="month" id="from" name="from" onChange={this.onChangeHandler}/>
          </div>
          <div className="date-head">
            <p>To:</p>
          </div>
          <div className="date-select">
            <input type="month" id="to" name="to" onChange={this.onChangeHandler}/>
          </div>
          <div className="search-submit" disabled={this.state.from && this.state.to ? false : true} onClick={(e)=>this.onSubmitHandler(e,null,null,this.state.from,this.state.to,null)}>
            <i className="fas fa-search"></i>
          </div>
          <div className="date-head" style={{marginLeft:"20px",marginRight:"20px"}}>
            <p>or</p>
          </div>
          <div className="form-group has-search">
          <input type="text" className="form-control" name="query" placeholder="Search by Transaction ID" onChange={this.onChangeHandler}/>
        </div>
        <div className="search-submit" disabled={this.state.query? false : true} onClick={(e)=>this.onSubmitHandler(e,null,null,null,null,this.state.query)}>
            <i className="fas fa-search"></i>
          </div>
          <div style={{marginLeft:"20px"}}>
          <ExcelFile filename="order_transaction" element={<button disabled={this.props.orderTransaction.length?false:true} onClick={() => alert("Downloading Transaction Report!")}>Download <i className="fas fa-download"></i></button>}>
                <ExcelSheet data={this.ExcelSheet} name="Payment">
                    <ExcelColumn label="ORDER DATE" value="date"/>
                    <ExcelColumn label="ORDER ID" value="key"/>
                    <ExcelColumn label="Transaction Id" value="transactionId"/>
                    <ExcelColumn label=" AMOUNT" value="finalAmount"/>
                </ExcelSheet>
            </ExcelFile>
            </div>
        </div>
        <table className="Paymenttable tablelist" style={{width:"90%"}}>
          <thead>
            <tr>
              <th>ORDER DATE</th>
              <th> ORDER ID</th>
              <th>Transaction ID</th>
              <th> AMOUNT </th>
              <th>VIEW DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {/* {this.props.orderTransaction?
            Array.from(this.props.orderTransaction).map((item,index)=>
            <tr key={item.key}> */}
            {/* <td>{item.date}</td>
            <td>{item.key}</td>
            <td>{item.transactionId}</td>
            <td>{item.amount.requested}</td> */}
            <tr>
            <td>8th Jan 2021</td>
            <td>2</td>
            <td>9879879812111</td>
            <td>6000</td>
            <td><button
                className="btn toolnewtip"
                onClick={() => {
                // localStorage.setItem("transaction_id", item.transactionId);
                this.setState({ transactionId: "123456789" });
                this.openModal()
                }}
                >
                <i className="fas fa-eye" />
                <span className="tooltiptext">View</span>
                </button></td>
            </tr>
              {/* :null} */}
          </tbody>
        </table>
        <TransactionsModal 
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={this.customStyles}
        transactionId={this.state.transactionId}
        />
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



