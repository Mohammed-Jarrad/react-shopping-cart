import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer/reducer'
import reduxThunk from 'redux-thunk'

let initState =  {}
let enhancer = window.__REDUX_DEV_TOOLS_EXTEVSION_COMPOSE__ || compose

let store = createStore(reducer, initState, enhancer(applyMiddleware(reduxThunk)))

export default store;