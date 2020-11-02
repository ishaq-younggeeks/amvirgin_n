import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Chart from "./components/Chart/Chart";
import { connect } from 'react-redux';
import { Fetchdata } from './components/Profile/ProfileAction'


class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.Fetchdata();
  }

  render() {
    if (this.props.profileData) {
      return (
        <div className="card allproductcard" style={{ marginTop: '4%', alignItems: 'center' ,padding: '15px 5px' }}>
          <div className="row" style={{ marginTop: '20px' }} >
            <div className="col-sm-12" >
              <div className="whitepbox">
                <div className="row" style={{ height: '50px', alignItem: 'center' }}>
                  <div className="col-sm-1">
                    {this.props.profileData.avatar ?
                      <img src={this.props.profileData.avatar} style={{ width: '50px', objectFit: 'cover', height: '50px', borderRadius: '100%' }} />
                      :
                      <img src="https://miro.medium.com/max/480/0*WK_vAxJo4O7Kdq3j.png" style={{ width: '50px', objectFit: 'cover', height: '50px', borderRadius: '100%' }} />
                    }
                  </div>
                  <div className="col-sm-9">
                    <p style={{ fontSize: '20px', padding: '10px 0', fontWeight: '400px' }}>{this.props.profileData.name}</p>
                  </div>
                  <div className="col-sm-2">
                    <button style={{ background: '#000', color: '#fff', float: 'right', padding: '6px 10px', width: '120px', border: 'none', borderRadius: '20px' }}>
                      <Link style={{ color: '#fff' }} to='/seller/dashboard/profile'>View</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4" style={{ marginTop: '20px' }}>
              <div className="pbox hov">
                <h1>1200</h1>  <i className="fas fa-clipboard-list fa-2x"></i>
                <h5>Products</h5>
              </div>
            </div>
            <div className="col-sm-4" style={{ marginTop: '20px' }}>
              <div className="pbox hov">
                <h1>112900</h1> <i className="fas fa-dollar fa-2x"></i>
                <h5>Sales</h5>
              </div>
            </div>
            <div className="col-sm-4" style={{ marginTop: '20px' }}>
              <div className="pbox hov">
                <h1>210000</h1> <i className="fas fa-boxes fa-2x"></i>
                <h5>Orders</h5>
              </div>
            </div>

            <div className="col-sm-8" style={{ marginTop: '20px' }}>
              <div className="pbox">
                <div className="row">
                  <div className="col-sm-6 fbox">
                    <div className="row">
                      <div className="col-sm-6">
                        <p style={{ fontWeight: '500', marginBottom: '0px' }}>New Orders</p>
                        <h1>12</h1>
                      </div>
                      <div className="col-sm-6">
                        <p style={{ fontWeight: '500', marginBottom: '0px' }}>Urgent Orders</p>
                        <h1>10</h1>
                      </div>
                      <div className="col-sm-6">
                        <p style={{ fontWeight: '500', marginBottom: '0px' }}>Delivered Orders</p>
                        <h1>20</h1>
                      </div>
                      <div className="col-sm-6">
                        <p style={{ fontWeight: '500', marginBottom: '0px' }}>Canceled Orders</p>
                        <h1>10</h1>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <img src={process.env.PUBLIC_URL + "/img/delivery_boy2.jpg"} style={{ width: '215px', height: '130px', float: 'right' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4" style={{ marginTop: '20px' }}>
              <div className="pbox">
                Gross Revenue<br />
                <h1>&#8377; 300</h1>
                <br />
                <button className='btn mybtn'>View Full Stats</button>
              </div>
            </div>
            {/* <div className="col-sm-12" style={{marginTop:'20px'}}>
            <div className="pbox">
              <Chart />
            </div>
          </div> */}
          </div>

        </div>
      )
    }
    else {
      return (
        <div className="" style={{ marginTop: '10px' }}>
          <h1>Error 101</h1>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return ({
    profileData: state.profile.data
  })
}


const mapDispatchToProps = (dispatch) => {
  return ({
    Fetchdata: () => dispatch(Fetchdata())

  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
