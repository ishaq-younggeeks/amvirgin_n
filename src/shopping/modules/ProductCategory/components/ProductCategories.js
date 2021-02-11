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
      query:{
        page: 1,
        // sortBy:"",
        // page: 1,
        // color: [],
        // price: {},
        // discount: "",
        // brand: [],
      }
      

    }
  }

  async componentDidMount() {
    let params = {
      sortBy: "relevance",
      page: "1"
    }
    this.props.productData(this.props.match.params.pat1, params, this.props.history)
    const res = await Axios.get(`${baseURL}/customer/products/sorts`)
    this.props.applicableFilter(this.props.match.params.pat1)
    this.setState({ sortby: res.data.data }, console.log("sortBy state", res.data.data))
    let data = JSON.parse(localStorage.getItem("productData"))
    this.setState({ categoryId: data["categoryId"], hist: data["productHistory"] }, console.log("categoryId", data["categoryId"]))
    this.state.refresh = true
  }

  handleChange = (e) => {

    const name=e.target.name
    const mode=e.target.getAttribute("mode")
    let data = {
      params: {
        a: null,
        b: [1, 2, 3, 4],
        c: {
          a: null,
          b: [1, 2, 3],
          c: ["q", "e", "r", "t", "y"]
        },
        sortBy: "relevance",
        page: "1"
      }
    }

    if(mode==="multiple_price"){
      let high = e.target.value.split("_")[0]
      let low = e.target.value.split("_")[1]
      this.setState((prevState, props) => ({
        query: {...prevState.query,[name]:{high,low}}
      }),()=>console.log("current state",this.state.query));
    }
    else if(mode==="multiple")
    {
      let value = e.target.value
      this.setState((prevState, props) => ({
        query: {...prevState.query,[name]:[value]}
      }),()=>console.log("current state",this.state.query));
    }
    else {
      let value = e.target.value
      this.setState((prevState, props) => ({
        query: {...prevState.query,[name]:value}
      }),()=>console.log("current state",this.state.query));

    }
    


    console.log("calling handle change", data)

    // this.props.productData(this.props.match.params.pat1, data, this.props.location.state.history)
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