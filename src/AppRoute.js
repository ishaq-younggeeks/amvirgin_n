import ShoppingWishlistContainer from "./shopping/modules/Wishlist/";
import ShopPlaceOrder from "./shopping/modules/Order"
import ShopPayment from "./shopping/modules/Order/components/ShopPayment"
import ShopEditProfile from "./shopping/modules/Profile/EditProfile";
import ViewMyOrders from "./shopping/modules/ViewMyOrders/ViewMyOrders";
import ViewMyOrderDetails from "./shopping/modules/ViewMyOrders/ViewMyOrderDetails";
import TrackOrder from "./shopping/modules/ViewMyOrders/TrackOrder";
import OrderSuccessful from "./shopping/modules/Order/components/OrderSuccessful";


//seller Routes


import Dashboard from "./seller/modules/Dashboard/Dashboard";
import Profile from "./seller/modules/components/Profile";
import Sellersales from "./seller/modules/components/Sales/Sales";
import SellerNotification from "./seller/modules/components/Notification/Notification";
import ViewOrders from "./seller/modules/components/MyOrders/ViewOrder";
import MyOrders from "./seller/modules/components/MyOrders/MyOrders";
import MyOrdersCancelled from "./seller/modules/components/MyOrders/OrdersCancelled";
import MyOrdersReturns from "./seller/modules/components/MyOrders/OrdersReturn";
import MyProducts from "./seller/modules/components/MyProducts/components/MyProducts";
import MyBrands from "./seller/modules/components/MyProducts/components/Brandlist"
import EditProduct from "./seller/modules/components/MyProducts/components/EditProduct"
import ProductBrand from "./seller/modules/components/MyProducts/components/ProductBrand";
import BrandApproval from "./seller/modules/components/MyProducts/components/BrandApproval";
import ListingType from "./seller/modules/components/MyProducts/components/ListingType"
import ProductCategory from "./seller/modules/components/MyProducts/components/ProductCategory";
import SellerAddProduct from "./seller/modules/components/MyProducts/components/AddProduct";
import SellerBulkAddProduct from "./seller/modules/components/MyProducts/components/BulkAddProduct";
import Setting from "./seller/modules/components/Setting/Setting";
import SellerPayments from "./seller/modules/components/Payments";
import SellerAdvertisement from "./seller/modules/components/Advertisement";
import SellerCreateAdvts from "./seller/modules/components/Advertisement/CreateAdvt"
import SellerPreviousPayments from "./seller/modules/components/Payments/PreviousPayment";
import SellerOrderTransactions from "./seller/modules/components/Payments/Transaction"
import SellerSupport from "./seller/modules/components/SellerSupport/SellerSupport";
import SellerMou from "./seller/modules/components/Setting/Mou"
import SellerSupportTicket from "./seller/modules/components/SellerSupport/MyTicket"
import BusinessDetail from "./seller/modules/components/Setting/BusinessDetail";
import ViewProductDetails from "./seller/modules/components/MyProducts/components/ViewProductDetails";
import Return from "./seller/modules/components/Return/Return";



export const ShopRoute = [
    {
        path: '/wishlist',
        component: ShoppingWishlistContainer,
    },
    {
        path: '/placeOrder',
        component: ShopPlaceOrder,
    },
    {
        path: '/ShopPayment',
        component: ShopPayment,
    },
    {
        path: '/myprofile/edit',
        component: ShopEditProfile,
    },
    {
        path: '/myprofile/myOrders',
        component: ViewMyOrders,
    },
    {
        path: '/myprofile/myOrders/orderDetails',
        component: ViewMyOrderDetails,
    },
    {
        path: '/myprofile/myOrders/trackOrder',
        component: TrackOrder,
    },
    {
        path: '/success',
        component: OrderSuccessful,
    }

]







export const SellerRoute = [
    {
        path: "/seller/dashboard",
        component: Dashboard
    },
    {
        path: "/seller/dashboard/profile",
        component: Profile
    }, { path: "/seller/dashboard/notification", component: SellerNotification }
    , { path: "/seller/dashboard/sales", component: Sellersales }
    , { path: "/seller/dashboard/Setting", component: Setting }
    , { path: "/seller/dashboard/mou", component: SellerMou }
    , { path: "/seller/dashboard/BusinessDetail", component: BusinessDetail }
    , { path: "/seller/dashboard/support", component: SellerSupport }
    , { path: "/seller/dashboard/support/myticket", component: SellerSupportTicket }
    , { path: "/seller/dashboard/payments/summary", component: SellerPayments }
    , { path: "/seller/dashboard/payments/previous-payment", component: SellerPreviousPayments }
    , { path: "/seller/dashboard/payments/order-transaction", component: SellerOrderTransactions }
    , { path: "/seller/dashboard/advertisement", component: SellerAdvertisement }
    , { path: "/seller/dashboard/advertisement/create-advt", component: SellerCreateAdvts }
    , { path: "/seller/dashboard/return", component: Return }
    , {
        path: "/seller/dashboard/myorders"

        , component: MyOrders
    }



    , {
        path: "/seller/dashboard/myorders/returns-order"

        , component: MyOrdersReturns
    }



    , {
        path: "/seller/dashboard/myorders/cancelled-orders"

        , component: MyOrdersCancelled
    }



    , {
        path: "/seller/dashboard/brand-approval"

        , component: BrandApproval
    }



    , {
        path: "/seller/dashboard/vieworders"

        , component: ViewOrders
    }



    , {
        path: "/seller/dashboard/myproducts"

        , component: MyProducts
    }



    , {
        path: "/seller/dashboard/brandlist"

        , component: MyBrands
    }



    , {
        path: "/seller/dashboard/myproducts/:slug"

        , component: ViewProductDetails
    }



    , {
        path: "/seller/dashboard/editProduct/:slug"

        , component: EditProduct
    }



    , {
        path: "/seller/dashboard/listing"

        , component: ListingType
    }



    , {
        path: "/seller/dashboard/selectcategory"

        , component: ProductCategory
    }



    , {
        path: "/seller/dashboard/ProductBrand"

        , component: ProductBrand
    }



    , {
        path: "/seller/dashboard/addproduct"

        , component: SellerAddProduct
    }



    , {
        path: "/seller/dashboard/addproduct/bulk",
        component: SellerBulkAddProduct
    }
]