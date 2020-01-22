import {
    USERS_LOGIN_FAIL,
    USERS_LOGIN_REQUEST,
    USERS_LOGIN_SUCCESS,
    USERS_LOGOUT, USERS_REGISTER_FAIL,
    USERS_REGISTER_REQUEST, USERS_REGISTER_SUCCESS
} from "./actions";

let initialState = {
    user: null,
    loggedIn: false,
    errorMsg: ''
}

let usersReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case USERS_LOGIN_REQUEST:
            return {
                ...state,
                loggedIn: false,
                user: null
            }
        case USERS_LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: {
                    username: action.payload.username,
                    token: action.payload.token,
                }
            }
        case USERS_LOGIN_FAIL:
            return {
                ...state,
                loggedIn: false,
                user: null,
                errorMsg: action.payload.errorMsg
            }
        case USERS_REGISTER_REQUEST:
            return {
                ...state,
                loggedIn: false,
                user: null
            }
        case USERS_REGISTER_SUCCESS:
            return {
                ...state,
            }
        case USERS_REGISTER_FAIL:
            return {
                ...state,
                errorMsg: action.payload.errorMsg
            }
        case USERS_LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: null
            }
        default:
            return state
    }
    return state
}

export default usersReducer