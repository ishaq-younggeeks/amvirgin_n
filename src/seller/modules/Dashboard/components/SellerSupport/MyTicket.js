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
         <div className="container-fliud" style={{marginTop:"6%"}}>
          <div className="c-row row" style={{margin:"0px 20px", alignItems:"center"}}>
            <h3 className="c-row" style={{marginTop:"20px"}}>Your Ticket DashBoard</h3>
              <div style={{right:"20px",position:"absolute", marginTop:"10px"}}>
              <Link className="btn btn-outline-dark" to="/seller/dashboard/support">Ask for Query</Link>  
              </div>
          </div>
        <hr className="c-row"/>
        <table className="Paymenttable" style={{width:"80%"}}>
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
      </div>
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