import React, { Component,Suspense,lazy } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//Shopping Routes
import ShoppingHomeContainer from "./shopping/modules/Home";
import ShoppingCartContainer from "./shopping/modules/Cart";
import ShoppingWishlistContainer from "./shopping/modules/Wishlist/";
import ShoppingProductContainer from "./shopping/modules/ProductCategory";
import ViewShopProductDetails from "./shopping/modules/ProductDetail"
import ShopPlaceOrder from "./shopping/modules/Order"
import ShopPayment from "./shopping/modules/Order/components/ShopPayment"
import ShopEditProfile from "./shopping/modules/Profile/EditProfile";
import ViewAllDeals from "./shopping/modules/Home/components/ViewAllDeals";
import ViewMyOrders from "./shopping/modules/ViewMyOrders/ViewMyOrders";
import ViewMyOrderDetails from "./shopping/modules/ViewMyOrders/ViewMyOrderDetails";
import TrackOrder from "./shopping/modules/ViewMyOrders/TrackOrder";
import OrderSuccessful from "./shopping/modules/Order/components/OrderSuccessful";
import SubscriptionSuccessful from "./entertainment/modules/subscription/SubscriptionSuccessful";

// Seller Routes
import SellerLogin from "./seller/modules/Authentication/components/Login";
import SellerRegistration from "./seller/modules/Authentication/components/Registration";
import Dashboard from "./seller/modules/Dashboard/Dashboard";
import Profile from "./seller/modules/Dashboard/components/Profile";
import Sellersales from "./seller/modules/Dashboard/components/Sales/Sales";
import SellerNotification from "./seller/modules/Dashboard/components/Notification/Notification";
import Navigation from "./seller/modules/Dashboard/components/Navigation/Navigation";
import ViewOrders from "./seller/modules/Dashboard/components/MyOrders/ViewOrder";
import MyOrders from "./seller/modules/Dashboard/components/MyOrders/MyOrders";
import MyOrdersCancelled from "./seller/modules/Dashboard/components/MyOrders/OrdersCancelled";
import MyOrdersReturns from "./seller/modules/Dashboard/components/MyOrders/OrdersReturn";
import MyProducts from "./seller/modules/Dashboard/components/MyProducts/components/MyProducts";
import MyBrands from "./seller/modules/Dashboard/components/MyProducts/components/Brandlist"
import EditProduct from "./seller/modules/Dashboard/components/MyProducts/components/EditProduct"
import ProductBrand from "./seller/modules/Dashboard/components/MyProducts/components/ProductBrand";
import BrandApproval from "./seller/modules/Dashboard/components/MyProducts/components/BrandApproval";
import ListingType from "./seller/modules/Dashboard/components/MyProducts/components/ListingType"
import ProductCategory from "./seller/modules/Dashboard/components/MyProducts/components/ProductCategory";
import SellerAddProduct from "./seller/modules/Dashboard/components/MyProducts/components/AddProduct";
import SellerBulkAddProduct from "./seller/modules/Dashboard/components/MyProducts/components/BulkAddProduct";
import Setting from "./seller/modules/Dashboard/components/Setting/Setting";
import SellerPayments from "./seller/modules/Dashboard/components/Payments";
import SellerAdvertisement from "./seller/modules/Dashboard/components/Advertisement";
import SellerCreateAdvts from "./seller/modules/Dashboard/components/Advertisement/CreateAdvt"
import SellerPreviousPayments from "./seller/modules/Dashboard/components/Payments/PreviousPayment";
import SellerOrderTransactions from "./seller/modules/Dashboard/components/Payments/Transaction"
import SellerSupport from "./seller/modules/Dashboard/components/SellerSupport/SellerSupport";
import SellerMou from "./seller/modules/Dashboard/components/Setting/Mou"
import SellerSupportTicket from "./seller/modules/Dashboard/components/SellerSupport/MyTicket"
import BusinessDetail from "./seller/modules/Dashboard/components/Setting/BusinessDetail";
import ViewProductDetails from "./seller/modules/Dashboard/components/MyProducts/components/ViewProductDetails";
import { getSellerProfile } from "./seller/modules/Authentication/sellerAuthAction";
import {getSessionProfile} from './globalComponents/sessionprofileAction.js'
import Return from "./seller/modules/Dashboard/components/Return/Return";
import { Loader } from "./seller/modules/assets/loader.gif";
import AddProduct from "./seller/modules/Dashboard/components/MyProducts/components/AddProduct";

// News Routes
import NewsContainer from "./news/modules/News"
import NewsDetailContainer from "./news/modules/NewsDetails"
import NewsArticleDetails from "./news/modules/News/components/NewsArticleDetails";

// Footer Routes
import PrivacyPolicy from "./footer/components/PrivacyPolicy"
import AboutUs from "./footer/components/AboutUs"
import TermsCondition from "./footer/components/TermsCondition"
import ContactUs from "./footer/components/ContactUs";

// Entertainment Routes
import RentalPayment from "./entertainment/modules/Show/components/RentalPayment"
import RentalVedio from "./entertainment/modules/Show/components/RentalVedio"
const Home = lazy(() => import('./entertainment/modules/Home/components/Home'));
const Login = lazy(() => import('./entertainment/modules/SignUp/components'));
const Show = lazy(() => import('./entertainment/modules/Show/components/index'));
const Collection = lazy(() => import('./entertainment/modules/Collection'));
const Subscritption = lazy(() => import('./entertainment/modules/subscription'));

class App extends Component {
  componentDidMount = () => {
    this.props.getSellerProfile();
    this.props.getSessionProfile();
  };
  
