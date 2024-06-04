import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/CartSlice';

const store = configureStore({
    reducer:{
        userName : userReducer,
        cart : cartReducer
    }
})

export default store