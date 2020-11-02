import { connect } from 'react-redux';
import Cart from './components/Cart';
import { fetchCart, deletefromCart, addtoCart, updateitem,movetoWishlisht } from './shoppingCartAction';


const mapStateToProps = (state) => {
  console.log("cart data",state.cart.carts)
  return ({
    cartdata: state.cart.carts,
    cartprice: state.cart.cartprice
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchCart: () => dispatch(fetchCart()),
    addtoCart: (id,history) => dispatch(addtoCart(id,history)),
    deletefromCart: (id) => dispatch(deletefromCart(id)),
    updateitem: (id,qty) => dispatch(updateitem(id,qty)),
    movetoWishlisht: (id) => dispatch(movetoWishlisht(id))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)