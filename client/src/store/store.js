import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import productsSlice from './productsSlice'

export default configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice,
    }
})