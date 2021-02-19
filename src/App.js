import React, { Component,Suspense,lazy } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//Shopping Routes
import ShoppingHomeContainer from "./shopping/modules/Home";
import ShoppingCartContainer from "./shopping/modules/Cart";
import ShoppingProductContainer from "./shopping/modules/ProductCategory";
import ViewShopProductDetails from "./shopping/modules/ProductDetail"

import ViewAllDeals from "./shopping/modules/Home/components/ViewAllDeals";

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
import FAQ from "./footer/components/FAQ";
import CancellationPolicy from "./footer/components/CancellationPolicy";
import ShippingPolicy from "./footer/components/ShippingPolicy";
import ReturnPolicy from "./footer/components/ReturnPolicy";

// Entertainment Routes
import RentalPayment from "./entertainment/modules/Show/components/RentalPayment"
import RentalVedio from "./entertainment/modules/Show/components/RentalVedio"

import {ShopRoute} from './AppRoute'
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
    const { currentSeller,currentUser } = this.props;
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
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/news" component={NewsContainer}/>
          <Route exact path="/news/newsDetails" component={NewsDetailContainer}/>
          <Route exact path="/news/details" component={NewsArticleDetails}/>

          {/* Footer Routes */}
          <Route exact path="/privacypolicy" component={PrivacyPolicy}/>
          <Route exact path="/aboutus" component={AboutUs}/>
          <Route exact path="/termsconditions" component={TermsCondition}/>
          <Route exact path="/contact" component={ContactUs} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/returnpolicy" component={ReturnPolicy} />
          <Route exact path="/cancellationPolicy" component={CancellationPolicy} />
          <Route exact path="/shippingPolicy" component={ShippingPolicy} />

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
          {ShopRoute.map((item , i)=>(currentUser?
<Route exact {...item}/> :  null ))}
          {/* Entertainment Routes */}
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/video/rentalVedio" component={RentalVedio}></Route>
          <Route exact path="/video/rentalpayment" component={RentalPayment}></Route>
          <Route exact path="/video/:videoId" component={Show}></Route>
          <Route exact path="/collection/:title" component={Collection}></Route>
          <Route exact path="/subscription" component={Subscritption}></Route>
          <Route exact path="/subscription/checkout" component={SubscriptionSuccessful}></Route> 
          
          {/* Seller Routes */}
          <Route exact path="/seller/login" exact component={SellerLogin} />
          <Route
            path="/seller/registration"
            exact
            component={SellerRegistration}
          />
          {currentSeller && token && (
            <Navigation>
              <Route exact path="/seller/dashboard" exact component={Dashboard} />
              <Route exact path="/seller/dashboard/profile" exact component={Profile} />
              <Route exact path="/seller/dashboard/notification" exact component={SellerNotification} />
              <Route exact path="/seller/dashboard/sales" exact component={Sellersales} />
              <Route exact path="/seller/dashboard/Setting" exact component={Setting} />
              <Route exact path="/seller/dashboard/mou" exact component={SellerMou} />
              <Route exact path="/seller/dashboard/BusinessDetail" exact component={BusinessDetail} />
              <Route exact path="/seller/dashboard/support" exact component={SellerSupport} />
              <Route exact path="/seller/dashboard/support/myticket" exact component={SellerSupportTicket} />
              <Route exact path="/seller/dashboard/payments/summary" exact component={SellerPayments} />
              <Route exact path="/seller/dashboard/payments/previous-payment" exact component={SellerPreviousPayments} />
              <Route exact path="/seller/dashboard/payments/order-transaction" exact component={SellerOrderTransactions} />
              <Route exact path="/seller/dashboard/advertisement" exact component={SellerAdvertisement}/>
              <Route exact path="/seller/dashboard/advertisement/create-advt" exact component ={SellerCreateAdvts}/>
              <Route exact path="/seller/dashboard/return" exact component={Return}/>
              <Route
               exact
                path="/seller/dashboard/myorders"
               
                component={MyOrders}
              />
               <Route
                exact
                path="/seller/dashboard/myorders/returns-order"
               
                component={MyOrdersReturns}
              />
              <Route
               exact
                path="/seller/dashboard/myorders/cancelled-orders"
               
                component={MyOrdersCancelled}
              />
              <Route
              exact
                path="/seller/dashboard/brand-approval"
                
                component={BrandApproval}
              />
              <Route
                exact
              path="/seller/dashboard/vieworders"
            
              component={ViewOrders}
            />
              <Route
                exact
                path="/seller/dashboard/myproducts"
              
                component={MyProducts}
              />
              <Route
               exact
                path="/seller/dashboard/brandlist"
               
                component={MyBrands}
              />
               <Route
                  exact
                path="/seller/dashboard/myproducts/:slug"
             
                component={ViewProductDetails}
              />
              <Route
               exact
                path="/seller/dashboard/editProduct/:slug"
               
                component={EditProduct}
              />
              <Route
               exact
                path="/seller/dashboard/listing"
               
                component={ListingType} 
              />
              <Route
              exact
                path="/seller/dashboard/selectcategory"
                
                component={ProductCategory}
              />
              <Route
                 exact
                path="/seller/dashboard/ProductBrand"
             
                component={ProductBrand}
              />
              <Route
                exact
              path="/seller/dashboard/addproduct"
            
              component={SellerAddProduct}
              />
              <Route
               exact
              path="/seller/dashboard/addproduct/bulk"
             
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
    currentSeller: state.sellerAuth.currentUser,
    currentUser:state.authReducer.loggedIn
    
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSellerProfile: () => dispatch(getSellerProfile()),
    getSessionProfile: () => dispatch(getSessionProfile())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
