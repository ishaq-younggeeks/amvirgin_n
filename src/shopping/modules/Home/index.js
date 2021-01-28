import {connect} from 'react-redux';
import { withRouter } from "react-router-dom"
import ShoppingHome from './components/ShoppingHome';
import {fetchData,productData} from './shoppingHomeReducer';
import {fetchHomeData} from './shoppingHomeAction';
import { productDetail } from "../ProductDetail/ProductDetailAction";


const mapStateToProps = (state) => {
    console.log("state data",state.shopping.data)
    return  {
        data: state.shopping.data,
        fetching: state.shopping.fetching,
        productList : state.shopping.productList,
        offset:state.shopping.offset,
        limit:state.shopping.limit,
        homeData : state.shopping.shoppinghomedata,
        allDealsProducts: state.shopping.allDealsProducts
    }
}
const mapDispatchToProps = (dispatch) => {
	return({
        fetchData:() => dispatch(fetchData()),
        fetchHomeData:() => dispatch(fetchHomeData()),
        productDetail:(id,history)=> dispatch(productDetail(id,history))
	});
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ShoppingHome));