import {apiDelete, apiGet, apiPost, apiUpdate} from "./WebService";

let url = "http://localhost:8000/clients/"

export const fetchClients = (token, cb) => {
    apiGet(url, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}
export const getClient = (token, id, cb) => {
    apiGet(url + id, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}
export const createClient = (token, body, cb) => {
    apiPost(url, body, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}
export const updateClient = (token, body, id, cb) => {
    apiUpdate(url, body, id, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}
export const deleteClient = (token, id, cb) => {
    apiDelete(url + id, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}
export const deleteSelectedClients = (token, ids, cb) => {
    apiPost(url + "deletes", ids, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}