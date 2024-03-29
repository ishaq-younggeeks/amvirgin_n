import React,{Component,useState,useRef} from 'react'
import {connnect, connect} from 'react-redux'
import MyOrderNavigation from './MyOrderNavigation';
import {myOrderList,FilterBySearch,clearState} from './sellerOrderAction'
import { Link } from "react-router-dom";
import Filter from "./Filter"

 class OrdersCancelled  extends Component {
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
    maxPage:1
    }
  };
  
  componentDidMount = () => {
    this.props.myOrderList("cancelled", 1, 10);
  };

  componentDidUpdate(prevprops,prevstate){
    if (prevprops.metaData !== this.props.metaData) {
      console.log("MetaDate in Order Canceller", this.props.metaData)
      this.setState({
        maxPage: this.props.metaData.last_page,
      });
    }
  }

  render() {
    console.log("every",this.props.activeState)
    return (
      <React.Fragment>
         <div className="card ordercard ordertable" style={{padding:'0px 0'}}>
      <MyOrderNavigation activeTab3={true}/>
        <div className="row" style={{padding:'20px'}}>
        <Filter metaData={this.props.metaData} maxPage = {this.state.maxPage} myOrderList={this.props.myOrderList} activeState={"cancelled"} {...this.props}/>
          < br/>
          < br/>
          <table className="tablelist" style={{width:'100%'}}>            
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Cancelled By</th>
                <th>Cancellation Reason</th>
                <th>Cancellation Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
             
            {this.state.search===true
            ?
            (
              this.state.items.map((data,i)=>
              i<=this.state.pagination-1 ?
              <tr key={data.key}>
                <td>{data.key}</td>  
                <td>{data.quantity}</td>  
                <td>{data.orderDate}</td>
                <td>{data.status}</td>
                <td>{data.cancelledBy ? data.cancelledBy : "N/A"}</td>
                <td>{data.cancellationReason ? data.cancellationReason : "N/A"}</td>
                <td>{data.cancelledOn ? data.cancelledOn : "N/A"}</td>
                  <td>
                    <button className="btn toolnewtip" onClick={() => { localStorage.setItem('orderId',data.key) }}>
                      <Link to="/seller/dashboard/vieworders">
                        <i className="fas fa-eye" />                  
                        <span class="tooltiptext">View</span>
                      </Link>
                    </button>         
                  </td>
                </tr>
              :
              null  
              )
            )
            :            
            (Array.from(this.props.ordersList).map((data,i)=>
              <tr key={data.key}>
                <td>{data.key}</td>
                <td>{data.quantity}</td>  
                <td>{data.orderDate}</td>
                <td>{data.status}</td>
                <td>{data.cancelledBy ? data.cancelledBy : "N/A"}</td>
                <td>{data.cancellationReason ? data.cancellationReason : "N/A"}</td>
                <td>{data.cancelledOn ? data.cancelledOn : "N/A"}</td>
                <td>
                  <button className="btn toolnewtip" onClick={() => { localStorage.setItem('orderId',data.key) }}>
                    <Link to="/seller/dashboard/vieworders">
                        <i className="fas fa-eye" />                  
                        <span className="tooltiptext">View</span>
                    </Link>
                  </button>
                </td>
              </tr>
            ))
            }             
            </tbody>
          </table>
        </div>
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
      myOrderList: (type, current, perPage) => dispatch(myOrderList(type, current, perPage)),
      FilterBySearch:(currentPage,perPage,query,status) => dispatch(FilterBySearch(currentPage,perPage,query,status)),
      clearState:(state,type) => dispatch(clearState(state,type))

  });
}


export default connect(mapStateToProps,mapDispatchToProps)(OrdersCancelled);