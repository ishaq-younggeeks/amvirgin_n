import React from 'react';
import '../../../categorystyle.css';
import '../../../style.css';

import Header from '../../../../entertainment/modules/Header'
import SubMenu from '../../Home/components/SubMenu';
import ProductSideBarCategories from './ProductSideBarCategories';
import Footer from '../../Home/components/FooterWhite';

class ProductCategories extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //this.props.fetchData();
    console.log("productlist under productcategories",this.productList);
    // this.props.productData(this.props.location.data,this.props.offset,this.props.limit);
  }

  render() {
    return (
      <div className="shopMain">
        <Header/>
        {/* <SubMenu category={this.props.data}{...this.props} /> */}
        <SubMenu {...this.props} />
        <ProductSideBarCategories productList={this.props.productList}{...this.props}/>
        <Footer/>
      </div>
    )
  }
}
export default ProductCategories;