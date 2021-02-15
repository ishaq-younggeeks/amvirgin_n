
/* Api list  for news section */
export const news = {
    categories:"/customer/news/categories/",
    articles:"/customer/news/articles/"

}

/* Api list  for shop section */
export const shop = {
    //cart
    fetchCart:"/customer/cart/retrieve?",
    addToCart:"/customer/cart/add",
    deleteFromCart:"/customer/cart/destroy",
    updateCart:"/customer/cart/update",
    moveToWishlist:"/customer/cart/wishlist/",

    //home
    home:"/customer/shop/homepage",
    allDeals:"/customer/shop/deals",

    //order
    address:"/customer/addresses/",
    checkout:"/customer/cart/checkout",
    placeOrder:"/customer/cart/submit",

    //productDetails
    products:"/customer/products",

    //profile
    profile:"/customer/profile/",

    //myOrders
    myOrders:"/customer/orders",

    //wishlist
    wishlist:"/customer/wishlist/",
}


/* Api list  for seller section */
export const seller = {
    login:"/seller/login?type=1",
    profile:"/seller/profile",
    logout:"/seller/logout",
    registration:"/seller?email=",
    dashboard:"/seller/dashboard",
    advt:"/seller/promotions/",
    sellerOrders:"/seller/orders",

    //product
    currencies:"/seller/currencies",
    categories:"/seller/categories",
    countryState:"/seller/countries",
    hsn:"/seller/hsn",
    productToken:"/seller/products/token/create",
    product:"/seller/products",
    bulk:"/seller/bulk",

    //brand
    approval:"/seller/brands/approval",
    approved:"/seller/brands/approved",
    allBrands:"/seller/brands/all",

    //announcements
    announcement:"/seller/announcements/",

    //payment
    payments:"/seller/payments/overview",
    transactions:"/seller/payments/transactions",
    sellerProfile:"/seller/profile",

    //returns
    returns:"/seller/returns/",

    //sales
    sales:"/seller/growth/overview?days=",

    //support
    support:"/seller/support/tickets",

    //settings
    business:"/seller/profile/business-details",
    bank:"/seller/profile/business-details",
    mou:"/seller/profile/mou/",
}

/* Api list  for entainment section */
export const entertainment = {
    login:"/customer/login",
    register:"/customer/register",
    otp:"/customer?mobile=",
    resetPwd:"/customer/password/reset?",
    profile:"/customer/profile",
    logout:"/customer/logout",

    //subscription
    subscription:"/customer/subscriptions",
    checkout:"/customer/subscriptions/checkout",

    //collection
    collection:"/customer/entertainment/section/",

    //home
    home:"/customer/entertainment/homepage",

    //video
    videos:"/customer/videos/",
    trending:"/customer/entertainment/trending",
}