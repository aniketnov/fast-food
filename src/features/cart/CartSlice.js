import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart : []
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addItem(state , action){
            // payload = newitem
      state.cart.push(action.payload)
        },
        deleteItem(state , action){
            // payload = pizzaId
         state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
        },
        incItemQuanty(state , action){
         const item = state.cart.find((item) => item.pizzaId === action.payload)
         item.quantity++
         item.totalPrice = item.quantity * item.unitPrice

        },
        decItemQuanty(state , action){
            const item = state.cart.find((item) => item.pizzaId === action.payload)
           
            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice
            if(item.quantity === 0 ) return cartSlice.caseReducers.deleteItem(state, action)
        },
        clearCart(state){
            state.cart = []
        }
    }
})

export const {addItem , deleteItem ,incItemQuanty , decItemQuanty , clearCart} = cartSlice.actions

export default cartSlice.reducer

export const getTotalCartQuanty =(state) => state.cart.cart.reduce((sum, item) => sum + item.quantity , 0)
export const getTotalPrice = (state) => state.cart.cart.reduce((sum, item) => sum + item.totalPrice , 0)
export const getCartDetails = (state) => state.cart.cart
export const getCurrentQuanty = id => state => state.cart.cart.find((item) => item.pizzaId === id)?.quantity?? 0