export const apiGet = (url, token) => {
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        if (res.status == 200) {
            return res.json()
        }
        throw Error("Failure response: " + res.status)
    })
}
export const apiPost = (url, body, token) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if (res.status == 201) {
            return res.json()
        }
        throw Error("Failure response: " + res.status)
    })
}
export const apiUpdate = (url, body, id, token) => {
    return fetch(url + id, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if (res.status == 200) {
            return res.json()
        }
        throw Error("Failure response: " + res.status)
    })
}
export const apiDelete = (url, token) => {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        if (res.status == 204) {
            return res
        }
        throw Error("Failure response: " + res.status)
    })
}
