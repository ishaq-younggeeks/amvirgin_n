import React, { Component } from 'react';
import { Link ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchData,productData} from '../shoppingHomeReducer';
import '../../../style.css';

import { object } from 'prop-types';

class SubMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen:false,
			ProductName:"Men"
		}
	}

	toggle = () => {
		this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
	}

	hoverOn = (item) => {
		this.setState({
			dropdownOpen:true
		})
		this.setState({ProductName:item.name})
	}

	hoverOff = () => {
		this.setState({
			dropdownOpen:false
		})
	}



	componentDidMount() {

		this.props.fetchData()
	console.log("this product list",this.props.data)
	}

	callApiProductData = (key) => {
		this.props.productData(key,{sortBy:"relevance",page:1},this.props.history)
	 }
	

	render(){
		const {data} = this.props.data;
    return(
			<div className="longmenu specific6 ">
				{data!==undefined && data.map((category,index) => {
					return (
						<nav key={`nav${index}`}>
							<ul className="menu" key={index}>
								<li><Link onClick={() => this.callApiProductData(category.key)}>  <h5 onMouseEnter={() => this.hoverOn(category)} onMouseLeave={() => this.hoverOff()} isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>{category.name}</h5></Link></li>
								{category.name === this.state.ProductName &&  
                   			 <ul className="subone">
        				          <li key={index}>
        				              {category.children.items.map((child,index) => {
        				                return (
        				                  <ul className="subtwo" key={index}>
        				                    <li><Link key={child.id}><h6 onClick={() => this.callApiProductData(child.key)} style={{color:"red"}} >{child.name}</h6></Link></li>
        				                    {child.children.items.map((inner,index) => {
        				                      return (
        				                        <li key={index}><Link key={inner.id}><h6 onClick={() => this.callApiProductData(inner.key)}>{inner.name}</h6></Link></li>
        				                      )
        				                    })}
        				                  </ul>
        				                )
        				              })}
        				          </li>
        				        </ul>
        				     }
								<input type="checkbox" id="drop-1"/>
							</ul>
						</nav>
						)
				})}
			</div>
    )
  }
}

const mapStateToProps = (state) => {
	//console.log("state data",state.shopping.data.data)
	return  {
			data: state.shopping.data,
	}
}
const mapDispatchToProps = (dispatch) => {
return({
			fetchData:() => dispatch(fetchData()),
			productData:(id,sortKey,currentPage,history) => dispatch(productData(id,sortKey,currentPage,history)),
});
};

export default connect(mapStateToProps,mapDispatchToProps)(SubMenu);
//export default SubMenu;