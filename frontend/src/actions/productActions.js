import axios from 'axios';

import {ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'


export const getProducts = (keyword = '' , currentPage = 1 ) => async (dispatch) =>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST})
        
        const {data} = await axios.get(`/product/getallproducts?page=${currentPage}`)

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload : error.response.data.message 
        })
    }
}

export const getProductDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        
        const {data} = await axios.get(`/product/singleproduct/${id}`);

        dispatch({
            
            type: PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })

    } catch (error) {
        dispatch({
            type : PRODUCT_DETAILS_FAIL,
            payload : error.response.data.message 
        })
    }
}

export const clearError = ()=> async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}