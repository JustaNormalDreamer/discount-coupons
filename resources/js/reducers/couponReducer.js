import { GET_COUPONS, GET_COUPON, COUPON_LOADING, DELETE_COUPON } from "../types/couponsTypes";

const initialState = {
    coupons: null,
    coupon: null,
    loading: false,
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_COUPONS:
            return {
                ...state,
                coupons: action.payload,
                loading: false,
            }

        case GET_COUPON:
            return {
                ...state,
                coupon: action.payload,
                loading: false
            }

        case COUPON_LOADING:
            return {
                ...state,
                loading: true,
                coupons: null,
                coupon: null,
            }

        case DELETE_COUPON:
            return {
                ...state,
                coupons: state.coupons.filter(coupon => coupon.id !== action.payload)
            }

        default:
            return state;
    }
}
