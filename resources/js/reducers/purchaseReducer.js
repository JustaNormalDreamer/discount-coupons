import { COUPON_USED } from "../types/purchaseTypes";

const initialState = {
    discount: null,
};

export default function(state= initialState, action) {
    switch (action.type) {
        case COUPON_USED:
            return {
                ...state,
                discount: action.payload
            }

        default:
            return state;
    }
}
