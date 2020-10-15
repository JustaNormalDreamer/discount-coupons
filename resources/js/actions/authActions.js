import Axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING } from "../types/authTypes";
import { GET_ERRORS } from "../types/errorTypes";
import { COUPON_USED } from "../types/purchaseTypes";

//get user profile
export const getProfile = () => (dispatch) => {
    Axios.get(`/api/users/1`, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//product purchase actions using coupons
export const useCoupon = (userId, productId, couponData, history) => (dispatch) => {
    Axios.post(`/api/users/${userId}/${productId}`, couponData, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => {
        dispatch({
            type: COUPON_USED,
            payload: res.data.data
        });
        // history.push('/products');
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
    }))
}

export const profileLoading = () => {
    return {
        type: PROFILE_LOADING,
    };
}
