import React, { Component } from "react";
import ProductMainContent from "./ProductMainContent";
import { Link } from "react-router-dom";
import $, { extend } from "jquery";

class ProductSideBarCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementStyle: { position: "relaitve" },
      priceRange: 1,
    };
  }

  componentDidMount() {
    $("#hide").click(function () {
      $(".catsmob").hide();
    });
    $("#show").click(function () {
      $(".catsmob").show();
    });

    let x = window.matchMedia("(max-width: 720px)");
    console.log("media width", x);
    this.myCategories(x);
    // this.myCategories(x) // Call listener function at run time
    //x.addListener(this.myCategories) // Attach listener function on state changes
  }

  myCategories = (x) => {
    if (x.matches) {
      // If media query matches
      console.log("for position absolute");
      this.setState({
        elementStyle: { ...this.state.someProperty, position: "absolute" },
      });
      //$(".catsmob").style.position = "absolute";
    } else {
      console.log("for position relative");
      this.setState({
        elementStyle: { ...this.state.someProperty, position: "relative" },
      });
      //$(".catsmob").style.position = "relative";
    }
  };

  renderFilters = (mode, items) => {
    switch (mode) {
      case "multiple":
        return <Multiple items={items} {...this.props} />;
        break;
      case "single":
        return <Single items={items} {...this.props} />;
        break;
      case "multiple_price":
        return <MultiplePrice items={items} {...this.props} />;
      default:
      // code block
    }
  };

  render() {
    const { filters } = this.props;
    return (
      <React.Fragment>
        <div className="col-lg-3">
          <div className="showhidesection">
            <button id="hide">Hide</button>
            <button id="show">Show</button>
          </div>
          <div
            id="catshopmobile"
            className="catsmob"
            style={this.state.elementStyle}
          >
            <div className="sidebar">
              <div className="sidebar__inner">
                <div className="wrapper">
                  <div className="sidebar-wrapper sticker">
                    <div className="sidebar-widget">
                      <div className="sidebar-search mb-40 mt-20">
                      <h2 className="sidebar-title">Filters : </h2>
                        {/* <form className="sidebar-search-form" action="#">
                          <input type="text" placeholder="Search here..." />
                          <button>
                            <i className="la la-search"></i>
                          </button>
                        </form> */}
                      </div>
                    </div>
                    {/* <div className="sidebar-widget shop-sidebar-border pt-40">
                      <h4 className="sidebar-title">Shop By Categories</h4>
                      <div className="shop-catigory mt-20">
                        <ul id="faq">
                          <li> <a data-toggle="collapse" data-parent="#faq" href="#shop-catigory-1">Women Fashion <i className="la la-angle-down"></i></a>
                            <ul id="shop-catigory-1" className="panel-collapse collapse show">
                              <li><a href="#">Dress </a></li>
                              <li><a href="#">Shoes</a></li>
                              <li><a href="#">Sunglasses </a></li>
                              <li><a href="#">Sweater </a></li>
                              <li><a href="#">Handbag </a></li>
                            </ul>
                          </li>
                          <li> <a data-toggle="collapse" data-parent="#faq" href="#shop-catigory-2">Men Fashion <i className="la la-angle-down"></i></a>
                            <ul id="shop-catigory-2" className="panel-collapse collapse">
                              <li><a href="#">Shirt </a></li>
                              <li><a href="#">Shoes</a></li>
                              <li><a href="#">Sunglasses </a></li>
                              <li><a href="#">Sweater </a></li>
                              <li><a href="#">Jacket </a></li>
                            </ul>
                          </li>
                          <li> <a data-toggle="collapse" data-parent="#faq" href="#shop-catigory-3">Furniture <i className="la la-angle-down"></i></a>
                            <ul id="shop-catigory-3" className="panel-collapse collapse">
                              <li><a href="#"> Chair</a></li>
                              <li><a href="#">Lift Chair</a></li>
                              <li><a href="#">Bunk Bed</a></li>
                              <li><a href="#">Computer Desk</a></li>
                              <li><a href="#">Bookcase</a></li>
                            </ul>
                          </li>
                          <li> <a href="#">Lamp</a></li>
                          <li> <a href="#">Electronics</a> </li>
                          <li> <a href="#">Accessories</a></li>
                        </ul>
                      </div>
                    </div> */}

                    {filters && filters.length
                      ? filters.map((item, index) => {
                          return item.type === "price"
                            ? this.renderFilters(
                                item.mode + "_" + item.type,
                                item
                              )
                            : this.renderFilters(item.mode, item);
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ProductSideBarCategories;

class Multiple extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="sidebar-widget pt-40 mt-40 shop-sidebar-border">
        <h4 className="sidebar-title">{items.label} </h4>
        <div className="sidebar-widget-list mt-20">
          <ul>
            {items.options.map((item, index) => {
              return (
                <li key={items.type + index}>
                  <div className="sidebar-widget-list-left">
                    <input
                      type="checkbox"
                      mode="multiple"
                      name={items.type}
                      onClick={this.props.handleChange}
                      value={item.key}
                    />
                    <Link>
                      {item.name}{" "}
                      {item.count ? <span>{item.count}</span> : null}{" "}
                    </Link>
                    <span className="checkmark"></span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

class Single extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { items } = this.props;
    return (
      <div className="sidebar-widget pt-40 mt-40 shop-sidebar-border">
        <h4 className="sidebar-title">{items.label} </h4>
        <div className="sidebar-widget-list mt-20">
          <ul>
            {items.options.map((item, index) => {
              return (
                <li key={items.type + index}>
                  <div className="sidebar-widget-list-left">
                    <input
                      type="radio"
                      mode="single"
                      name={items.type}
                      onClick={this.props.handleChange}
                      value={item.limit}
                      id={items.type+item.limit}
                    />{" "}
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <label
                      //  htmlFor={items.type+item.limit}
                       >{`${item.limit}% and above`} <span>{item.count}</span>{" "}</label>
                    </a>
                    <span className="radiomark"></span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

class MultiplePrice extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="sidebar-widget pt-40 mt-40 shop-sidebar-border">
        <h4 className="sidebar-title">{items.label} </h4>
        <div className="sidebar-widget-list mt-20">
          <ul>
            {items.options.map((item, index) => {
              return (
                <li key={index}>
                  <div className="sidebar-widget-list-left">
                    <input
                      type="checkbox"
                      mode="multiple_price"
                      name={items.type}
                      id={`${items.type}_${index}`}
                      value={item.upper + "_" + item.lower}
                      onClick={this.props.handleChange}
                    />
                    <a onClick={this.props.handleChange}>
                      Rs. {item.upper} to Rs. {item.lower}{" "}
                      <span>{item.count}</span>{" "}
                    </a>
                    <span className="checkmark"></span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
