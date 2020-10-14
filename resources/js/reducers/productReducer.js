import {GET_PRODUCTS, DELETE_PRODUCT, PRODUCT_LOADING, GET_PRODUCT} from "../types/productTypes";

const initialState = {
    products: null,
    product: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }

        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }

        case PRODUCT_LOADING:
            return {
                loading: true,
                products: null,
                product: null,
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload)
            }

        default:
            return state;
    }
}
