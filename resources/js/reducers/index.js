import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import couponReducer from "./couponReducer";
import productReducer from "./productReducer";

export default combineReducers({
    coupon: couponReducer,
    product: productReducer,
    error: errorReducer
});
