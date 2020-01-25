import {CLIENT_ID, CLIENT_SECRET, GET_TOKEN_URL, REGISTER_USER_URL} from "../../conf";

export const USERS_LOGIN_REQUEST = 'USERS_LOGIN_REQUEST'
export const USERS_LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS'
export const USERS_LOGIN_FAIL = 'USERS_LOGIN_FAIL'
export const USERS_LOGOUT = 'USERS_LOGOUT'

export let login = (params, cb) => {
    let username = params.username
    let success = ({username, token}) => {
        return {
            type: USERS_LOGIN_SUCCESS,
            payload: {
                username: username,
                token: token
            }
        }
    }
    let fail = (error) => {
        return {
            type: USERS_LOGIN_FAIL
        }
    }
    let request = () => {
        return {
            type: USERS_LOGIN_REQUEST
        }
    }
    return (dispatch, getState) => {
        let clientId = CLIENT_ID
        let clientSecret = CLIENT_SECRET
        let password = params.password
        let data = `username=${username}&password=${password}&grant_type=password&client_id=${clientId}&client_secret=${clientSecret}`;
        dispatch(request())
        fetch(GET_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    dispatch(fail("Login failed: " + res.error_description))
                } else {
                    try {
                        dispatch(success({username: username, token: res.access_token}))
                    } catch (e) {
                        console.error(e)
                    }
                }
            })
            .catch(error => {
                console.error(error)
                dispatch(fail("Login failed: " + error.message))
            })
    }
}

export const logout = (params) => {
    let component = params ? params.component : null
    let cb = params ? params.cb : null
    localStorage.removeItem('accessToken');
    if (cb) {
        cb()
    }
    return {
        type: USERS_LOGOUT
    }
}