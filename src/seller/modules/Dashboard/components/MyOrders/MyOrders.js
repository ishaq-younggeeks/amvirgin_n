import "./MyOrders.css";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import React, { Component } from "react";
import qs from "query-string";
import MyOrderNavigation from "./MyOrderNavigation"
import PlacedOrder from "./PlacedOrder"
import PendingLabel from "./PendingLabel";
import PendingRTD from './PendingRTD'
import PendingHandover from './PendingHandover'
import Dispatched from './Dispatched'
import InTransit from './InTransit'
import Delivered from './Delivered'
import { myOrderList,changeOrderStatus,downloadLabel,FilterBySearch,clearState,changeOrderStatusInBulk} from './sellerOrderAction';

class MyOrders extends Component {
  constructor(props){
    super(props)
    this.state = {
    users: [],
    numrow: '',
    fetchError: null,
    searching:null,
    items:[],
    search:false,
    pagination:10,
    activeState:"",
    maxPage:1
  };   
  this.searchHere=this.searchHere.bind(this);
  this.onSubmit=this.onSubmit.bind(this); 
  this.paginationnum=this.paginationnum.bind(this);
 }

 activeComponent = (type) => {
  const query = { activeState: type };
  const searchString = qs.stringify(query);
  return searchString;
};

setActive = (type) => {
  this.setState({activeState:type})
  this.props.myOrderList(type);
}

renderComponent = () => {


  switch (this.state.activeState) {
    case "placed":
      return <PlacedOrder ordersList={this.props.ordersList} changeOrderStatus={this.props.changeOrderStatus} metaData = {this.props.metaData} maxPage={this.state.maxPage} myOrderList={this.props.myOrderList} activeState={this.state.activeState}{...this.props}/>
    case "ready-for-dispatch":
      return <PendingLabel ordersList={this.props.ordersList} downloadLabel={this.props.downloadLabel} metaData = {this.props.metaData} maxPage={this.state.maxPage} myOrderList={this.props.myOrderList} activeState={this.state.activeState}{...this.props}/>
    case "pending-dispatch":
      return <PendingHandover ordersList={this.props.ordersList} changeOrderStatus={this.props.changeOrderStatus} metaData = {this.props.metaData} maxPage={this.state.maxPage} myOrderList={this.props.myOrderList} activeState={this.state.activeState}{...this.props}/>
    case "dispatched":
      return <Dispatched ordersList={this.props.ordersList} changeOrderStatus={this.props.changeOrderStatus} metaData = {this.props.metaData} maxPage={this.state.maxPage} myOrderList={this.props.myOrderList} activeState={this.state.activeState}{...this.props}/>
    case "delivered":
      return <Delivered ordersList={this.props.ordersList} changeOrderStatus={this.props.changeOrderStatus} metaData = {this.props.metaData} maxPage={this.state.maxPage} myOrderList={this.props.myOrderList} activeState={this.state.activeState}{...this.props}/>
    default:
      return <PlacedOrder ordersList={this.props.ordersList} changeOrderStatus={this.props.changeOrderStatus} metaData = {this.props.metaData} maxPage={this.state.maxPage} myOrderList={this.props.myOrderList} activeState={this.state.activeState}{...this.props}/>

  }
}


  searchHere=(e)=>{
    this.setState({searching:e.target.value});
  }

  onSubmit(e){
    e.preventDefault(); 
    let store=[]; 
    this.props.ordersList.map(data=>{
      let items = data.customer.email;
      let itemsname = data.customer.name;
      let itemsmob = data.customer.mobile;
      let itemsorderid = data.orderId;
      
      if(items.toLowerCase().includes(this.state.searching.toLowerCase())          
      ||itemsname.toLowerCase().includes(this.state.searching.toLowerCase())){   
        store.push(data);
      }  
      
    })
    this.setState({items:store});
    this.setState({search:true});
  }

