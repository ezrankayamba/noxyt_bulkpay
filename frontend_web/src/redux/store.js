import {combineReducers, createStore, applyMiddleware} from "redux";
import usersReducer from "./users/reducers";
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
    users: usersReducer
}), loadState(), composeWithDevTools(applyMiddleware(thunk, logger)))

store.subscribe(() => {
    try {
        localStorage.setItem(STORE_LOCAL_STORAGE, JSON.stringify(store.getState()))
    } catch (e) {
        console.error(e)
    }
})

export default store;