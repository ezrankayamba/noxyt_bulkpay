import {BASE_URL, CLIENT_ID, CLIENT_SECRET, GET_TOKEN_URL} from "../conf";
import {apiGet} from "./WebService";

export const loginPost = (username, password, cb) => {
    let data = `username=${username}&password=${password}&grant_type=password&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    fetch(BASE_URL + "/oauth2/token/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(res => res.json())
        .then(res => {
            apiGet(BASE_URL + "/users/me/", res.access_token)
                .then(userRes => {
                    cb({...userRes, ...res})
                }).catch(reason => {
                cb(false)
            })
        }).catch(reason => {
        cb(false)
    })
}