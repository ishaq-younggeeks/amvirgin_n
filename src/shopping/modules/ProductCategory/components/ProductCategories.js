import React from 'react';
import '../../../categorystyle.css';
import '../../../style.css';
import Axios from 'axios';
import Header from '../../../../entertainment/modules/Header'
import SubMenu from '../../Home/components/SubMenu';
import ProductSideBarCategories from './ProductSideBarCategories';
import Footer from '../../Home/components/FooterWhite';
import ProductMainContent from './ProductMainContent'
import { baseURL } from "../../../../credential.json";
class ProductCategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortby: [],
      refresh: false,
      path: '',
      categoryId: '',
      hist: '',
      red: false,
      selectedSize: '',
      query: {
        page: 1,
        sortBy: "relevance",
      }


    }
  }

  async componentDidMount() {
    this.props.productData(this.props.match.params.pat1, this.state.query, this.props.history)
    const res = await Axios.get(`${baseURL}/customer/products/sorts`)
    this.props.applicableFilter(this.props.match.params.pat1)
    this.setState({ sortby: res.data.data }, console.log("sortBy state", res.data.data))
    let data = JSON.parse(localStorage.getItem("productData"))
    this.setState({ categoryId: data["categoryId"], hist: data["productHistory"] }, console.log("categoryId", data["categoryId"]))
    this.state.refresh = true
  }
  componentDidUpdate(prevProps){
    if(prevProps.match!==this.props.match){
      console.log("calling did")
      this.props.applicableFilter(this.props.match.params.pat1)
    }

  }

  handleChange = (e) => {

    const name = e.target.name
    const mode = e.target.getAttribute("mode")

    if (mode === "multiple_price") {
      let high = e.target.value.split("_")[0]
      let low = e.target.value.split("_")[1]
      console.log("id", this.state.query[name])
      let id = e.target.id
      let checked = e.target.checked
      if (!this.state.query[name]) {
        this.setState((prevState, props) => ({
          query: { ...prevState.query, [name]: [{ id, high, low, checked }] }
        }), () => callbackFunction());
      }
      else {
        let findItem = this.state.query[name].findIndex((item) => item.id === id)
        console.log("find item", findItem)
        if (findItem === -1) {
          this.setState((prevState, props) => ({
            query: { ...prevState.query, [name]: [...prevState.query[name], { id, high, low, checked }] }
          }), () => callbackFunction());
        }
        else {
          let items = this.state.query[name].filter((item) => item.id != id)
          this.setState((prevState, props) => ({
            query: { ...prevState.query, [name]: items }
          }), () => callbackFunction());
        }

      }

    }
    else if (mode === "multiple") {
      let value = e.target.value
      if (!this.state.query[name]) {
        this.setState((prevState, props) => ({
          query: { ...prevState.query, [name]: [value] }
        }), () => callbackFunction());
      }
      else {
        let findItem = this.state.query[name].findIndex((item) => item === value)
        if (findItem === -1) {
          this.setState((prevState, props) => ({
            query: { ...prevState.query, [name]: [...prevState.query[name], value] }
          }), () => callbackFunction());
        }
        else {
          let items = this.state.query[name].filter((item) => item !== value)
          this.setState((prevState, props) => ({
            query: { ...prevState.query, [name]: items }
          }), () => callbackFunction());
        }

      }

    }
    else {
      let value = e.target.value
      this.setState((prevState, props) => ({
        query: { ...prevState.query, [name]: value }
      }), () => callbackFunction());

    }



    const callbackFunction = () => {
      console.log("calling callback")
      this.props.productData(this.props.match.params.pat1, this.state.query, this.props.location.state.history)
    }

  }

  render() {
    return (
      <div className="shopMain">
        <Header />
        <SubMenu {...this.props} />
        <div className="shop-area pt-60 pb-60 specific">
          <div className="container-fluid">
            <div className="main-content">
              <div className="row flex-row">
                <ProductSideBarCategories
                  {...this.props}
                  handleChange={this.handleChange}
                />
                <ProductMainContent
                  {...this.props}
                  handleChange={this.handleChange}
                  sortBy={this.state.sortby}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default ProductCategories;