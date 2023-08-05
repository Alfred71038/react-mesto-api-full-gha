class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    //Список карточек
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }).then((res) => this._checkResponse(res));
      }


    //Инфа с профиля
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }).then((res) => this._checkResponse(res));
      }

    patchUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
          body: JSON.stringify({
            name: data.name,
            about: data.about,
          }),
        }).then((res) => this._checkResponse(res));
      }
    

    //Новая карточка
    createCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
          body: JSON.stringify({
            name: data.name,
            link: data.link,
          }),
        }).then((res) => this._checkResponse(res));
      }

    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }).then((res) => this._checkResponse(res));
      }

    addLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(this._checkResponse);
    }

    deleteLike(id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(this._checkResponse);
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
          method: `${isLiked ? `PUT` : `DELETE`}`,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }).then((res) => this._checkResponse(res));
      }

    patchUserAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
          body: JSON.stringify({
            avatar: data.avatar,
          }),
        }).then((res) => this._checkResponse(res));
      }
    }

const api = new Api({
    baseUrl: 'https://backalfred71038.nomoreparties.co',
    headers: {
      authorization: '0d29d6a1-12b3-4f3a-8832-50cb159ade75',
      "Content-Type": "application/json"
  }
});

export { api} ;

