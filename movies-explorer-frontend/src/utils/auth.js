class Auth {
    constructor(data) {
      this._baseUrl = data.baseUrl;
    }
  
    onRegister(name, email, password) {
      return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
      }).then(this._getResponseData);
    }
  
    onAuthorize(password, email) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(this._getResponseData);
    }
  
    checkToken(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(this._getResponseData);
    }
  
    _getResponseData(res) {
      if (!res.ok) {
        return res.json();
      }
      return res.json();
    }
  }
  
  const auth = new Auth({
    baseUrl: "https://api.kingmovie.nomoredomains.club",
  });
  
  export { auth };
  