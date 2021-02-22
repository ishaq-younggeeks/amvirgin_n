import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {userActions} from './entertainment/actions'
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
import Navigation from "./seller/modules/components/Navigation/Navigation";

import { getSellerProfile } from "./seller/modules/Authentication/sellerAuthAction";
import { getSessionProfile } from './globalComponents/sessionprofileAction.js'
import { Loader } from "./seller/modules/assets/loader.gif";

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

import { ShopRoute, SellerRoute } from './AppRoute'
const Home = lazy(() => import('./entertainment/modules/Home/components/Home'));
const Login = lazy(() => import('./entertainment/modules/SignUp/components'));
const Show = lazy(() => import('./entertainment/modules/Show/components/index'));
const Collection = lazy(() => import('./entertainment/modules/Collection'));
const Subscritption = lazy(() => import('./entertainment/modules/subscription'));

class App extends Component {
  componentDidMount = () => {
    this.props.getUserProfile()
    this.props.getSellerProfile();
    this.props.getSessionProfile();
  };

  render() {
    const { currentSeller, currentUser } = this.props;
    const token = localStorage.getItem("token");
    if (localStorage.getItem('session') === null) {
      this.props.getSessionProfile();
    }

    return (

      <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
            {/* News Routes */}
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/news" component={NewsContainer} />
            <Route exact path="/news/newsDetails" component={NewsDetailContainer} />
            <Route exact path="/news/details" component={NewsArticleDetails} />

            {/* Footer Routes */}
            <Route exact path="/privacypolicy" component={PrivacyPolicy} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/termsconditions" component={TermsCondition} />
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
            {ShopRoute.map((item, i) => (currentUser ?
              <Route exact {...item} /> : null))}
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
            {currentSeller && token &&
              <Navigation>
                {SellerRoute.map((item, i) =>
                  <Route exact {...item} />)}
              </Navigation>
            }
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
    currentUser: state.authReducer.loggedIn

  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSellerProfile: () => dispatch(getSellerProfile()),
    getSessionProfile: () => dispatch(getSessionProfile()),
    getUserProfile:() => dispatch(userActions.getuserbyid()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
