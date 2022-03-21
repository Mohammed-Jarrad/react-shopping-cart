import { FETCH_PRODUCTS } from "../actions/types";

export let productReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS:
            return {products: action.data}
        default:
            return state
    }
}