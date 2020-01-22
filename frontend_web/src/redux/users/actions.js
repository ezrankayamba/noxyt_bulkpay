export const USERS_LOGIN_REQUEST = 'USERS_LOGIN_REQUEST'
export const USERS_LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS'
export const USERS_LOGIN_FAIL = 'USERS_LOGIN_FAIL'
export const USERS_REGISTER_REQUEST = 'USERS_REGISTER_REQUEST'
export const USERS_REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS'
export const USERS_REGISTER_FAIL = 'USERS_REGISTER_FAIL'
export const USERS_LOGOUT = 'USERS_LOGOUT'

const GET_TOKEN_URL = 'http://localhost:8000/oauth2/token/'
const REGISTER_USER_URL = 'http://localhost:8000/users/register-me/'
export let register = (username, password, history) => {
    let success = () => {
        return {
            type: USERS_REGISTER_SUCCESS,
        }
    }
    let fail = (error) => {
        return {
            type: USERS_REGISTER_FAIL,
        }
    }
    let request = () => {
        return {
            type: USERS_REGISTER_REQUEST
        }
    }
    return (dispatch, getState) => {
        let data = `username=${username}&password=${password}`;
        dispatch(request())
        fetch(REGISTER_USER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.error) {
                    dispatch(fail("Register failed!"))
                } else {
                    dispatch(success())
                    history.push('/login');
                }
            })
            .catch(error => {
                console.error(error)
                dispatch(fail("Login failed: " + error.message))
            })
    }
}
export let login = (username, password, history) => {
    console.log(username, password)
    let loginSuccess = (username, token) => {
        return {
            type: USERS_LOGIN_SUCCESS,
            payload: {
                username: username,
                token: token
            }
        }
    }
    let loginFail = (error) => {
        return {
            type: USERS_LOGIN_FAIL,
            payload: {
                errorMsg: error
            }
        }
    }
    let loginRequest = () => {
        return {
            type: USERS_LOGIN_REQUEST
        }
    }
    return (dispatch, getState) => {
        let clientId = 'v0WJqw2wvL7qx422lcSgyAyeUTj2zRbIHuuq0l2d';
        let clientSecret = 'JoBlLNarJiW95025YOrURl7SGduapkTVDJi2gfNAEKIL5ezFuDLIWijVedwtNXshAjAmLro18w9ye9qm1gp5jmF7JIHL76zZYm6qihhUIbHuQmMpPJdZfYDyKdgiqfzB';
        let data = `username=${username}&password=${password}&grant_type=password&client_id=${clientId}&client_secret=${clientSecret}`;
        dispatch(loginRequest())
        fetch(GET_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.error) {
                    dispatch(loginFail("Login failed: " + res.error_description))
                } else {
                    dispatch(loginSuccess(username, res.access_token))
                    localStorage.setItem('accessToken', res.access_token);
                    history.push('/');
                    location.reload();
                }
            })
            .catch(error => {
                console.error(error)
                dispatch(loginFail("Login failed: " + error.message))
            })
    }
}

export const logout = () => {
    localStorage.removeItem('accessToken');
    return {
        type: USERS_LOGOUT
    }
}