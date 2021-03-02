import {connect} from 'react-redux';

import ProductDetail from './ProductDetail';
import {productDetail} from './ProductDetailAction';
import {addtoCart} from "../Cart/shoppingCartAction";
import {productData} from '../Home/shoppingHomeReducer';


const mapStateToProps = (state) => {
    
    return  {
        productDetail : state.productDetail.productDetail.data,
    }
}
const mapDispatchToProps = (dispatch) => {
	return({
        addtoCart:(id) => dispatch(addtoCart(id)),
        getproduct:(id) => dispatch(productDetail(id)),
        productData:(id,sortKey,currentPage,history) => dispatch(productData(id,sortKey,currentPage,history)),

	});
};


export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);