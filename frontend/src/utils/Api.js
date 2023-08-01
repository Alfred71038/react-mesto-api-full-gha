class Api {
    constructor(setting) {
        this._url = setting.url
        this._headers = setting.headers
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
        }).then(this._checkResponse);
    }

    patchUserInfo(data) {
        return fetch(`${this._url}/users/me/`, {
          method: "PATCH",
          headers: this._headers,
    
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
        }).then(this._checkResponse);
    }

    //Новая карточка
    createCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
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
        }).then(this._checkResponse);
      }

    addLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: "DELETE",
          headers: this._headers,
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
            body: JSON.stringify({
                avatar: link,
            })
        }).then(this._checkResponse);
    }

    

}

const api = new Api ({
    url: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
        authorization: '0d29d6a1-12b3-4f3a-8832-50cb159ade75',
        "Content-Type": "application/json"
    }
  });

export default api;
