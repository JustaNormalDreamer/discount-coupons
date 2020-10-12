import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import couponReducer from "./couponReducer";

export default combineReducers({
    coupon: couponReducer,
    error: errorReducer
});
