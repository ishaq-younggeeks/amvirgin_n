import { connect } from 'react-redux';
import Wish from './component/Wishlist';
import { fetchWishlist, deleteWish,moveToCart } from './WishlistAction';
import { productDetail } from "../ProductDetail/ProductDetailAction";

const mapStateToProps = (state) => {
    return ({
        wishlist: state.wishlist.product
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchWishlist: () => dispatch(fetchWishlist()),
        deleteWish:(id) => dispatch(deleteWish(id)),
        productDetail:(id,history)=> dispatch(productDetail(id,history)),
        moveToCart:(id,size) => dispatch(moveToCart(id))
    });
}

export default connect(mapStateToProps, mapDispatchToProps )(Wish)