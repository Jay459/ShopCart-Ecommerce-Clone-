import {ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS} from '../constants/productConstants'



const productReducers = (state = {products:[]}, action) =>{
    switch(action.type){
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS    :
            return {
                loading: false,
                products: action.payload.products,
                productsCount : action.payload.productsCount
            }
        case ALL_PRODUCT_FAIL:
            return {    
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return state;
    }
}

export default productReducers