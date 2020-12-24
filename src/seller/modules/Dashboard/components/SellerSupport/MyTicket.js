import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getMyTickets} from './SellerSupportAction'
import "./Support.css"

 class MyTicket extends Component {

  componentDidMount(){
    this.props.getMyTickets()
  }
  render() {
    return (
      <React.Fragment>
         <div className="row" style={{marginTop:"5%", marginLeft: "4px"}}>
            <h2>Your Ticket DashBoard</h2>
              <div className="btn btn-outline-dark" style={{right:"20px", position:"absolute"}}>
              <Link to="/seller/dashboard/support">Ask for Query</Link>  
              </div>
        </div> 
        <hr/>
        <table className="Paymenttable" style={{width:"80%", marginLeft: "0px"}}>
          <thead>
            <tr>
              <th>S NO.</th>
              <th>ISSUE TYPE</th>
              <th>STATUS</th>
              <th>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {this.props.mytickets.length?this.props.mytickets.map((item,index) => {
              return (
              <tr>
              <td>{index +1}</td>
            <td>{item.issue}</td>
              <td>{item.status}</td>
              <td>{item.description}</td>
            </tr>)
            }):null}
            
            
          </tbody>
        </table>
      </React.Fragment>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    mytickets:state.sellerSupport.ticketList
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getMyTickets: () =>dispatch(getMyTickets())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(MyTicket);