  paginationnum(e){
    e.preventDefault()
    this.setState({
      pagination:e.target.value
    })
  }
  componentDidMount = () => {
    let query = qs.parse(this.props.location.search)
    console.log("parsed query",query);
    this.setState({activeState:query.activeState})
    this.props.myOrderList(query.activeState,1,10);
  };

  componentDidUpdate(prevprops,prevstate){
    if(prevprops.location.search!==this.props.location.search)
    {
      let query = qs.parse(this.props.location.search)
      this.setState({activeState:query.activeState})
      this.props.myOrderList(query.activeState);
    }
      if (prevprops.metaData !== this.props.metaData) {
        this.setState({
          maxPage: Math.floor(
            this.props.metaData.pagination.pages
          ),
        });
      }
    

  }

  render() {
     return (
      <div className="card ordercard ordertable" style={{padding:'0px 0'}}>
        <MyOrderNavigation activeTab1={true} />
        <div style={{background:'#efefefb8',padding:'10px 20px'}}>
          <h4 style={{ textAlign: "left", fontWeight: "500", color: "#000"}}>My Orders</h4>
        </div>
        <div style={{margin:"10px 0 0 10px"}}>
          Order Process
        </div>  
        <div className="row">
        <Link
                className=""
                onClick={()=>this.setActive("placed")}
                to={{
                  pathname: `/seller/dashboard/myorders`,
                  search: this.activeComponent("placed"),
                }}
              >
          <div className={this.state.activeState==="placed"?'ordertiles activetile':'ordertiles'} style={{marginLeft:"20px"}}>
          
            New Order
           
          </div>
          </Link> 
          <Link
                className=""
                onClick={()=>this.setActive("ready-for-dispatch")}
                to={{
                  pathname: `/seller/dashboard/myorders`,
                  search: this.activeComponent("ready-for-dispatch"),
                }}
              >
          <div className={this.state.activeState==="ready-for-dispatch"?'ordertiles activetile':'ordertiles'}>
          
            Pending Label
           
            
          </div>
          </Link>
          <Link
                className=""
                onClick={()=>this.setActive("pending-dispatch")}
                to={{
                  pathname: `/seller/dashboard/myorders`,
                  search: this.activeComponent("pending-dispatch"),
                }}
              >
          <div className={this.state.activeState==="pending-dispatch"?'ordertiles activetile':'ordertiles'}>
          
            Pending Handover
           
          </div>
          </Link>
          <Link
                className=""
                onClick={()=>this.setActive("dispatched")}
                to={{
                  pathname: `/seller/dashboard/myorders`,
                  search: this.activeComponent("dispatched"),
                }}
              >
          <div className={this.state.activeState==="dispatched"?'ordertiles activetile':'ordertiles'} style={{marginLeft:"20px"}}>
          
                Dispatched
           
          </div>
          </Link>
          <Link
                className=""
                onClick={()=>this.setActive("delivered")}
                to={{
                  pathname: `/seller/dashboard/myorders`,
                  search: this.activeComponent("delivered"),
                }}
              >
          <div className={this.state.activeState==="delivered"?'ordertiles activetile':'ordertiles'}>
          
            Delivered
           
          </div>
          </Link>
        </div>
        {this.renderComponent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.sellerOrders)
  return ({
      ordersList:state.sellerOrders.orders,
      metaData:state.sellerOrders.metaData
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
      myOrderList: (activeState,current,perPage) => dispatch(myOrderList(activeState,current,perPage)),
      changeOrderStatus:(id,status) => dispatch(changeOrderStatus(id,status)),
      downloadLabel:(id) => dispatch(downloadLabel(id)),
      FilterBySearch:(currentPage,perPage,query,status) => dispatch(FilterBySearch(currentPage,perPage,query,status)),
      clearState:(state,type) => dispatch(clearState(state,type)),
      changeOrderStatusInBulk:(orderId,status) => dispatch(changeOrderStatusInBulk(orderId,status))


  });
}

export default connect(mapStateToProps, mapDispatchToProps )(MyOrders);
