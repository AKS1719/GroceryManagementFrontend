import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status:false,
    cartData:[]
}

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {
            addToCart : (state,action)=>{
                state.status = true
                state.cartData.push(action.payload.product)
            },
            getCart : (state,action)=>{
                state.status = true
                if(state.cartData.length == 0 )return null
                return state.cartData;
            },
            removeCartData: (state,action)=>{
                state.status = false
                state.cartData = []
            }
        }
    }
)

export const {addToCart, getCartData,removeCartData} = cartSlice.actions;
export default cartSlice.reducer;