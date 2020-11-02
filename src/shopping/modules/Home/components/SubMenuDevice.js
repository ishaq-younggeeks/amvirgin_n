import React, { Component } from 'react';
import { Link ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchData,productData} from '../shoppingHomeReducer';

class SubMenuDevice extends Component {


   

   openNavdesk = () => {
    document.getElementById("mySidenav").style.marginLeft = "0";
  }
  
   closeNavdesk = () => {
    document.getElementById("mySidenav").style.marginLeft = "-80%";
  }

  componentDidMount() {
    console.log("sub menu data for mobile",this.props.data)
}

  render(){
    console.log("sub menu data for mobile",this.props.data)
    const {data} = this.props.data;
    return (
      <>
<div id="mySidenav" className="sidenavdesk">

  <Link className="closebtn" onClick={this.closeNavdesk}><span className="allcats">All Categories</span> <span className="catcross"> &times;</span> </Link>
  <div className="container-fluid sidebarmenu">
    <div className="row">
   
           
            <ul className="nav flex-column flex-nowrap overflow-hidden">
            {data && data.map((category,index) => {
        return (
            <>
                { category.children.available===false?
                (<li className="nav-item">
                    <Link className="nav-link text-truncate"><span className="d-sm-inline">{category.name}</span></Link>
                </li>
                ):
                (<li className="nav-item">
                    <Link className="nav-link collapsed text-truncate" data-toggle="collapse" data-target={`#submenu1-${category.id}`}> <span className="d-sm-inline">{category.name}</span></Link>
                    <div className="collapse" id={`submenu1-${category.id}`} aria-expanded="false">
                    {category.children.items.map((child,index) => {
                        return (
                        <ul  className="flex-column pl-2 nav" key={child.id}>
                            <li className="nav-item">
                                <Link onClick={child.children.available?"":() => this.props.productData(child.id,this.props.sortKey,this.props.page,this.props.history)} className="nav-link collapsed py-1" data-toggle="collapse" data-target={`#submenu1sub1-${child.id}`}><span>{child.name}</span></Link>
                                <div className="collapse" id={`submenu1sub1-${child.id}`} aria-expanded="false">
                                   
                                    <ul className="flex-column nav pl-4">
                                    {child.children.available?
                                    (child.children.items.map((inner,index) =>{
                                        return (
                                        <li key={inner.id} className="nav-item">
                                            <Link onClick={() => this.props.productData(inner.id,this.props.sortKey,this.props.page,this.props.history)} className="nav-link p-1" href="#">
                                               {inner.name}</Link>
                                        </li>
                                        )})):""
                                    }
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        )})}
                    </div>
                </li>)
                 } 
               </>  )
                })}
            </ul>
            
        </div>
     
    </div>
</div>
<span class="deskmenu" onClick={this.openNavdesk}> <img class="mobkmenu" src="/img/kmenu.png" alt="categories"/> </span>
</>
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
			//fetchData:() => dispatch(fetchData()),
			productData:(id,offset,limit,history) => dispatch(productData(id,offset,limit,history)),
});
};

export default connect(mapStateToProps,mapDispatchToProps)(SubMenuDevice);
