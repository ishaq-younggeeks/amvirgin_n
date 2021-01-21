import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../style.css';
import {productData} from '../shoppingHomeReducer';
import {connect} from "react-redux";

class PopularStuff extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="specific">
                <h4 className="fivesechead">Popular Stuff</h4>
                <div className="fivesections row">
                    <div className="col-md-6">
                        {this.props.popularStuff ? this.props.popularStuff.map((data, i) =>
                            i == 1 ?
                                <div className="imgsmall containerimg4 bigimg">
                                    <div className="fivedetailsbig">
                                        <h3 style={{ color: '#fff' }}>{data.name} </h3>
                                        <h5 style={{ color: '#fff' }}> Upto 30% off </h5>
                                    </div>
                                    <Link onClick={() => this.props.productData(data.key, null, null, this.props.history)}>
                                        <div className="mainimg4">
                                            <img className="image majorimg" src={data.poster?data.poster:process.env.PUBLIC_URL+'/img/default.png'} alt="" style={{ objectFit: 'cover', objectPosition: 'center center' }} />
                                        </div>
                                        <div className="middle">
                                            <div className="text snowbtn">SHOP NOW</div>
                                        </div>
                                    </Link>
                                </div>
                            :null                                
                        ) 
                        : 
                        <div className="imgsmall containerimg4 bigimg">
                            <div className="fivedetailsbig">
                                <h3 style={{ color: '#fff' }}>Not Selected</h3>
                                <h5 style={{ color: '#fff' }}> Empty </h5>
                            </div>
                            <Link to="/" >
                                <div className="mainimg4">
                                    <img className="image majorimg" src={process.env.PUBLIC_URL + '/img/default.png'} alt="" style={{ objectFit: 'cover', objectPosition: 'center center' }} />
                                </div>
                                <div className="middle">
                                    <div className="text snowbtn">SHOP NOW</div>
                                </div>
                            </Link>
                        </div>
                        }
                    </div>
                    <div className="col-md-6">
                        {this.props.popularStuff ? this.props.popularStuff.map((data, i) =>
                            i == 1 ?
                                null
                                :
                                <div className="imgsmall containerimg4">
                                    <Link onClick={() => this.props.productData(data.key, null, null, this.props.history)}>
                                        <div className="fivedetails" >
                                            <h3 >{data.name} </h3>
                                            <h5 > Upto 30% off </h5>
                                        </div>
                                        <div className="mainimg4">
                                            <img className="image majorimg" src={data.poster?data.poster:process.env.PUBLIC_URL+'/img/default.png'} alt="" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                                        </div>
                                        <div className="middle">
                                            <div className="text snowbtn">SHOP NOW </div>
                                        </div>
                                    </Link>
                                </div>
                        ):(
                            <>
                                <h1>Sorry Items Not Selected for Popular Stuff</h1>
                            </>
                        )}
                    </div>
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
};
  
export default connect (mapStateToProps, mapDispatchToProps)(PopularStuff);
