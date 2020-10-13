import Axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING } from "../types/authTypes";
import { GET_ERRORS } from "../types/errorTypes";

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
export const useCoupon = (userId, productId, couponData) => (dispatch) => {
    Axios.post(`/api/users/${userId}/${productId}`, couponData, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => {
        console.log('Coupon claimed!', res)
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const profileLoading = () => {
    return {
        type: PROFILE_LOADING,
    };
}
