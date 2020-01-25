import {combineReducers, createStore, applyMiddleware} from "redux";
import authReducer from "./auth/reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const logger = createLogger();
const STORE_LOCAL_STORAGE = "REDUX"

let loadState = () => {
    try {
        let storedState = localStorage.getItem(STORE_LOCAL_STORAGE)
        return storedState === null ? undefined : JSON.parse(storedState)
    } catch (e) {
        console.log(e)
    }
    return undefined
}

const store = createStore(combineReducers({
    auth: authReducer
}), loadState(), composeWithDevTools(applyMiddleware(thunk)))

store.subscribe(() => {
    try {
        // console.log(store.getState())
        localStorage.setItem(STORE_LOCAL_STORAGE, JSON.stringify(store.getState()))
    } catch (e) {
        console.error(e)
    }
})

export default store;