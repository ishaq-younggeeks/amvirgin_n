import ShoppingWishlistContainer from "./shopping/modules/Wishlist/";
import ShopPlaceOrder from "./shopping/modules/Order"
import ShopPayment from "./shopping/modules/Order/components/ShopPayment"
import ShopEditProfile from "./shopping/modules/Profile/EditProfile";
import ViewMyOrders from "./shopping/modules/ViewMyOrders/ViewMyOrders";
import ViewMyOrderDetails from "./shopping/modules/ViewMyOrders/ViewMyOrderDetails";
import TrackOrder from "./shopping/modules/ViewMyOrders/TrackOrder";
import OrderSuccessful from "./shopping/modules/Order/components/OrderSuccessful";

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
        path: 'myprofile/myOrders/orderDetails',
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