import React, { Component,Suspense,lazy } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "./seller/modules/assets/loader.gif";
import { getSellerProfile }    from "./seller/modules/Authentication/sellerAuthAction"
import {getSessionProfile}     from './globalComponents/sessionprofileAction.js'
//Shopping Routes));
const ShoppingHomeContainer        = lazy(() => import( "./shopping/modules/Home"));
const ShoppingCartContainer        = lazy(() => import( "./shopping/modules/Cart"));
const ShoppingWishlistContainer    = lazy(() => import( "./shopping/modules/Wishlist/"));
const ShoppingProductContainer     = lazy(() => import( "./shopping/modules/ProductCategory"));
const ViewShopProductDetails       = lazy(() => import( "./shopping/modules/ProductDetail"));
const ShopPlaceOrder               = lazy(() => import( "./shopping/modules/Order"));
const ShopPayment                  = lazy(() => import( "./shopping/modules/Order/components/ShopPayment"));
const ShopEditProfile              = lazy(() => import( "./shopping/modules/Profile/EditProfile"));
const ViewAllDeals                 = lazy(() => import( "./shopping/modules/Home/components/ViewAllDeals"));
const ViewMyOrders                 = lazy(() => import( "./shopping/modules/ViewMyOrders/ViewMyOrders"));

// Seller Routes
const SellerLogin        = lazy(() => import( "./seller/modules/Authentication/components/Login"));
const SellerRegistration = lazy(() => import( "./seller/modules/Authentication/components/Registration"));
const Dashboard          = lazy(() => import( "./seller/modules/Dashboard/Dashboard"));
const Profile            = lazy(() => import( "./seller/modules/Dashboard/components/Profile"));
const Sellersales        = lazy(() => import( "./seller/modules/Dashboard/components/Sales/Sales"));
const SellerNotification = lazy(() => import( "./seller/modules/Dashboard/components/Notification/Notification"));
const Navigation         = lazy(() => import( "./seller/modules/Dashboard/components/Navigation/Navigation"));
const ViewOrders         = lazy(() => import( "./seller/modules/Dashboard/components/MyOrders/ViewOrder"));
const MyOrders           = lazy(() => import( "./seller/modules/Dashboard/components/MyOrders/MyOrders"));
const MyOrdersCancelled  = lazy(() => import( "./seller/modules/Dashboard/components/MyOrders/OrdersCancelled"));
const MyOrdersReturns    = lazy(() => import( "./seller/modules/Dashboard/components/MyOrders/OrdersReturn"));
const MyProducts         = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/MyProducts"));
const MyBrands           = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/Brandlist"));
const EditProduct        = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/EditProduct"));
const ProductBrand       = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/ProductBrand"));
const BrandApproval      = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/BrandApproval"));
const ListingType        = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/ListingType"));
const ProductCategory    = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/ProductCategory"));
const SellerAddProduct   = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/AddProduct"));
const SellerBulkAddProduct = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/BulkAddProduct"));
const Setting              = lazy(() => import( "./seller/modules/Dashboard/components/Setting/Setting"));
const SellerPayments       = lazy(() => import( "./seller/modules/Dashboard/components/Payments"));
const SellerAdvertisement  = lazy(() => import( "./seller/modules/Dashboard/components/Advertisement"));
const SellerCreateAdvts    = lazy(() => import( "./seller/modules/Dashboard/components/Advertisement/CreateAdvt"));
const SellerPreviousPayments  = lazy(() => import( "./seller/modules/Dashboard/components/Payments/PreviousPayment"));
const SellerOrderTransactions = lazy(() => import( "./seller/modules/Dashboard/components/Payments/Transaction"));
const SellerSupport           = lazy(() => import( "./seller/modules/Dashboard/components/SellerSupport/SellerSupport"));
const SellerMou               = lazy(() => import( "./seller/modules/Dashboard/components/Setting/Mou"));
const SellerSupportTicket     = lazy(() => import( "./seller/modules/Dashboard/components/SellerSupport/MyTicket"));
const BusinessDetail          = lazy(() => import( "./seller/modules/Dashboard/components/Setting/BusinessDetail"));
const ViewProductDetails      = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/ViewProductDetails"));
const Return                  = lazy(() => import( "./seller/modules/Dashboard/components/Return/Return"));
const AddProduct              = lazy(() => import( "./seller/modules/Dashboard/components/MyProducts/components/AddProduct"));

// News Routes
const NewsContainer       = lazy(() => import("./news/modules/News"));
const NewsDetailContainer = lazy(() => import("./news/modules/NewsDetails"));

// Footer Routes
const PrivacyPolicy  = lazy(() => import("./footer/components/PrivacyPolicy"));
const RefundPolicy  = lazy(() => import("./footer/components/RefundPolicy"));
const TermsCondition = lazy(() => import( "./footer/components/TermsCondition"));

// Entertainment Routes
const Home = lazy(() => import('./entertainment/modules/Home/components/Home'));
const Login = lazy(() => import('./entertainment/modules/SignUp/components'));
const Show = lazy(() => import('./entertainment/modules/Show/components/indexdd'));
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

          {/* Footer Routes */}
          <Route exact path="/privacypolicy" component={PrivacyPolicy}/>
          <Route exact path="/refundpolicy" component={RefundPolicy}/>
          <Route exact path="/termsconditions" component={TermsCondition}/>

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

          {/* Entertainment Routes */}
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/show" component={Show}></Route>
          <Route exact path="/collection" component={Collection}></Route>
          <Route exact path="/subscription" component={Subscritption}></Route>
          
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
