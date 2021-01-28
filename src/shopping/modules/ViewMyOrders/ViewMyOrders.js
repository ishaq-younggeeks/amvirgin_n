import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../../../entertainment/modules/Header'
import SubMenu from '../Home/components/SubMenu'
import {getAllMyOrders} from "./ViewMyOrdersAction";

class ViewMyOrders extends Component {
    constructor(){
        super();
        this.state = {};
    }

    componentDidMount = () => {
        this.props.getAllMyOrders("1");
    }

    render() {
        const {allMyOrders} = this.props;
        console.log("My Orders :", allMyOrders);
        return (
            <>
             <Header />
             <SubMenu {...this.props} />
             <div style={{marginTop:"80px"}}>
             {allMyOrders && allMyOrders.length ? allMyOrders.map((item1, i) => 
                <div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src="..." alt="Card image cap" />
                <div className="card-body">
                {/* {item1.subOrders ? item1.subOrders.map((item2) => 
                    {item2.items ? item2.items.map((item3) => (
                        <h5 className="card-title">{item3.product.name}</h5>
                    )):null}  
                ):null}      */}
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Track Order</a>
                </div>
              </div>
             ): null}
             </div>
            </>
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        allMyOrders : state.MyOrders.myOrders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMyOrders: (page) => dispatch(getAllMyOrders(page)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMyOrders)

