class Api {
  constructor(options) {
    this._address = options.address;
    this._token = options.token;
    this._cohortId = options.cohortId;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  _makeRequest ({ endpoint, method, body }) {
    const fetchInit = {
      method: method,  
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    };
    return fetch (
      `${this._address}/${this._cohortId}/${endpoint}`,
      body 
        ? { ...fetchInit, body: JSON.stringify(body) } 
        : fetchInit
    )
    .then (
      this._checkResponse
    )
  }

  getUserInfo () {
    return this._makeRequest({
      endpoint: 'users/me', 
      method: 'GET'
    });
  }
  
  getInitialCards () {
    return this._makeRequest({
      endpoint: 'cards', 
      method: 'GET'
    });
  }

  updateUserInfo (userInfo) {
    return this._makeRequest({
      endpoint: 'users/me', 
      method: 'PATCH',
      body: userInfo
    });
  }

  updateAvatar (avatar) {
    return this._makeRequest({
      endpoint: 'users/me/avatar', 
      method: 'PATCH',
      body: avatar
    });
  }

  addNewCard (cardData) {
    return this._makeRequest({
      endpoint: 'cards',
      method: 'POST',
      body: cardData
    });
  }

  changeLikeCardStatus (cardID, isLiked) {
    return this._makeRequest({
      endpoint: `cards/likes/${cardID}`, 
      method: `${isLiked ? 'DELETE' : 'PUT'}`
    });
  }

  deleteCard (cardID) {
    return this._makeRequest({
      endpoint: `cards/${cardID}`, 
      method: 'DELETE'
    });
  }
}

const api = new Api ({
  address: 'https://mesto.nomoreparties.co/v1',
  token: 'c846985c-30b9-4d91-bdf7-4d0b3c99bbf7',
  cohortId: 'cohort-24',
})

export default api;
