import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from "../Store/history";

/*----------------------ENTERTAINMENT IMPORT FILES-----------------------*/

import { registrationReducer } from '../entertainment/reducers/registrationReducer';
import { LoginReducer } from '../entertainment/reducers/loginReducers';
import { authReducer } from '../entertainment/reducers/authReducer';
import shoppingProductDetailReducer from "../shopping/modules/ProductDetail/shoppingProductDetailReducer"
import EntertainmentDashboard from "../entertainment/modules/Home/components/HomeReducer"
import ShowVideos from "../entertainment/modules/Show/components/ShowReducer"
import ShowCollection from "../entertainment/modules/Collection/CollectionReducer"
import subscriptionReducer from "../entertainment/reducers/subscriptionReducer";

/*--------------------GLOBAL SEARCH Import File---------------------------*/

import globalSearch from "../globalComponents/globalReducer/Reducer"


/*----------------------SHOPPING IMPORT FILES-----------------------*/
import shoppingHomeReducer from "../shopping/modules/Home/shoppingHomeReducer";
import shoppingCartReducer from "../shopping/modules/Cart/shoppingCartReducer";
import WishlistReducer from "../shopping/modules/Wishlist/WishlistReducer";
import productCategoryReducer from "../shopping/modules/ProductCategory/productCategoryReducer";
import shoppingOrderReducer from "../shopping/modules/Order/OrderReducer";
import EditProfileReducer from "../shopping/modules/Profile/ProfileReducer";
import ViewMyOrdersReducer from "../shopping/modules/ViewMyOrders/ViewMyOrdersReducer";


/*----------------------SELLER IMPORT FILES-----------------------*/
import sellerAuthReducer from "../seller/modules/Authentication/sellerAuthReducer";
import sellerProfileReducer from "../seller/modules/components/Profile/ProfileReducer";
import sellerAddProductReducer from "../seller/modules/components/MyProducts/sellerAddProductReducer";
import sellerOrderReducer from "../seller/modules/components/MyOrders/sellerOrderReducer"
import sellerAnnouncementReducer from "../seller/modules/components/Notification/AnnouncmentReducer";
import sellerSettingReducer from "../seller/modules/components/Setting/SettingReducer";
import sellerSupportReducer from "../seller/modules/components/SellerSupport/SellerSupportReducer";
import sellerPaymentReducer from "../seller/modules/components/Payments/PaymentReducer";
import sellerGrowthReducer from "../seller/modules/components/Sales/SellerGrowthReducer";
import sellerAdvtReducer from "../seller/modules/components/Advertisement/AdvReducer"
import sellerDashboardReducer from "../seller/modules/Dashboard/DashboardReducer";
import sellerReturnReducer from "../seller/modules/components/Return/ReturnReducer";

/*--------------------------NEWS------------------------------------*/
import NewsReducer from "../news/modules/News/NewsReducer"

/*--------------------------FOOTER------------------------------------*/
import FooterReducer from "./../footer/components/FooterReducer"; 

const rootReducer = combineReducers({
  router: connectRouter(history),
  /*--------------ENTERTAINMENT REDUCER---------------*/
  authReducer,
  registrationReducer,
  LoginReducer,
  Home:EntertainmentDashboard,
  ShowVideos:ShowVideos,
  ShowCollection:ShowCollection,
  subscriptionReducer:subscriptionReducer,
  

  /*--------------GLOBAL SEARCH-------------------*/
  globalSearch:globalSearch,

/*--------------SHOPPING REDUCER---------------*/
  shopping: shoppingHomeReducer,
  cart: shoppingCartReducer,
  wishlist:WishlistReducer,
  product: productCategoryReducer,
  profile:sellerProfileReducer,
  productDetail:shoppingProductDetailReducer,
  addressDetail:shoppingOrderReducer,
  EditProfile:EditProfileReducer,
  MyOrders: ViewMyOrdersReducer,

  /*--------------SELLER REDUCER---------------*/
  sellerAuth: sellerAuthReducer,
  sellerAddProduct: sellerAddProductReducer,
  sellerOrders:sellerOrderReducer,
  sellerAnnouncement:sellerAnnouncementReducer,
  sellerSetting:sellerSettingReducer,
  sellerSupport:sellerSupportReducer,
  sellerPayment:sellerPaymentReducer,
  sellerGrowth:sellerGrowthReducer,
  sellerAdvt:sellerAdvtReducer,
  sellerDashboard:sellerDashboardReducer,
  sellerReturn:sellerReturnReducer,

  /*-----------------NEWS REDUCER--------------*/
  News:NewsReducer,

  /*-----------------FOOTER REDUCER--------------*/
  Footer:FooterReducer
});
export default rootReducer;
