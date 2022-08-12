export const BASE_URL = 'https://api.mesto.students.nomoredomains.sbs';

function checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((res) => checkResponse(res));
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((res) => checkResponse(res));
}

export const logout = (email) => {
    return fetch(`${BASE_URL}/logout`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': email
        }),
    }).then((res) => checkResponse(res));
}

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((res) => checkResponse(res));
}