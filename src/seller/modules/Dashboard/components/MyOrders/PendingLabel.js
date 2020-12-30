import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {downloadLabel} from './global'
import Filter from "./Filter"

export default class PendingLabel extends Component {
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
    bulkArray: [],
    }

  };

  onchangeBulkHandler = (e,key) => {
    let bulk_list = this.state.bulkArray;
    let check = e.target.checked;
    if(check){
      this.setState({
        bulkArray: [...this.state.bulkArray, key]
      },console.log("list state",this.state))
  }else{ 
      var index = this.state.bulkArray.indexOf(key);
      if (index > -1) {
        bulk_list.splice(index, 1);
          this.setState({
            bulkArray: bulk_list
          },console.log("list state",this.state))
      } 
  }
  }

  selectAllOrder = (e) => {
    let bulk_array;
    bulk_array = this.props.ordersList.map((item,index)=>{
      return item.key
    })
    let check = e.target.checked;
    if(check)
    this.setState({selectAll:true,bulkArray:bulk_array})
    else
    this.setState({selectAll:true,bulkArray:[]})
  }

  printLabel = () => {
downloadLabel(this.state.bulkArray,1);
    this.setState({bulkArray:[]})
  }

 
  render() {
    return (
      <React.Fragment>
         <hr/>
         <div className="row" style={{ marginLeft: "15px" }}>
          <div style={{ padding: "5px" }}>Action in Bulk</div>
          <button className="btn btn-outline-primary" onClick={this.printLabel} style={{marginLeft:"10px"}} disabled={this.state.bulkArray.length===0?true:false}>             
                      Print Label
                  </button>
         
        </div>
        <div className="row" style={{padding:'20px'}}>
        <Filter metaData={this.props.metaData} maxPage = {this.props.maxPage} myOrderList={this.props.myOrderList} activeState={this.props.activeState} {...this.props}/>

          < br/>
          < br/>
          <table className="tablelist" style={{width:'100%'}}>            
            <thead>
              <tr>
              <th><input type="checkbox" style={{width:'15px'}} onChange={this.selectAllOrder}></input></th>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
             
            {            
            (this.props.ordersList.length ? this.props.ordersList.map((data,i)=>
              i<=this.state.pagination-1 ? 
              <tr key={data.key}>
                <td className="checkbox" ><input type="checkbox" style={{width:'15px'}} onChange={(e)=>this.onchangeBulkHandler(e,data.key)} checked={this.state.bulkArray.indexOf(data.key)===-1?false:true}></input></td>
                <td>{data.key}</td>
                <td>{data.quantity}</td>  
                <td>{data.orderDate}</td>
                <td>{data.status}</td>
                <td>
                  <button className="btn toolnewtip" onClick={() => { localStorage.setItem('orderId',data.key) }}>
                    <Link to="/seller/dashboard/vieworders">
                        <i className="fas fa-eye" />                  
                        <span className="tooltiptext">View</span>
                    </Link>
                  </button>
                  <button className="btn btn-outline-primary" onClick={() => downloadLabel([data.key],1)} style={{marginLeft:"10px"}}>             
                      Print Label
                  </button>              
                </td>
              </tr>
              :
              null
              
            ):null)
            }             
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}

