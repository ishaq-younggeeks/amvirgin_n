import React, { Component } from 'react'
import {connect} from 'react-redux'
import MyProductNavigation from './MyProductNavigation'
import {getBrandLists} from '../sellerAddProductAction'
 class Brandlist extends Component {


  componentDidMount(){
    this.props.getBrandLists()
  }
  render() {
    const {brandList} = this.props
    return (
      <div className="card ordercard ordertable"  style={{ padding: "20px 20px", marginTop: "6%" }}>
        <MyProductNavigation activeTab2={true} />
         <table className="Paymenttable tablelist" style={{width:"95%"}}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th> Attributes</th>
              <th>Status</th>
              <th>Logo</th>
              <th> Created Time </th>
            </tr>
          </thead>
          <tbody>
            {brandList?
            brandList.map((item,index)=>
            <tr key={index}>
              <td>{item.requestId}</td>
            <td>
              <div className="col">
              <div>{"Brand:"+item.name}</div>
              <div>{"Vertical:"+item.name}</div>
              </div></td>
            <td>{item.status}</td>
            <td><img src={item.logo?item.logo:"/images/brandlogo.png"} style={{width:"200",height:"100"}} width="200" height="100" alt="brand logo"/></td>
            <td>{new Date(item.requestTime).toDateString()}</td>
            </tr>
            )
              :null}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("current brand list ",state.sellerAddProduct)
  return {
    brandList:state.sellerAddProduct.BrandList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBrandLists : ()=> dispatch(getBrandLists())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Brandlist);
