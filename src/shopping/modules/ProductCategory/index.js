import {connect} from 'react-redux';

import ProductCategories from './components/ProductCategories';
import {fetchData,productData,applicableFilter} from '../Home/shoppingHomeReducer';
import {addtoCart} from "../Cart/shoppingCartAction";
import {productDetail} from '../ProductDetail/ProductDetailAction'
import { AddWishlist } from '../Wishlist/WishlistAction';

const mapStateToProps = (state) => {
    console.log("state.shopping.productList",state.shopping.filterList)
    return  {
        // data: state.shopping.data,
        fetching: state.shopping.fetching,
        productList : state.shopping.productList,
        offset:state.shopping.offset,
        limit:state.shopping.limit,
        toggle:state.product.toggle,
        filters:state.shopping.filterList
    }
}

const mapDispatchToProps = (dispatch) => {
	return({
        // fetchData:() => dispatch(fetchData()),
        productData:(id,offset,limit,history) => dispatch(productData(id,offset,limit,history)),
        addtoCart:(id,size) => dispatch(addtoCart(id,size)),
        productDetail:(id,history) => dispatch(productDetail(id,history)),
        AddWishlist:(id)=>dispatch(AddWishlist(id)),
        applicableFilter:(id) => dispatch(applicableFilter(id))
	});
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductCategories);