import Axios from 'axios'
import { GET_COUPONS, GET_COUPON, COUPON_LOADING } from "../types/couponsTypes";
import { GET_ERRORS } from "../types/errorTypes";

//get the coupons
export const getCoupons = () => (dispatch) => {
    dispatch(setCouponLoading());
    Axios.get('/api/coupons', {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => dispatch({
        type: GET_COUPONS,
        payload: res.data.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

export const setCouponLoading = () => {
    return {
        type: COUPON_LOADING,
    }
}
