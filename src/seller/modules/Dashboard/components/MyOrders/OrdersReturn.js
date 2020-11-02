import React,{Component,useState,useRef} from 'react'
import {connnect, connect} from 'react-redux'
import MyOrderNavigation from './MyOrderNavigation';
import {myOrderList,FilterBySearch} from './sellerOrderAction'
import { Link } from "react-router-dom";
import qs from "query-string";
import ReturnProcessing from "./ReturnProcessing"
import ReturnProcessed from "./ReturnProcessed"
 class OrdersReturn  extends Component {
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

    }

  };


  componentDidMount = () => {

    let query = qs.parse(this.props.location.search)
    console.log("parsed query",query);
    this.setState({activeState:query.activeState})
    this.props.myOrderList(query.activeState);
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
      case "refund-processing":
        return <ReturnProcessing ordersList={this.props.ordersList} changeOrderStatus={this.props.changeOrderStatus} metaData = {this.props.metaData} maxPage={this.state.maxPage} myOrderList={this.props.myOrderList} activeState={this.state.activeState}{...this.props}/>
      case "refunded":
        return <ReturnProcessed ordersList={this.props.ordersList} metaData = {this.props.metaData} maxPage={this.state.maxPage} myOrderList={this.props.myOrderList} activeState={this.state.activeState}{...this.props}/>
      default:
        return <ReturnProcessing ordersList={this.props.ordersList} changeOrderStatus={this.props.changeOrderStatus} metaData = {this.props.metaData} maxPage={this.state.maxPage} myOrderList={this.props.myOrderList} activeState={this.props.activeState}{...this.props}/>;
  
    }
  }
  render() {
    return (
      <React.Fragment>
         <div className="card ordercard ordertable" style={{padding:'0px 0'}}>
      <MyOrderNavigation activeTab2={true}/>
      <div className="row">
      <Link
                className=""
                onClick={()=>this.setActive("refund-processing")}
                to={{
                  pathname: `/seller/dashboard/myorders/returns-order`,
                  search: this.activeComponent("refund-processing"),
                }}
              >
          <div className={this.state.activeState==="refund-processing"?'ordertiles activetile':'ordertiles'} style={{marginLeft:"20px"}}>
          
            Pending
           
          </div>
          </Link>
          <Link
                className=""
                onClick={()=>this.setActive("refunded")}
                to={{
                  pathname: `/seller/dashboard/myorders/returns-order`,
                  search: this.activeComponent("refunded"),
                }}
              >
          <div className={this.state.activeState==="refunded"?'ordertiles activetile':'ordertiles'}>
          
            Returned
           
          </div>
          </Link>
        </div>
        {this.renderComponent()}
        </div>
      </React.Fragment>
    )
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
      myOrderList: (id,type) => dispatch(myOrderList(id,type)),
      FilterBySearch:(currentPage,perPage,query,status) => dispatch(FilterBySearch(currentPage,perPage,query,status))

  });
}


export default connect(mapStateToProps,mapDispatchToProps)(OrdersReturn);