class Api {
  constructor(data) {
    this._serverUrl = data.serverUrl;
    this._token = data.token;
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
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._checkResponse(res));
  }

  addCard(data) {
    return fetch(`${this._serverUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
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
      headers: {
        authorization: this._token,
      }
    })
    .then((res) => this._checkResponse(res));
  }

  getUserData() {
    return fetch(`${this._serverUrl}users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._checkResponse(res));
  }

  changeUserData(data) {
    return fetch(`${this._serverUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
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
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(data, isLiked) {
    if (!isLiked) {
      return fetch(`${this._serverUrl}cards/${data}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => this._checkResponse(res));
    } else {
      return fetch(`${this._serverUrl}cards/${data}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
      .then((res) => this._checkResponse(res));
    }
  }

  getInitialData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }
}

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-40/',
  token: 'c4f5357d-335f-4f00-b321-6e024ea9f5d9',
});

export default api;