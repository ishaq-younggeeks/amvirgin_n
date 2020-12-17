import React, { Profiler, Component } from "react";
import "./Sales.css";
import PieChart from "react-minimal-pie-chart";
import { getSales } from "./SellerGrowthAction";
import { connect } from "react-redux";

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      Tabtwo: null,
      Tabthree: null,
    };
  }

  componentDidMount() {
    this.props.getSales(7);
  }

  tabFilter(active, days) {
    this.setState({ activeTab: active });
    this.props.getSales(days);
  }
  render() {
    const { salesDetail } = this.props;
    return (
      <div className="c-margin container-fliud emp-profile">
        <div className="row">
          <div className="col-md-12">
            <div className="row tabin">
              <div className="col-md-2">Showing results for</div>
              <div className="col-md-10">
                <button
                  className={
                    this.state.activeTab === 1 ? "tablinks active" : "tablinks"
                  }
                  onClick={() => this.tabFilter(1, 7)}
                >
                  Last 7 days{" "}
                </button>
                <button
                  className={
                    this.state.activeTab === 2 ? "tablinks active" : "tablinks"
                  }
                  onClick={() => this.tabFilter(2, 30)}
                >
                  Last 30 days
                </button>
                <button
                  className={
                    this.state.activeTab === 3 ? "tablinks active" : "tablinks"
                  }
                  onClick={() => this.tabFilter(3, 90)}
                >
                  Last 90 days
                </button>
              </div>
            </div>

            <div id="London" className="tabcontent">
              {this.state.activeTab === 1 ? (
                <p>
                  <b>Your Performance for Last 7 days </b>
                </p>
              ) : this.state.activeTab === 2 ? (
                <p>
                  <b>Your Performance for Last 30 days </b>
                </p>
              ) : this.state.activeTab === 3 ? (
                <p>
                  <b>Your Performance for Last 90 days </b>
                </p>
              ) : (
                <p>Your Performance for 0 days </p>
              )}
              <div className="row">
                <div className="col-md-12">
                  <h4>Sales</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="card-container">
                    Sales in Rupees >
                    <br />
                    <br />
                    {salesDetail.sales ? (
                      <h2>{salesDetail.sales.amount}</h2>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card-container">
                    Sales in Unit > <br />
                    <br />
                    {salesDetail.sales ? (
                      <h2>{salesDetail.sales.units}</h2>
                    ) : null}
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <h4>Product Rating</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="card-container">
                    Averager product in Rating > <br />
                    <br />
                    {salesDetail.product ? <h2>{salesDetail.product.rating}</h2> : null}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card-container">
                    Customer Return in Unit > <br />
                    <br />
                    {salesDetail.product ? <h2>{salesDetail.customerReturns}</h2> : null}
                  </div>
                </div>
              </div>
              <br />
              {/* <div className="row"> 
                                <div className="col-md-12">
                                    <h4>Service Quality</h4>
                                </div>
                            </div>                   
                            <div className="row">                    
                                <div className="col-md-3">
                                    <div className="card-container">                               
                                        Seller Cancellation >   <br/> 
                                        <br/> 
                                        <h2>0</h2>          
                                    </div> 
                                </div>                  
                                <div className="col-md-3">
                                    <div className="card-container">                               
                                        Dispatch Breaches>   <br/> 
                                        <br/> 
                                        <h2>0</h2>          
                                    </div> 
                                </div>                 
                                <div className="col-md-3">
                                    <div className="card-container">                               
                                        Fast Fulfilment>   <br/>   
                                        <br/> 
                                        <h2>0</h2>          
                                    </div> 
                                </div>           
                                <div className="col-md-3">
                                    <div className="card-container">                               
                                        Pickup Reattempts>   <br/> 
                                        <br/> 
                                        <h2>0</h2>          
                                    </div> 
                                </div>
                            </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    salesDetail: state.sellerGrowth.salesDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSales: (days) => dispatch(getSales(days)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
