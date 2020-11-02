import { connect } from 'react-redux';
import PlaceOrder from './components/PlaceOrder';
import {getAddressDetail,saveAddressDetail,deleteAddress,updateSavedAddress} from './OrderAction'



const mapStateToProps = (state) => {
  console.log(state.addressDetail.addressDetail,"address detail")
  return ({
     addressdata: state.addressDetail.addressDetail,
    cartprice: state.cart.cartprice
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
      addressDetail:() => dispatch(getAddressDetail()),
      saveAddressDetail:(data) => dispatch(saveAddressDetail(data)),
      deleteAddress:(addressId) => dispatch(deleteAddress(addressId)),
      updateSavedAddress:(addressId,data) => dispatch(updateSavedAddress(addressId,data))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)