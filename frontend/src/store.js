import {createStore , combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productReducers, productDetailsReducer} from './reducers/productReducers'
import {authReducer} from './reducers/userReducers'

const reducer = combineReducers({
    products: productReducers,
    productDetails : productDetailsReducer,
    auth:authReducer
})

const initialState ={}
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store