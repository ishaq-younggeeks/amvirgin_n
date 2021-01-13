import React, { Component } from 'react'
import {connect} from 'react-redux'
import MyProductNavigation from './MyProductNavigation'
import {getBrandLists} from '../sellerAddProductAction'
 class Brandlist extends Component {
   constructor(){
     super();
     this.state = {
       query: ""
     }
   }

  searching = (e) => {
    e.preventDefault();
    this.setState({
      query: e.target.value
    })
  }

  componentDidMount(){
    this.props.getBrandLists()
  }
  render() {
    const allBrandList = this.props.brandList.filter((item) => {
      return item.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1;
      });
    console.log("Search: ", this.state.query);
    return (
      <div className="card ordercard ordertable"  style={{ padding: "20px 20px", marginTop: "6%" }}>
        <MyProductNavigation activeTab2={true} />
        <div style={{display: "flex", alignItems:"center"}}><label htmlFor="search" className="search" style={{margin:"0 5px 0 25px"}}>Search Here :</label>
            <form onSubmit={this.onSubmit}>
              <input
                type="search"
                name="search"
                id="search"
                onChange={this.searching}
                placeholder="Enter Brand Name"
                style={{
                  width: "90%",
                  borderRadius: "5px",
                  height: "37px",
                  background: "#efefef",
                  padding: "10px",
                  margin: "5px 0",
                  border: "none",
                }}
              />
            </form>
          </div>
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
            {allBrandList?
            allBrandList.map((item,index)=>
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
