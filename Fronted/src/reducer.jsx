import { combineReducers } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import ShoppingCart from './features/cart/shoppingCart'
 const rootReducer = combineReducers({
        cart: cartReducer,
        shoppingCart: ShoppingCart,
})



export default rootReducer;
