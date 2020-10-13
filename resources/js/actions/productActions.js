import Axios from 'axios';
import { GET_PRODUCTS, GET_PRODUCT, DELETE_PRODUCT, PRODUCT_LOADING } from "../types/productTypes";
import { GET_ERRORS } from "../types/errorTypes";

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

//get a single product
export const getProduct = (productId) => (dispatch) => {
    dispatch(productLoading());
    Axios.get(`/api/products/${productId}`, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => dispatch({
        type: GET_PRODUCT,
        payload: res.data.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//update a product
export const updateProduct = (productId, productData, history) => (dispatch) => {
    dispatch(productLoading());
    Axios.put(`/api/products/${productId}`, productData, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => history.push('/products'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
    }));
}

//delete product
export const deleteProduct = (productId) => (dispatch) => {
    Axios.delete(`/api/products/${productId}`, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: productId
            })
        }
    ).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

//product loading
export const productLoading = () => {
    return {
        type: PRODUCT_LOADING,
    }
}
