import {connect} from 'react-redux';

import ProductDetail from './ProductDetail';
import {productDetail} from './ProductDetailAction';
import {addtoCart} from "../Cart/shoppingCartAction";


const mapStateToProps = (state) => {
    
    return  {
        productDetail : state.productDetail.productDetail.data,
    }
}
const mapDispatchToProps = (dispatch) => {
	return({
        addtoCart:(id) => dispatch(addtoCart(id)),
        getproduct:(id) => dispatch(productDetail(id))
	});
};


export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);