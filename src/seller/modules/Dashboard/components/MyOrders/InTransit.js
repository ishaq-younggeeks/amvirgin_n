import React, { Component } from 'react'
import {Link} from 'react-router-dom'
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
          <div className="col-auto colwidth25">
            Show <select id="attributename" name="attributename" ref="modifierName" style={{width:'30%',margin:'5px 0',padding:"5px",border:'1px solid lightgrey', borderRadius:'3px'}} onChange={this.paginationnum} >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>                 
            </select>
          </div>
          <div style={{ padding: "5px" }}>
            <p>Items per page | 0-0 of 0 items | 1 of 1 pages</p>
          </div>
          <div>
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">
                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                </a>
              </li>
              <li class="page-item ">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  <i class="fa fa-angle-right" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-auto colwidth25">          
            <form onSubmit={this.onSubmit} >             
              <input type="search" name="search" onChange={this.searchHere} placeholder="search"style={{width:'80%',borderRadius:'5px',height:'37px',background:'#efefef',padding:'10px',margin:'5px 0',border:'none'}}/>
              <button type="submit" style={{width:'20%',background:'#bf0000',border:'none',color:'#fff',borderRadius:'0 5px 5px 0',height:'37px',position:'relative',left:'-5px'}}><i className="fa fa-search"/></button>
            </form>
          </div>
          < br/>
          < br/>
          <table className="tablelist" style={{width:'100%'}}>            
            <thead>
              <tr>
                <th>OrderId</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Status</th>
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
            (this.props.ordersList.map((data,i)=>
              i<=this.state.pagination-1 ? 
              <tr key={data.key}>
                <td>{data.key}</td>
                <td>{data.quantity}</td>  
                <td>{data.orderDate}</td>
                <td>{data.status}</td>
                <td>
                  <button className="btn toolnewtip" onClick={() => { localStorage.setItem('orderId',data.key) }}>
                    <Link to="/seller/dashboard/vieworders">
                        <i className="fas fa-eye" />                
                        <span class="tooltiptext">View</span>
                    </Link>
                  </button>
                  <button className="btn btn-outline-primary" onClick={() => { this.props.changeOrderStatus(data.key,"delivered") }} style={{marginLeft:"10px"}}>             
                     Mark Delivered
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
