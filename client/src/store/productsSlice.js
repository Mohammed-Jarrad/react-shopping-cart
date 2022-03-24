import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export let fetchData = createAsyncThunk('products/get', async () => {
    let res = await axios.get('/api/products')
    let data = await res.data
    return data;
})

let productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productsClone: [],
        size: '',
        sort: '',
        loading: null,
        error: null,
    },
    reducers: {
        handleFilterBySize: (state, { payload }) => {
            state.size = payload
            if (payload === 'ALL') {
                state.products = state.productsClone
            } else {
                let newProducts = state.productsClone.filter(p => p.sizes.includes(payload))
                newProducts.length ? state.products = newProducts : state.products = `NO ITEM TO SHOW WITH [${payload}]`
            }
        },
        handleFilterBySort: (state, { payload }) => {
            state.sort = payload;
            let newProducts = state.products.sort((current, next) => {
                if (payload === 'lowest') {
                    return current.price - next.price
                } else if (payload === 'highest') {
                    return next.price - current.price
                } else if (payload === 'ALL') {
                    return current.id < next.id ? -1 : 1
                } else {
                    return current.id > next.id ? -1 : 1
                }
            })
            state.products = newProducts
        },
        
    },
    extraReducers: {
        [fetchData.pending]: (state) => {
            state.loading = true;
        },
        [fetchData.fulfilled]: (state, action) => {
            state.products = action.payload
            state.productsClone = action.payload
            state.loading = false;
        },
        [fetchData.rejected]: (state) => {
            state.error = true;
            state.loading = false;
        }
    }
})

export let { handleFilterBySize, handleFilterBySort } = productsSlice.actions;
export default productsSlice.reducer;