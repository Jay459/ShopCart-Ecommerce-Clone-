import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

//login
export const login = (email , password)=> async(dispatch) =>{
    try {
        dispatch({type:LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/user/login' , {email, password} , config)
        
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })

    } catch (error) {
        dispatch({
            type : LOGIN_FAIL,
            payload : error.response.data.message
        })
    }
}

export const clearError = ()=> async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}