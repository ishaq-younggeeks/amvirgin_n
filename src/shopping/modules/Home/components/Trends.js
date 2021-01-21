import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import {productData} from '../shoppingHomeReducer';

class Trends extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="trends specific">
                <h4>Trending Now </h4>
                <div className="row">
                    {this.props.trendingNow ? 
                    this.props.trendingNow.map(data=>{
                        return(
                            <div className="col-md-3 trendpartslides">
                                <Link key={data.key} onClick={() => this.props.productData(data.key, null, null, this.props.history)}>
                                <div className="trs"><img className="trendimg" src={data.poster?data.poster:process.env.PUBLIC_URL+'/img/default.png'} alt="" style={{objectFit:'cover',objectPosition:'center center'}} />
                                    <div className="centerword">
                                        <p className="set1">{data.name}</p>
                                        <p className="set2">Upto 30% off</p>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        )
                    })
                    :
                    <div className="col-md-3 ">
                    <div className="trs"><img className="trendimg" src={process.env.PUBLIC_URL + '/img/default.png'} alt="" style={{objectFit:'cover',objectPosition:'center center'}} />
                        <div className="centerword">
                            <p className="set1">Empty</p>
                            <br/>
                            <p className="set2">Upto 30% off</p>
                        </div>
                    </div>
                </div>
                    }            
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return ({})
};
  
const mapDispatchToProps = (dispatch) => {
    return({
      productData:(id,sortKey,currentPage,history) => dispatch(productData(id,sortKey,currentPage,history)),
    })
}
  
export default connect (mapStateToProps, mapDispatchToProps)(Trends);
