class Api {
    constructor(config) {
        this._url = config.url
        this._headers = config.headers
        this._credentials = config.credentials;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    //Инфа с профиля
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: this._credentials,
        }).then(this._checkResponse);
    }

    patchUserInfo(data) {
        return fetch(`${this._url}/users/me/`, {
          method: "PATCH",
          headers: this._headers,
          credentials: this._credentials,
          body: JSON.stringify({
            name: data.name,
            about: data.about,
          })
        }).then(this._checkResponse);
      }
    //Список карточек
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
            credentials: this._credentials,
        }).then(this._checkResponse);
    }

    //Новая карточка
    createCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
          credentials: this._credentials,
        }).then(this._checkResponse);
      }

    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
            credentials: this._credentials,
        }).then(this._checkResponse);
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: "DELETE",
          headers: this._headers,
          credentials: this._credentials,
        }).then(this._checkResponse);
      }
    
    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.addLike(cardId);
        } else {
            return this.deleteLike(cardId);
        }
    }

    patchUserAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
                avatar: link,
            })
        }).then(this._checkResponse);
    }

    

}

const api = new Api ({
    url: 'https://backalfred71038.nomoreparties.co',
    headers: {
        "Content-Type": "application/json",
    },
    credentials: 'include'
  });

export default api;
