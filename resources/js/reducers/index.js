import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import couponReducer from "./couponReducer";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import purchaseReducer from "./purchaseReducer";

export default combineReducers({
    auth: authReducer,
    coupon: couponReducer,
    product: productReducer,
    purchase: purchaseReducer,
    error: errorReducer
});
