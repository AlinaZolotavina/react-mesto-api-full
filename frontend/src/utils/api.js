class Api {
  constructor(data) {
    this._serverUrl = data.serverUrl;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._serverUrl}cards`, {
      credentials: 'include',
    })
    .then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._serverUrl}cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => this._checkResponse(res));
  }

  deleteCard(data) {
    return fetch(`${this._serverUrl}cards/${data}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then((res) => this._checkResponse(res));
  }

  getUserData() {
    return fetch(`${this._serverUrl}users/me`, {
      credentials: 'include',
    })
    .then((res) => this._checkResponse(res));
  }

  changeUserData(data) {
    return fetch(`${this._serverUrl}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => this._checkResponse(res));
  }

  changeAvatar(data) {
    return fetch(`${this._serverUrl}users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(data, isLiked) {
    return fetch(`${this._serverUrl}cards/${data}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },     
    })
    .then((res) => this._checkResponse(res));
  }

  getInitialData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }
}

const api = new Api({
  serverUrl: 'https://api.mesto.students.nomoredomains.sbs/',
});

export default api;