  render() {
    const { currentUser } = this.props;
    const token = localStorage.getItem("token");
    if(localStorage.getItem('session')===null)
    {
      this.props.getSessionProfile();
    }

    return (
      
      <BrowserRouter>
      <Suspense fallback={null}>
        <Switch>
          {/* News Routes */}
          <Route exact path="/news" component={NewsContainer}/>
          <Route exact path="/news/newsDetails" component={NewsDetailContainer}/>
          <Route exact path="/news/details" component={NewsArticleDetails}/>

          {/* Footer Routes */}
          <Route exact path="/privacypolicy" component={PrivacyPolicy}/>
          <Route exact path="/aboutus" component={AboutUs}/>
          <Route exact path="/termsconditions" component={TermsCondition}/>
          <Route exact path="/contact" component={ContactUs} />

          {/* Shopping Routes */}
          {/* <Route exact path="/" component={ShoppingHomeContainer} /> */}
          <Route exact path="/shop" component={ShoppingHomeContainer} />
          <Route exact path="/shop/cart" component={ShoppingCartContainer} />
          <Route exact path="/shop/trendingDeals" component={ViewAllDeals} />
          <Route

            path="/shop/:pat1"
            component={ShoppingProductContainer}
          />
          <Route exact path="/productdetail/:pat1" component={ViewShopProductDetails} />
          <Route exact path="/wishlist" component={ShoppingWishlistContainer} />
          <Route exact path="/placeOrder" component={ShopPlaceOrder} />
          <Route exact path="/ShopPayment" component={ShopPayment} />
          <Route exact path="/myprofile/edit" component={ShopEditProfile} />
          <Route exact path="/myprofile/myOrders" component={ViewMyOrders} />
          <Route exact path="/myprofile/myOrders/orderDetails" component={ViewMyOrderDetails} />
          <Route exact path="/myprofile/myOrders/trackOrder" component={TrackOrder} />
          <Route exact path="/success" component={OrderSuccessful} />

          {/* Entertainment Routes */}
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/video/rentalVedio" component={RentalVedio}></Route>
          <Route exact path="/video/rentalpayment" component={RentalPayment}></Route>
          <Route exact path="/video/:videoId" component={Show}></Route>
          <Route exact path="/collection/:title" component={Collection}></Route>
          <Route exact path="/subscription" component={Subscritption}></Route>
          <Route exact path="/subscription/checkout" component={SubscriptionSuccessful}></Route> 
          
          {/* Seller Routes */}
          <Route path="/seller/login" exact component={SellerLogin} />
          <Route
            path="/seller/registration"
            exact
            component={SellerRegistration}
          />
          {currentUser && token && (
            <Navigation>
              <Route path="/seller/dashboard" exact component={Dashboard} />
              <Route path="/seller/dashboard/profile" exact component={Profile} />
              <Route path="/seller/dashboard/notification" exact component={SellerNotification} />
              <Route path="/seller/dashboard/sales" exact component={Sellersales} />
              <Route path="/seller/dashboard/Setting" exact component={Setting} />
              <Route path="/seller/dashboard/mou" exact component={SellerMou} />
              <Route path="/seller/dashboard/BusinessDetail" exact component={BusinessDetail} />
              <Route path="/seller/dashboard/support" exact component={SellerSupport} />
              <Route path="/seller/dashboard/support/myticket" exact component={SellerSupportTicket} />
              <Route path="/seller/dashboard/payments/summary" exact component={SellerPayments} />
              <Route path="/seller/dashboard/payments/previous-payment" exact component={SellerPreviousPayments} />
              <Route path="/seller/dashboard/payments/order-transaction" exact component={SellerOrderTransactions} />
              <Route path="/seller/dashboard/advertisement" exact component={SellerAdvertisement}/>
              <Route path="/seller/dashboard/advertisement/create-advt" exact component ={SellerCreateAdvts}/>
              <Route path="/seller/dashboard/return" exact component={Return}/>
              <Route
                path="/seller/dashboard/myorders"
                exact
                component={MyOrders}
              />
               <Route
                path="/seller/dashboard/myorders/returns-order"
                exact
                component={MyOrdersReturns}
              />
              <Route
                path="/seller/dashboard/myorders/cancelled-orders"
                exact
                component={MyOrdersCancelled}
              />
              <Route
                path="/seller/dashboard/brand-approval"
                exact
                component={BrandApproval}
              />
              <Route
              path="/seller/dashboard/vieworders"
              exact
              component={ViewOrders}
            />
              <Route
                path="/seller/dashboard/myproducts"
                exact
                component={MyProducts}
              />
              <Route
                path="/seller/dashboard/brandlist"
                exact
                component={MyBrands}
              />
               <Route
                path="/seller/dashboard/myproducts/:slug"
                exact
                component={ViewProductDetails}
              />
              <Route
                path="/seller/dashboard/editProduct/:slug"
                exact
                component={EditProduct}
              />
              <Route
                path="/seller/dashboard/listing"
                exact
                component={ListingType} 
              />
              <Route
                path="/seller/dashboard/selectcategory"
                exact
                component={ProductCategory}
              />
              <Route
                path="/seller/dashboard/ProductBrand"
                exact
                component={ProductBrand}
              />
              <Route
              path="/seller/dashboard/addproduct"
              exact
              component={SellerAddProduct}
              />
              <Route
              path="/seller/dashboard/addproduct/bulk"
              exact
              component={SellerBulkAddProduct}
              />
            </Navigation>
          )}
          <Redirect to="/" />
        </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    invalidToken: state.sellerAuth.invalidToken,
    currentUser: state.sellerAuth.currentUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSellerProfile: () => dispatch(getSellerProfile()),
    getSessionProfile: () => dispatch(getSessionProfile())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
