import React, { Component,createRef,useState,useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../Authentication/sellerAuthAction";
import { Redirect } from "react-router-dom";

import Cart from "./assets/cart.png";
import Logo from "./assets/logo3.png";
import User from "./assets/user.png";

import "./Navigation.css";
const useComponentWillMount = func => {
  const willMount = useRef(true);
  if (willMount.current) {
    func();
  }
  useComponentDidMount(() => {
    willMount.current = false;
  });
};
const useComponentDidMount = func => useEffect(func, []);
const Navigation = (props) => {
  const menuProfile=createRef();
  const menuList = createRef();
   const [state,setState] =useState({
    activeIndex:0,
    logout:false,
    display:'15vw',
    dropdownProfile:false
   })

  

  // useComponentWillMount(() => setState({...state,activeIndex:3,my:"fgfgf"}, console.log("current state",state,)));
 

//    useEffect(() => {
//     const path = props.location.pathname
//     let patt = /(?=[/]dashboard[/]).*(?=[/])/g
    
// //activepath(path);

//   setState({...state,activeIndex:3,my:"fgfgf"}, console.log("current state",state,))
   
//    },[])



  // handleClickOutside = e => {
  //   if (state.dropdownProfile && !this.menuProfile.current.contains(e.target) && !this.menuList.current.contains(e.target)) {
  //     this.setState({ dropdownProfile: false });
  //   }
  // };


  const activepath =(path) => {
      if(path.match(/myorders/)=="myorders")
      {
        console.log("pattern match")
      setState({...state,activeIndex:3,my:"fgfgf"}, console.log("current state",state,))
      
     
      }
  }

  const addActive = (index) => {
    setState({
      activeIndex: index
    });
    console.log("ddd",state)
  }

  const handleLogout = event => {
    event.preventDefault();
    // Remove the user object from the Redux store
    props.logout(props.currentUser.token);
    localStorage.removeItem("token");
    setState({
      logout: true,
      dropdownProfile:false
    });
  };

 const  SwitchhandleLogout = (e) => {
    localStorage.removeItem("token")
  }

  const hidenavebar = () => {
    //this.setState({display:"3vw"});
  }

  const handleShow = (e) => {
    e.preventDefault();
    setState({...state,dropdownProfile:true})
  }

  const handleHide = (e) => {
    e.preventDefault();
    setState({...state,dropdownProfile:false})
  }

  const toggle = () => {
		setState(prevState => ({
      dropdownProfile: !prevState.dropdownProfile
    }));
  }
  
  const showManageProfile =(e) => {
    e.preventDefault();
    console.log("history push workin",props.history);
    props.history.push('/seller/dashboard/myproducts');
  }

  const handledropdown =() => {
    setState({...state,activeIndex:"",dropdownProfile:false})
  }

    return (
      <>
        {state.logout && <Redirect to="/seller/login" />}
        <div id="myNavmob" className="overlay">
          <a href="#0" className="closebtn">
            &times;
          </a>
          <div className="overlay-content">
            <Link to="/">Home</Link>           
          </div>
        </div>
        <div className="container-fluid" style={{padding:'0'}}>
          <div className="row" style={{ margin: '0' }}>
            <div className="col-lg-2 col-md-2">
              <aside className="side-nav sellernav" id="show-side-navigation1"style={{width:state.display}}  > 
                <div style={{background:'#000',padding:"6px"}}>
                <center><img className="logoheader" src={Logo} alt="amvirgin" id="logo" style={{height:'40px'}} /></center>
                </div>
                <ul className="categories"  >
                  <Link to="/seller/dashboard" className="catlink">
                    <li className={state.activeIndex === 0 && (props.location.pathname.match(/dashboard$/g)=="dashboard" || props.location.pathname.match(/dashboard[/]$/g)=="dashboard/") ? "active" : ""} onClick={() => addActive(0)} >
                      <i className="fas fa-home"></i>
                      My Dashboard
                    </li>
                  </Link>
                  <Link to="/seller/dashboard/myorders?activeState=placed" className="catlink">
                    <li className={state.activeIndex === 1 || props.location.pathname.match(/myorders/)=="myorders" ? "active" : ""} onClick={() => addActive(1)} >
                      <i className="fa fa-shopping-basket fa-fw"></i>
                      My Orders
                    </li>
                  </Link>
                  <Link to="/seller/dashboard/myproducts" className="catlink">
                    <li className={state.activeIndex === 2 || props.location.pathname.match(/myproducts/)=="myproducts" ? "active" : ""} role="presentation" onClick={() => addActive(2)} >
                      <i className="fab fa-product-hunt"></i>
                      My Products
                    </li>
                  </Link>
                  {/* <Link to="/seller/dashboard/listing" className="catlink">
                    <li className={state.activeIndex === 3 ? "active" : ""} role="presentation" onClick={() => addActive(3)} >
                      <i className="fa fa-line-chart fa-fw"></i>
                      Add Product
                    </li>
                  </Link>
                  <Link to="/seller/dashboard/setting" className="catlink">
                    <li className={state.activeIndex === 4 ? "active" : ""} role="presentation" onClick={() => addActive(4)} >
                      <i
                        className="fa fa-user-circle fa-fw"
                        aria-hidden="true"
                      ></i>
                      Manage Profile
                    </li>
                  </Link> */}
                  <Link to="/seller/dashboard/return" className="catlink">
                    <li className={state.activeIndex === 3 || props.location.pathname.match(/return/)=="return" ? "active" : ""} role="presentation" onClick={() => addActive(3)} >
                      <i className="fa fa-exchange"></i>
                      Return
                    </li>
                  </Link>
                  <Link to="/seller/dashboard/notification" className="catlink">
                    <li className={state.activeIndex === 5 || props.location.pathname.match(/notification/)=="notification"? "active" : ""} role="presentation" onClick={() => addActive(5)} >
                      <i className="fa fa-bell fa-fw"></i>
                      Announcement
                    </li>
                  </Link>
                  
                  <Link to="/seller/dashboard/payments/summary" className="catlink">
                    <li className={state.activeIndex === 6 || props.location.pathname.match(/payments/)=="payments" ? "active" : ""} role="presentation" onClick={() => addActive(6)} >
                      <i className="fas fa-coins fa-fw"></i>
                      Payments
                    </li>
                  </Link>
                  <Link to="/seller/dashboard/advertisement" className="catlink">
                    <li className={state.activeIndex === 7 || props.location.pathname.match(/advertisement/)=="advertisement"? "active" : ""} role="presentation" onClick={() => addActive(7)} >
                      <i className="fas fa-ad"></i>
                      Advertisement
                    </li>
                  </Link>
                  <Link to="/seller/dashboard/support" className="catlink">
                    <li className={state.activeIndex === 8 || props.location.pathname.match(/support/)=="support"? "active" : ""} role="presentation" onClick={() => addActive(8)} >
                      <i className="fa fa-support"></i>
                      Seller Support
                    </li>
                  </Link>
                  <Link to="/seller/dashboard/sales" className="catlink">
                    <li className={state.activeIndex === 9 || props.location.pathname.match(/sales/)=="sales" ? "active" : ""} role="presentation" onClick={() => addActive(9)} >
                      <i className="fa fa-line-chart fa-fw"></i>
                      Growth
                    </li>
                  </Link>
                </ul>
              </aside>
            </div>
            <div className="col-lg-10 col-md-10" style={{maxWidth:'auto'}}>
                <nav className="navbar navbar-expand-lg fixed-top videohead" id="navbar" style={{ width: '86%' }} >
                  <button className="mobbtn">
                    <span className="mobicon">
                      <img className="mobmenuicon" src="img/mobmenu.png" alt="menu" />
                    </span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                          <span className="sr-only">(current)</span>
                          <i className="fas fa-bars" onClick={hidenavebar}></i>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                      <li className="nav-item upp2">
                        <div className="nav-item searchbtn">
                          <div className="container">
                            <form className="searchbox" method="post">
                              <input
                                type="search"
                                placeholder="Search......"
                                name="search"
                                className="searchbox-input"
                              />
                              <span className="searchbox-icon">
                                <i className="fa fa-search"></i>
                              </span>
                            </form>
                          </div>
                        </div>
                      </li>
                      <li className="nav-item"  >
                        <div onMouseEnter={handleShow} onMouseLeave={handleHide}>
                        <Link className="nav-link" ref={menuProfile}>
                          <img className="userimage upp2" src={User} />
                        </Link>
                        {state.dropdownProfile &&<div className="PofileMenu">
                      <ul className="listMenu" ref={menuList}>
                        <Link to="/seller/dashboard/setting" onClick={handledropdown}><li>Manage Profile</li></Link>
                        <Link><li onClick={handleLogout}>Logout</li></Link>
                      </ul>
                      </div>}
                      </div>
                      </li>
                      
                    </ul>
                  </div>
                </nav>{props.children}
            </div>
          </div>
        </div>
      </>
    );
  }

const mapStateToProps = state => {
  return {
    currentUser: state.sellerAuth.currentUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: token => dispatch(logout(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
