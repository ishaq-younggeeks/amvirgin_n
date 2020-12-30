import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Filter from "./Filter"

export default class PandingLabel extends Component {
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
    }

  };
  render() {
    return (
      <React.Fragment>
        <div className="row" style={{padding:'20px'}}>
        <Filter metaData={this.props.metaData} maxPage = {this.props.maxPage} myOrderList={this.props.myOrderList} activeState={this.props.activeState} {...this.props}/>

          < br/>
          < br/>
          <table className="tablelist" style={{width:'100%'}}>            
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Delivered On</th>
                <th>View Order</th>
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
                <td>{data.status === "delivered" ? data.deliveredOn : "N/A"}</td>
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
              i<=this.state.pagination-1 ? 
              <tr key={data.key}>
                <td>{data.key}</td>
                <td>{data.quantity}</td>  
                <td>{data.orderDate}</td>
                <td>{data.status}</td>
                <td>{data.status === "delivered" ? data.deliveredOn : "N/A"}</td>
                <td>
                  <button className="btn toolnewtip" onClick={() => { localStorage.setItem('orderId',data.key) }}>
                    <Link to="/seller/dashboard/vieworders">
                        <i className="fas fa-eye" />                  
                        <span className="tooltiptext">View</span>
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
      </React.Fragment>
    )
  }
}
