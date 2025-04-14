import { createSlice } from "@reduxjs/toolkit";
import { nav } from "framer-motion/client";
let intiData = {
    rankCretriaActiveState: {
        altName:"spear lebel 1",
        iconPath:"data:image/svg+xml,%3csvg%20width='19'%20height='40'%20viewBox='0%200%2019%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0%2036.6862H19V39.3711H0V36.6862Z'%20fill='%230B1B29'/%3e%3cpath%20d='M8.1039%208.49493H11.2987V39.1025H8.1039V8.49493Z'%20fill='%230B1B29'/%3e%3cpath%20d='M4.50002%208.96265H15.1494L9.8247%200.371094L4.50002%208.96265Z'%20fill='%230B1B29'/%3e%3c/svg%3e",
        name1:"SPEAR",
        name2:"LEVEL 1",
    },
    rankCriteriaData:[
        {
            name:"BENCH",
            last:"PRESS",
            val1:"1 x BW",
            val2:"0.5 x BW",
        },
        {
            name:"SQUAT",
            last:"",
            val1:"1.25 x BW",
            val2:"0.75 x BW",
        },
        {
            name:"DEAD",
            last:"LIFT",
            val1:"1.5 x BW",
            val2:"1 x BW",
        }
    ],
    commingSoonActive:false,
    isCartOpen: false,
    cartItems: []
}
const activeSlices = createSlice({
    name: "activeSlices",
    initialState:intiData,
    reducers: {
        rankInfoActiveState: (state, action) => {
            state.rankCretriaActiveState = action.payload;
        },
        rankCriteriaData: (state, action) => {
            state.rankCriteriaData = action.payload;
        },
        commingSoonActive: (state, action) => {
            state.commingSoonActive = action.payload;
        },
        toggleCart: (state, action) => {
            state.isCartOpen = action.payload !== undefined ? action.payload : !state.isCartOpen;
        },
        addToCart: (state, action) => {
            const { id, name, price, size, image } = action.payload;
            const existingItem = state.cartItems.find(item => item.name === name && item.size === size);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({
                    id,
                    name,
                    price,
                    size,
                    quantity: 1,
                    image
                });
            }
        },
        updateCartItem: (state, action) => {
            const { id, quantity } = action.payload;
            const itemToUpdate = state.cartItems.find(item => item.id === id);
            if (itemToUpdate) {
                itemToUpdate.quantity = Math.max(1, quantity);
            }
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
})

export const { 
    rankInfoActiveState, 
    rankCriteriaData, 
    commingSoonActive, 
    toggleCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart 
} = activeSlices.actions;
export default activeSlices.reducer;