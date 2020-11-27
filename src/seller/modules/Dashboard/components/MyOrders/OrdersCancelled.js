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

    this.props.myOrderList("cancelled");
    console.log("metadate in order canceller",this.props.metaData)
  };

  componentDidUpdate(prevprops,prevstate){
  
    if (prevprops.metaData !== this.props.metaData) {
      console.log("metadate in order canceller",this.props.metaData)
      this.setState({
        maxPage: Math.floor(
          this.props.metaData.pagination.pages
        ),
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
                <th>OrderId</th>
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
              <tr key={data.orderId}>
                <td>{data.orderNumber}</td>  
                <td>{data.quantity}</td>  
                <td>{data.orderDate}</td>
                <td>{data.status}</td>
                <td>{data.cancelledBy ? data.cancelledBy : "N/A"}</td>
                <td>{data.cancellationReason ? data.cancellationReason : "N/A"}</td>
                <td>{data.cancelledOn ? data.cancelledOn : "N/A"}</td>
                  <td>
                    <button className="btn toolnewtip" onClick={() => { localStorage.setItem('orderId',data.orderId) }}>
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
            (this.props.ordersList.map((data,i)=>
              i<=this.state.pagination-1 ? 
              <tr key={data.orderId}>
                <td>{data.orderNumber}</td>
                <td>{data.quantity}</td>  
                <td>{data.orderDate}</td>
                <td>{data.status}</td>
                <td>{data.cancelledBy ? data.cancelledBy : "N/A"}</td>
                <td>{data.cancellationReason ? data.cancellationReason : "N/A"}</td>
                <td>{data.cancelledOn ? data.cancelledOn : "N/A"}</td>
                <td>
                  <button className="btn toolnewtip" onClick={() => { localStorage.setItem('orderId',data.orderId) }}>
                    <Link to="/seller/dashboard/vieworders">
                        <i className="fas fa-eye" />                  
                        <span class="tooltiptext">View</span>
                    </Link>
                  </button>
                                
                </td>
              </tr>
              :
              null 
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
      myOrderList: (type) => dispatch(myOrderList(type)),
      FilterBySearch:(currentPage,perPage,query,status) => dispatch(FilterBySearch(currentPage,perPage,query,status)),
      clearState:(state,type) => dispatch(clearState(state,type))

  });
}


export default connect(mapStateToProps,mapDispatchToProps)(OrdersCancelled);