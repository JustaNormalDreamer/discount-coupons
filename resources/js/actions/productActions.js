import Axios from 'axios';
import { GET_PRODUCTS, DELETE_PRODUCT, PRODUCT_LOADING } from "../types/productTypes";
import { GET_ERRORS } from "../types/errorTypes";
import {COUPON_LOADING} from "../types/couponsTypes";

//get products
export const getProducts = () => (dispatch) => {
    dispatch(productLoading());
    Axios.get('/api/products', {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => dispatch({
        type: GET_PRODUCTS,
        payload: res.data.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//create product
export const createProduct = (productData, history) => (dispatch) => {
    Axios.post('/api/products', productData,{
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => {
        history.push('/products')
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
    }))
}

//product loading
export const productLoading = () => {
    return {
        type: PRODUCT_LOADING,
    }
}
