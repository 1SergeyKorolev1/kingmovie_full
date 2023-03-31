import { moviesApi } from "../utils/MoviesApi.js";
import { auth } from "../utils/auth.js";
import { mainApi } from "../utils/MainApi.js";
import ProtectedRoute from "./ProtectedRoute.js";

import React from "react";
import "./App.css";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Register from "./Register.js";
import Login from "./Login.js";
import Footer from "./Footer.js";
import NotFound from "./NotFound.js";

function App() {
  const currentCards = JSON.parse(localStorage.getItem("dataMovies"));
  const currentSearch = JSON.parse(localStorage.getItem("search"));
  const savedMoviesSearch = JSON.parse(localStorage.getItem("searchSave"));

  const [currentUser, setCurrentUser] = React.useState([]);
  const [currentSaveCards, setCurrentSaveCards] = React.useState([]);
  const [updateTheData, setUpdateTheData] = React.useState(false);
  const [cardId, setCardId] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [checkPreloader, setCheckPreloader] = React.useState(false);
  const [notificationText, setNotificationText] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authCheck(jwt);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    mainApi
      .initialDataProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }, []);

  React.useEffect(() => {
    mainApi
      .initialMovieData()
      .then((data) => {
        setCurrentSaveCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }, [updateTheData]);

  const authCheck = (jwt) => {
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser({
            email: res.email,
            name: res.name,
            _id: res._id,
          });
        } else {
          setLoggedIn(false);
          console.log("Ошибка авторизации");
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  };

  function handleAddUser(data) {
    console.log(data);
    auth
      .onRegister(data.name, data.email, data.password)
      .then((res) => {
        console.log(res);
        if (!res) {
          setErrorText("Что то пошло не так:(");
        } else if (res.message) {
          setErrorText(res.message);
        } else {
          res.password = data.password;
          handleAuthorizedUser(res);
          setCurrentUser({
            email: res.email,
            name: res.name,
            _id: res._id,
          });
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }

  function handleAuthorizedUser(data) {
    // console.log(data);
    auth
      .onAuthorize(data.password, data.email)
      .then((data) => {
        // console.log(data);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          authCheck(data.token);
          setLoggedIn(true);
          history.push("/movies");
          // console.log(data);
        } else if (data.message) {
          setErrorText(data.message);
        } else {
          setErrorText("У вас нет токена!");
        }
      })
      .catch((err) => {
        setErrorText(`Ошибка ${err} повторите запросс позже`);
      });
  }

  function handleDataChangeUser(dataProfile) {
    mainApi
      .newNameAndEmail(dataProfile.name, dataProfile.email)
      .then((data) => {
        if (data.validation !== undefined) {
          setErrorText(data.validation.body.message);
        }
        setNotificationText("Данные успешно изменены!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieSearchr(dataMovies) {
    setCheckPreloader(true);
    moviesApi
      .initialCardsData()
      .then((data) => {
        localStorage.setItem("search", JSON.stringify(dataMovies.name));
        localStorage.setItem("dataMovies", JSON.stringify(data));
        setCheckPreloader(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }

  function handleSaveMovieSearchr(dataMovies) {
    console.log(dataMovies.name);
    localStorage.setItem("searchSave", JSON.stringify(dataMovies.name));
    window.location.reload();
  }

  function handleCardSave(card, evt) {
    if (evt.target.className === "element__save") {
      mainApi
        .sendMovieData(card)
        .then((data) => {
          // console.log(data);
          setCurrentSaveCards([...currentSaveCards, data]);
          evt.target.classList.remove("element__save");
          evt.target.classList.add("element__saved");
          evt.target.innerText = "";
          setCardId(data._id);
        })
        .catch((err) => {
          console.log(`Ошибка ${err} повторите запросс позже`);
        });
    } else {
      // console.log(card);
      mainApi
        .deleteMovie(cardId)
        .then((data) => {
          evt.target.classList.remove("element__saved");
          evt.target.classList.add("element__save");
          evt.target.innerText = "Сохранить";
        })
        .catch((err) => {
          console.log(`Ошибка ${err} повторите запросс позже`);
        });
    }
  }

  function handleCardDelete(card, evt) {
    if (card._id === undefined) {
      // console.log(card);
      currentSaveCards.map((cardSave) => {
        if (
          cardSave.nameRU === card.nameRU &&
          cardSave.owner === currentUser._id
        ) {
          if (evt.target.className === "element__save") {
            mainApi
              .sendMovieData(card)
              .then((data) => {
                evt.target.classList.remove("element__save");
                evt.target.classList.add("element__saved");
                evt.target.innerText = "";
                mainApi
                  .initialMovieData()
                  .then((dataMovie) => {
                    setCurrentSaveCards(dataMovie);
                  })
                  .catch((err) => {
                    console.log(`Ошибка ${err} повторите запросс позже`);
                  });
              })
              .catch((err) => {
                console.log(`Ошибка ${err} повторите запросс позже`);
              });
          } else {
            mainApi
              .deleteMovie(cardSave._id)
              .then((data) => {
                evt.target.classList.remove("element__saved");
                evt.target.classList.add("element__save");
                evt.target.innerText = "Сохранить";
              })
              .catch((err) => {
                console.log(`Ошибка ${err} повторите запросс позже`);
              });
          }
        }
      });
    } else {
      mainApi
        .deleteMovie(card._id)
        .then((data) => {
          const index = currentSaveCards.findIndex((n) => n._id === data._id);
          if (index !== -1) {
            currentSaveCards.splice(index);
            setUpdateTheData(!updateTheData);
          }
        })
        .catch((err) => {
          console.log(`Ошибка ${err} повторите запросс позже`);
        });
    }
  }

  const goBack = () => {
    // console.log("я тут");
    history.push("/");
    setLoggedIn(false);
    setCurrentUser([]);
    localStorage.removeItem("jwt");
    localStorage.removeItem("search");
    localStorage.removeItem("dataMovies");
    localStorage.removeItem("searchSave");
    localStorage.removeItem("checkingSave");
    localStorage.removeItem("checking");
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route path="/signup">
            <Register onAddUser={handleAddUser} errorText={errorText} />
          </Route>
          <Route path="/signin">
            <Login
              onAuthorizedUser={handleAuthorizedUser}
              errorText={errorText}
            />
          </Route>
          <Route path="/movies">
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Header}
            />
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Main}
              checkPreloader={checkPreloader}
              onMovieSearch={handleMovieSearchr}
              cardsData={currentCards}
              searchData={currentSearch}
              onCardSave={handleCardSave}
              cardsDataSave={currentSaveCards}
              onCardDelete={handleCardDelete}
            />
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Footer}
            />
          </Route>
          <Route path="/saved-movies">
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={Header}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={Main}
              searchSavedData={savedMoviesSearch}
              cardsDataSave={currentSaveCards}
              onSaveMovieSearchr={handleSaveMovieSearchr}
              onCardDelete={handleCardDelete}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={Footer}
            />
          </Route>
          <Route path="/profile">
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Header}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Main}
              handleDataChangeUser={handleDataChangeUser}
              errorText={errorText}
              goBack={goBack}
              notificationText={notificationText}
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
