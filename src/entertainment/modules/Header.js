import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { userActions } from "../actions";
import {globalSearch} from "../../globalComponents/globalAction/Action"
import "./style.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:''
    }
  }

  handleChange  = (e) => {

    this.setState({[e.target.name]:e.target.value})
    this.props.globalSearch(this.state.search)
  }

  UNSAFE_componentWillMount() {
    var token = cookie.load("token");
    const { getuserbyid } = this.props;
    if (token) {
      getuserbyid(token).then(res => {
        if (res) {
          this.props.Recieveuserbyid(res.data);
        } else {
        }
      });
    }
  }

  componentDidMount() {

    $(document).ready(function(){
      var submitIcon = $('.searchbox-icon');
      var inputBox = $('.searchbox-input');
      var searchBox = $('.searchbox');
      var isOpen = false;
      submitIcon.click(function(){
          if(isOpen === false){
              searchBox.addClass('searchbox-open');
              inputBox.focus();
              isOpen = true;
          } else {
              searchBox.removeClass('searchbox-open');
              inputBox.focusout();
              isOpen = false;
          }
      });  
       submitIcon.mouseup(function(){
              return false;
          });
      searchBox.mouseup(function(){
              return false;
          });
      $(document).mouseup(function(){
              if(isOpen === true){
                  $('.searchbox-icon').css('display','block');
                  submitIcon.click();
              }
          });
  }); 
       
  }

  buttonUp = () => {
    var inputVal = $('.searchbox-input').val();
    inputVal = $.trim(inputVal).length;
    if( inputVal !== 0){
        $('.searchbox-icon').css('display','none');
    } else {
        $('.searchbox-input').val('');
        $('.searchbox-icon').css('display','block');
    }
}

 openNav = () => {
  document.getElementById("myNavmob").style.width = "100%";
}

closeNav = () => {
  document.getElementById("myNavmob").style.width = "0%";
}

  logout = () => {
    var token = cookie.load("token");
    const { signoutUser } = this.props;
    signoutUser(token);
  };
  
  renderLink() {
    const { user, loggedIn } = this.props;
    if (!loggedIn) {
      return (
        <li className="nav-item lessmargin">
          <Link className="nav-link" to="/login">
            Sign in
          </Link>
        </li>
      );
    } else {
      return (
        <>
          <li className="nav-item lessmargin logP06">
            <Link
              className="nav-link"
              to="/"
              data-toggle="tooltip"
              title={user.name}
            >
              <img
                className="userimage upp2"
                src={process.env.PUBLIC_URL + "/img/user.png"}
                alt=""
              />
            </Link>
                        
            <div className="logout" style={{zIndex:"99999"}}>
              <div className="nav-hover">
              <ul>
              <Link to="/myprofile/edit"><li><i className="fa fa-user mr-3 text-info"></i><span className="text-white nav-hover-item">Edit Profile</span></li></Link>
              <Link to="/subscription"><li><i className="fa fa-podcast mr-3 text-info"></i><span className="text-white nav-hover-item">Subscription</span></li></Link>
              <Link to="/myprofile/myOrders"><li><i className="fa fa-shopping-basket fa-fw mr-2 text-info"></i><span className="text-white nav-hover-item">My Orders</span></li></Link>
              <Link onClick={this.logout}><li><i className="fa fa-sign-out mr-3 text-info"></i><span className="text-white nav-hover-item">Logout</span></li></Link>
              </ul>
            </div>
            </div>         
          </li>
        </>
      );
    }
  }

  classs = () => {
    let cl = "navbar navbar-expand-lg navclass"
    if (window.location.pathname === "/")
      return cl;
    else
      return cl += " videohead"

  }


  render() {
    const { user, loggedIn } = this.props;
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 80) {
        $(".navbar").css(
          "background-color",
          "linear-gradient(to bottom, #c00 0%, #900 100%)"
        );
        $(".navbar").css("height", "50px");
        $(".navbar").css("position", "fixed");
        $(".logo").css("height", "50px");
      } else {
        $(".navbar").css(
          "background-color",
          "linear-gradient(to bottom, #c00 0%, #900 100%)"
        );
        $(".navbar").css("height", "90px");
        $(".navbar").css("position", "relative");
        $(".logo").css("height", "50px");
      }
    });
    let item = localStorage.getItem("total_item");
    return (
      <React.Fragment>
        <div id="myNavmob" className="overlay">
          <Link className="closebtn" onClick={this.closeNav}>&times;</Link>
          <div className="overlay-content">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link>News</Link>
            <Link>Chatmate</Link>
          </div>
        </div>
        <nav className={this.classs()} id="navbar">
          <Link className="navbar-brand" to="/">
            <img
              className="logoheader"
              src={process.env.PUBLIC_URL + "/img/logo.png"}
              alt="amvirgin"
              id="logo"
            />
          </Link>
          <button className="mobbtn">
            <span className="mobicon" onClick={this.openNav}>
              <img
                className="mobmenuicon"
                src={process.env.PUBLIC_URL + "/img/mobmenu.png"}
                alt="menu"
              />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#">
                  Chatmate
                </Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item upp2">
                <div className="nav-item searchbtn">
                  <div className="container">
                    <form className="searchbox" method="post" onSubmit={this.searchProducts}>
                      <input
                        type="search"
                        name="search"
                        placeholder="search..........."
                        className="searchbox-input"
                        value={this.state.search}
                        onChange={this.handleChange}
                        onKeyUp={this.buttonUp}
                      />
                      <span className="searchbox-icon">
                        <i className="fa fa-search"></i>
                      </span>
                    </form>
                  </div>
                </div>
              </li>
              <li className="nav-item lessmargin ">
                {item === 0 ?
                  <Link className="nav-link cart-nav" to="/shop/cart">
                    <img className="cart upp2" src={process.env.PUBLIC_URL + "/img/cart.png"} alt="" />
                  </Link>
                  :
                  <Link className="nav-link" to="/shop/cart">
                    <p id="cart_counter">{item}</p>
                    <img className="cart upp2" src={process.env.PUBLIC_URL + "/img/cart.png"} alt="" />
                  </Link>}

              </li>
              <li className="nav-item lessmargin ">
                {item === 0 ?
                  <Link className="nav-link cart-nav" to="/wishlist">
                    <i className="fa fa-gift" />
                  </Link>
                  :
                  <Link className="nav-link" to="/wishlist" style={{ fontSize: '20px' }}><p></p>
                    <i className="fa fa-gift fa-1x" />
                  </Link>
                }

              </li>
              <li className="nav-item lessmargin">
                <Link className="nav-link" to="#">
                  <img
                    className="cart upp2"
                    src={process.env.PUBLIC_URL + "/img/notification.png"}
                    alt=""
                  />
                </Link>
              </li>
              {this.renderLink()}
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user, loggedIn } = state.authReducer;
  return {
    user,
    loggedIn,
    toggle: state.product.toggle,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    Recieveuserbyid: body => dispatch(userActions.Recieveuserbyid(body)),
    getuserbyid: body => dispatch(userActions.getuserbyid(body)),
    signoutUser: token => dispatch(userActions.signoutUser(token)),
    globalSearch: (searchKey) => dispatch(globalSearch(searchKey))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
