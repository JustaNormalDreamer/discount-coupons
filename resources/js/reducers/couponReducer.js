import { GET_COUPONS, GET_COUPON, COUPON_LOADING } from "../types/couponsTypes";

const initialState = {
    coupons: [],
    coupon: {},
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
            }

        default:
            return state;
    }
}
