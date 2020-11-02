import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Loader from 'react-loader-spinner'

import {
  getAllProducts,
  getProduct,
  categoryList,
  deleteProduct,
  editProduct,
  clearState
} from "../sellerAddProductAction";
import Modal from "react-modal";
import "./MyProducts.css";
import qs from "query-string";
import { registerField } from "redux-form";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: null,
      items: [],
      search: false,
      pagination: 10,
      activestatus: "active",
      setIsOpen: false,
      currentPage: 1,
      maxPage: 1,
    };
    this.searchHere = this.searchHere.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.paginationnum = this.paginationnum.bind(this);
    this.activeFilter = this.activeFilter.bind(this);
    this.productDetail = this.productDetail.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  productDetail = (key) => {
    console.clear();
    this.setState({ setIsOpen: true });
    console.log(key);
    this.props.getProduct(key);
  };

  closeModal() {
    this.setState({ setIsOpen: false });
  }

  queryString = (type) => {
    const query = { listing: type };
    const searchString = qs.stringify(query);
    return searchString;
  };

  componentDidMount = () => {
    this.props.getAllProducts(1, 10);
    this.props.categoryList();
  };

  componentDidUpdate(prevprops, prevstate) {
    if (prevprops.metaData !== this.props.metaData) {
      this.setState({
        maxPage: Math.ceil(
          this.props.metaData.pagination.items.totalRec /
            this.props.metaData.pagination.items.chunk
        ),
      });
    }
  }

  searchHere = (e) => {
    this.setState({ searching: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    let store = [];
    this.props.products.map((data) => {
      let items = data.name;

      if (items.toLowerCase().includes(this.state.searching.toLowerCase())) {
        store.push(data);
      }
    });
    this.setState({ items: store });
    this.setState({ search: true });
  }
  activeFilter(e) {
    e.preventDefault();
    this.setState({
      activestatus: e.target.value,
    });
  }

  paginationnum(e) {
    e.preventDefault();
    let perPage = parseInt(e.target.value);
          this.props.clearState("products", []);

    this.setState({
      pagination: perPage,
      currentPage: 1,
    });
    this.props.getAllProducts(1, perPage);
  }

  paginate = (e, direction, current) => {
    e.preventDefault();
    if (direction === "inc") {
      this.props.clearState("products", []);
      this.props.getAllProducts(current + 1, this.state.pagination);
      this.setState((prevState) => {
        return { currentPage: prevState.currentPage + 1 };
      });
    } else {
      this.props.clearState("products", []);

      this.setState({ currentPage: this.state.currentPage - 1 });
      this.props.getAllProducts(
        this.state.currentPage - 1,
        this.state.pagination
      );
    }
  };

  render() {
    const { product, metaData,isFetching } = this.props;
    console.log("product", product);
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width: "50vw",
        transform: "translate(-50%, -50%)",
      },
    };
    return (
      <div
        className="card ordercard ordertable"
        style={{ padding: "20px 20px", marginTop: "6%" }}
      >
        <div>
          <div>
            <h3>Add New Product</h3>
          </div>
          <div
            className="categorycontainer myprocontainer w-50 row"
            style={{ textAlign: "center", padding: "20px" }}
          >
            <div className="w-100" style={{ marginBottom: "10px" }}>
              <p>Have Product to sell?</p>
            </div>
            <div className="w-50 ">
              <div>
                <Link
                  className="btn btn-primary"
                  to={{
                    pathname: `/seller/dashboard/selectcategory`,
                    search: this.queryString("single"),
                  }}
                >
                  Add Single Product
                </Link>
              </div>
            </div>
            <div className="w-50">
              <div>
                <Link
                  className="btn btn-primary"
                  to={{
                    pathname: `/seller/dashboard/selectcategory`,
                    search: this.queryString("bulk"),
                  }}
                >
                  Add Product In Bulk
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: "#efefefb8", padding: "10px 20px" }}>
          <h4 style={{ textAlign: "left", fontWeight: "500", color: "#000" }}>
            My Products
          </h4>
        </div>
        <div className="row" style={{ padding: "20px" }}>
          <div className="col-sm-2">
            <select
              id="attributename"
              name="attributename"
              ref="modifierName"
              style={{
                width: "70%",
                margin: "5px 0",
                padding: "5px",
                border: "1px solid lightgrey",
                borderRadius: "3px",
              }}
              onChange={this.paginationnum}
            >
              <option value="10">Show 10</option>
              <option value="25">Show 25</option>
              <option value="50">Show 50</option>
              <option value="100">Show 100</option>
            </select>
          </div>
          <div className="col-sm-2">
            <select
              name="status"
              style={{
                width: "70%",
                margin: "5px 0",
                padding: "5px",
                border: "1px solid lightgrey",
                borderRadius: "3px",
              }}
              onChange={this.activeFilter}
            >
              <option value="active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Inactive">Under Process</option>
              <option value="Inactive">Rejected</option>
            </select>
          </div>
          {metaData.pagination ? (
            <div style={{ padding: "5px" }}>
              <p>
                {" "}
                {(this.state.currentPage - 1) *
                  metaData.pagination.items.chunk +
                  1}
                -
                {(this.state.currentPage - 1) *
                  metaData.pagination.items.chunk +
                  metaData.pagination.items.total}{" "}
                of {metaData.pagination.items.totalRec} items |{" "}
                {this.state.currentPage} of{" "}
                {Math.floor(metaData.pagination.pages)} pages
              </p>
            </div>
          ) : null}
          <div>
            <ul className="pagination">
              <li
                className={
                  this.state.currentPage == 1
                    ? "page-item disabled"
                    : "page-item"
                }
              >
                <div
                  className="page-link"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => this.paginate(e, "dec")}
                  disabled={this.state.currentPage == 1}
                >
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
              </li>
              <li className="page-item ">
                <div className="page-link">{this.state.currentPage}</div>
              </li>
              <li
                className={
                  this.state.currentPage == this.state.maxPage
                    ? "page-item disabled"
                    : "page-item"
                }
              >
                <div
                  className="page-link"
                  style={{ cursor: "pointer" }}
                  onClick={(e) =>
                    this.paginate(e, "inc", this.state.currentPage)
                  }
                >
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-auto colwidth25">
            <form onSubmit={this.onSubmit}>
              <input
                type="search"
                name="search"
                onChange={this.searchHere}
                placeholder="search"
                style={{
                  width: "80%",
                  borderRadius: "5px",
                  height: "37px",
                  background: "#efefef",
                  padding: "10px",
                  margin: "5px 0",
                  border: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "20%",
                  background: "#bf0000",
                  border: "none",
                  color: "#fff",
                  borderRadius: "0 5px 5px 0",
                  height: "37px",
                  position: "relative",
                  left: "-5px",
                }}
              >
                <i className="fa fa-search" />
              </button>
            </form>
          </div>
          <br />
          <br />
          <table className="tablelist" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>BRAND</th>
                <th>MRP</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>SKU</th>
                <th>QUANTITY</th>
                <th>ACTION</th>
              </tr>
            </thead>

            {!isFetching?<tbody>
              {this.state.search === true
                ? this.state.items.map((data, i) =>
                    
                      i <= this.state.pagination - 1 ? (
                        <tr key={data.Id}>
                          <td>
                            {<img src={data.image} style={{ width: "50px" }} />}
                          </td>
                          <td>{data.name}</td>
                          <td>HRX</td>
                          <td>{data.originalPrice}</td>
                          <td>{data.sellingPrice}</td>
                          <td>{data.category}</td>
                          <td>{data.sku}</td>
                          <td>{data.stock}</td>
                          <td>
                            <Link
                              type="button"
                              className="btn toolnewtip"
                              to={`/seller/dashboard/myproducts/${data.id}`}
                            >
                              <i className="far fa-edit"></i>
                              <span className="tooltiptext">Edit</span>
                            </Link>
                            <button
                              className="btn toolnewtip"
                              onClick={() =>
                                this.props.deleteProduct(
                                  data.id,
                                  this.props.history
                                )
                              }
                            >
                              <i className="fas fa-unlink" />
                              <span className="tooltiptext">Inactive</span>
                            </button>
                          </td>
                        </tr>
                      ) : null
                    
                  )
                : this.props.products.map((data, i) =>
                    this.state.activestatus == data.listingStatus ? (
                      i <= this.state.pagination - 1 ? (
                        <>
                          <tr key={data.key}>
                            <td>
                              {data.image ? (
                                <img
                                  src={data.image}
                                  style={{ width: "50px" }}
                                />
                              ) : (
                                <img
                                  src={
                                    process.env.PUBLIC_URL + "/img/default.png"
                                  }
                                  style={{ width: "50px" }}
                                />
                              )}
                            </td>
                            <td
                              className="destypehover"
                              style={{ cursor: "pointer" }}
                              onClick={() => this.productDetail(data.key)}
                            >
                              {data.name}
                            </td>
                            <td>HRX</td>
                            <td>{data.originalPrice}</td>
                            <td>{data.sellingPrice}</td>
                            <td>{data.category}</td>
                            <td>{data.sku}</td>
                            <td>{data.stock}</td>
                            <td>
                              {/* <Link type="button" className="btn"  to = {`/seller/dashboard/myproducts/${data.key}`} > */}
                              <Link
                                type="button"
                                className="btn toolnewtip"
                                onClick={() =>
                                  this.props.editProduct(
                                    data.key,
                                    this.props.history
                                  )
                                }
                              >
                                <i className="far fa-edit"></i>
                                <span className="tooltiptext">Edit</span>
                              </Link>
                              <button
                                className="btn toolnewtip"
                                onClick={() =>
                                  this.props.deleteProduct(
                                    data.key,
                                    this.props.history
                                  )
                                }
                              >
                                <i className="fas fa-unlink" />
                                <span className="tooltiptext">Inactive</span>
                              </button>
                            </td>
                          </tr>
                        </>
                      ) : null
                    ) : null
                  )}
            </tbody>:
            <tbody>
            <div className="loaderHorizontal">
            <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
        //  timeout={3000} //3 secs
 
      />
      </div>
      </tbody>}
          </table>
        </div>
        <Modal
          isOpen={this.state.setIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="row">
            <div className="col-sm-2">
              {product.files && product.files.length ? (
                <img
                  src={product.files[0].url}
                  className="card-img-top"
                  alt="product pic"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/img/default.png"}
                  className="card-img-top"
                  alt="product pic"
                />
              )}
            </div>
            <div className="col-sm-10">
              <h4>{product.category ? product.name : "null"}</h4>
              {product.sku}
            </div>

            <div className="col-sm-12">
              <hr />
              <h4>Product Pricing</h4>
              Listing Price {product.originalPrice}
            </div>
            <div className="col-sm-12">
              <hr />
              <h4>Product Varients</h4>
              <div className="row">
                {product.variants
                  ? product.variants.map((variants) => (
                      <div className="col-sm-3">
                        <Link
                          to={`/seller/dashboard/myproducts/${variants.key}`}
                        >
                          <div
                            style={{
                              background: "#efefef",
                              padding: "5px",
                              borderRadius: "6px",
                            }}
                          >
                            {variants.name}
                            {variants.options.map((value) => (
                              <>{value.value + " " + value.label + " "}</>
                            ))}
                          </div>
                        </Link>
                      </div>
                    ))
                  : "No Variants "}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("seller data", state.sellerAddProduct.products, "id");
  return {
    products: state.sellerAddProduct.products,
    isFetching:state.sellerAddProduct.isFetching,
    categories: state.sellerAddProduct.categories,
    getProductError: state.sellerAddProduct.getProductError,
    product: state.sellerAddProduct.product,
    metaData: state.sellerAddProduct.metaData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: (current, perPage) =>
      dispatch(getAllProducts(current, perPage)),
    categoryList: () => dispatch(categoryList()),
    getProduct: (slug) => dispatch(getProduct(slug)),
    deleteProduct: (id, history) => dispatch(deleteProduct(id, history)),
    editProduct: (slug, history) => dispatch(editProduct(slug, history)),
    clearState:(state,type) => dispatch(clearState(state,type))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
