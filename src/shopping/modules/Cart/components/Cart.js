import React from "react";
import "../../../categorystyle.css";
import "../../../style.css";
import { Link } from "react-router-dom";
import cartimg from "../../../../img/Shopcart.png";
import Header from "../../../../entertainment/modules/Header";
import SubMenu from "../../Home/components/SubMenu";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
    };
  }

  componentDidMount() {
    this.props.fetchCart();
    console.log("cart data", this.props.cartdata);
  }

  Changeqty(e) {
    console.log(e.target.value);
  }

  handleQuantityChange = (event) => {
    const key = event.target.getAttribute("data-key");
    this.props.updateitem(key, event.target.value);
  };

  placeOrder = () => {
    let token = localStorage.getItem("UserToken");
    if (!token) {
      window.location.href = "/login";
    }
  };

  movetoWishlist = (e, id) => {
    e.preventDefault();
    this.props.movetoWishlisht(id);
  };

  componentDidUpdate(prevProps) {}

  render() {
    const { cartdata, isLoading } = this.props;
    console.log("cart data", cartdata);
    return (
      <div className="shopMain">
        <Header />
        {isLoading ? (
          ""
        ) : cartdata.items && cartdata.items.length ? (
          <div className="specific">
            <div className="cartsection">
              <div className="product">
                {cartdata.items &&
                  cartdata.items.length &&
                  cartdata.items.map((cartproduct) => {
                    return (
                      <div className="leftpart" key={cartproduct.key}>
                        <div className="row">
                          <div className="col-md-2">
                            <h1></h1>
                            {/* <button className="removebtncart">Increase</button> */}
                            <div className="cartproduct">
                              <img src={cartproduct.product.image} />
                            </div>
                          </div>
                          <div className="col-md-10">
                            <div className="row">
                              <div className="details1">
                                <h5></h5>
                                <p>{cartproduct.product.name}</p>
                                <p>
                                  <span>Sold by: Unistand</span>
                                </p>
                                <div className="quantity">
                                  <div className="form-group">
                                    <label for="qty">Qty:</label>
                                    {/* <input className="form-control" id="qty" value={cartproduct.quantity} /> */}
                                    {/* <button onClick={() => this.props.updateitem(cartproduct.key,2)} value={cartproduct.key}>+</button> */}
                                    {/* <button onClick={this.onChangeHandler.bind(this, cartproduct.key)} value={cartproduct.key}>+</button> */}
                                    <select
                                      className="form-control"
                                      id="qty"
                                      data-key={cartproduct.key}
                                      onChange={this.handleQuantityChange.bind(
                                        this
                                      )}
                                    >
                                      {(() => {
                                        const items = [];
                                        for (let i = 1; i <= 10; i++) {
                                          if (i === cartproduct.quantity) {
                                            items.push(
                                              <option value={i} selected>
                                                {i}
                                              </option>
                                            );
                                          } else {
                                            items.push(
                                              <option value={i}>{i}</option>
                                            );
                                          }
                                        }
                                        return items;
                                      })()}
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label for="size">Size:</label>
                                    {cartproduct.options &&
                                    cartproduct.options.length
                                      ? cartproduct.options.map((data) =>
                                          console.log("f")
                                        )
                                      : console.log("ún")}
                                    <select
                                      className="form-control"
                                      id="size"
                                      value={
                                        cartproduct.product.options
                                          .filter(
                                            (item) => item.label === "Size"
                                          )
                                          .map((item) => item.value)[0]
                                      }
                                    >
                                      {/* {(() => {
                                      const size = [];
                                      for (let i = 1; i <= 4; i++) {
                                        if(L=cartproduct.attributes[1].size){
                                          size.push(<option value={cartproduct.attributes[1].size} selected>{cartproduct.attributes[1].size}</option>);
                                        }
                                        else{
                                          size.push(<option value={cartproduct.attributes[1].size} >{cartproduct.attributes[1].size}</option>);
                                        }

                                      }
                                      return size;
                                  })()}  */}

                                      <option value="XXS">XXS</option>
                                      <option value="XS">XS</option>
                                      <option value="S">S</option>
                                      <option value="MS">M</option>
                                      <option value="L">L</option>
                                      <option value="XL">XL</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="btns">
                                  <button
                                    type="button"
                                    className="btn btn-info btn-lg removebtncart"
                                    data-toggle="modal"
                                    data-target="#removeModal"
                                  >
                                    Remove
                                  </button>
                                  <div
                                    class="modal fade"
                                    id="removeModal"
                                    role="dialog"
                                  >
                                    <div class="modal-dialog removecartmodel">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                          >
                                            &times;
                                          </button>
                                        </div>
                                        <div class="modal-body">
                                          <p>
                                            {" "}
                                            Are you sure you want to remove this
                                            item?{" "}
                                          </p>
                                        </div>
                                        <div class="modal-footer">
                                          <button
                                            className="removebtncart"
                                            data-dismiss="modal"
                                            onClick={() =>
                                              this.props.deletefromCart(
                                                cartproduct.key
                                              )
                                            }
                                          >
                                            Remove
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-default wishlistcart"
                                            onClick={(e) =>
                                              this.movetoWishlist(
                                                e,
                                                cartproduct.key
                                              )
                                            }
                                          >
                                            Move to Wishlist
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    className="wishlistcart"
                                    onClick={(e) =>
                                      this.movetoWishlist(e, cartproduct.key)
                                    }
                                  >
                                    Move to Wishlist
                                  </button>
                                </div>
                              </div>
                              <div className="details2">
                                <p className="priceoff">
                                  {" "}
                                  ₹{cartproduct.product.price.selling}
                                </p>
                                <p className="pricereal">
                                  <del>
                                    {" "}
                                    ₹{cartproduct.product.price.original}
                                  </del>
                                  <span>
                                    {/* {cartproduct.product.discount.type === 'percent' ?
                                    cartproduct.product.discount.value + '%'
                                    :
                                    '₹' + cartproduct.product.discount.value + ' '
                                  }off */}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="price">
                <h3>PRICE DETAILS </h3>
                <div className="priceproduct">
                  <span>Bag Total</span>
                  <span className="desc">Rs.{cartdata.subTotal}</span>
                </div>
                <div className="priceproduct">
                  <span>Bag discount</span>
                  <span className="desc">Rs.{cartdata.discount}</span>
                </div>
                <div className="priceproduct">
                  <span>Coupon Discount</span>
                  <span className="desc">
                    <button className="applycoupon">Apply Coupon</button>
                  </span>
                </div>
                <div className="priceproduct">
                  <span>Tax</span>
                  <span className="desc">{cartdata.tax}</span>
                </div>
                <div className="priceproduct">
                  <span>Order Total</span>
                  <span className="desc">{cartdata.total}</span>
                </div>
                <div className="priceproduct">
                  <span>Delivery Charges</span>
                  <span className="desc">
                    <del>149</del> <span className="redspan">FREE</span>
                  </span>
                </div>
                <hr />
                <div className="priceproduct totalprice">
                  <span>Total</span>
                  <span className="desc">{cartdata.total}</span>
                </div>
                <Link
                  to="/placeOrder"
                  onClick={() => this.placeOrder()}
                  className="btn btn-raised btn-red"
                >
                  Place Order
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="specific">
            <div className="cartsection">
              <div className="product">
                <div style={{ textAlign: "center" }}>
                  <h1>
                    <b>Your Cart is Empty</b>{" "}
                  </h1>
                  <img
                    src={process.env.PUBLIC_URL + "/img/Shopcart.png"}
                    width="20%"
                    alt="empty cart"
                  />
                  <br />
                  <br />
                  <h5>
                    <b>Hey it feels so light!</b>
                  </h5>
                  <p>There is nothing in the Cart.Lets addsome items.</p>
                  <button className="seeallbtn1" style={{ float: "none" }}>
                    <Link to="/shop" style={{ color: "#fff" }}>
                      Go to Shop
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Cart;
