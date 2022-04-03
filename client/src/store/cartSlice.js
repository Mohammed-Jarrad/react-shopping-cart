import { createSlice } from "@reduxjs/toolkit";

let cartSlice = createSlice({
    name: 'cart',
    initialState: {
        product: '',
        cart: JSON.parse(localStorage.getItem('cart')) || [],
    },
    reducers: {
        addToCart: (state, { payload: product }) => {
            let cartClone = [...state.cart]
            let productExist = false;
            cartClone.forEach(p => {
                if (p.id === product.id) {
                    productExist = true;
                    p.qty += 1;
                }
            })
            if (productExist === false) {
                cartClone.push({ ...product, qty: 1 })
            }
            state.cart = cartClone
            console.log(cartClone)
        },
        removeFromCart: (state, { payload: product }) => {
            let cartClone = [...state.cart]
            state.cart = cartClone.filter(p => p.id !== product.id)
        },
        minusQty: (state, { payload: product }) => {
            let cartClone = [...state.cart]
            cartClone[cartClone.indexOf(product)].qty -= 1
            state.cart = cartClone
        },
        plusQty: (state, { payload: product }) => {
        },
    }
})

export let { addToCart, removeFromCart, minusQty, plusQty } = cartSlice.actions
export default cartSlice.reducer