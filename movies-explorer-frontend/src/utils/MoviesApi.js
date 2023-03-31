class MoviesApi {

    constructor(data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
    }

    initialCardsData(data) {
        return fetch(`${this._baseUrl}`, {
          headers: {
            "Content-Type": "application/json",
          }
        }).then(this._getResponseData);
    }

    _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      }

}

const moviesApi = new MoviesApi({baseUrl: "https://api.nomoreparties.co/beatfilm-movies"});
  
  export { moviesApi };