import {apiDelete, apiGet, apiPost, apiUpdate} from "./WebService";

let url = "http://localhost:8000/payments/"

export const fetchBatches = (token, cb) => {
    apiGet(url + "batches", token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}
export const getBatch = (token, id, cb) => {
    apiGet(url + "batches/" + id, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}
export const createBatch = (token, body, cb) => {
    apiPost(url + "batches/", body, token)
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
export const deleteBatch = (token, id, cb) => {
    apiDelete(url + "batches/" + id, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}

export const deleteSelectedBatches = (token, ids, cb) => {
    apiPost(url + "batches/deletes", ids, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}