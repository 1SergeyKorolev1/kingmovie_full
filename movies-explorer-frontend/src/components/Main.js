import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Main.css";
import Promo from "./main/Promo.js";
import AboutProject from "./main/AboutProject.js";
import Techs from "./main/Techs.js";
import AboutMe from "./main/AboutMe.js";
import Portfoli from "./main/Portfolio.js";
import Movies from "./Movies.js";
import SavedMovies from "./SavedMovies.js";
import Profile from "./Profile.js";

function Main({
  handleDataChangeUser,
  onMovieSearch,
  cardsData,
  searchData,
  onCardSave,
  cardsDataSave,
  onSaveMovieSearchr,
  searchSavedData,
  onCardDelete,
  errorText,
  goBack,
  checkPreloader,
  notificationText,
}) {
  const [quantityCards, setQuantityCards] = React.useState(6);
  let cards = quantityCards;

  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  window.onload = function () {
    windowResize();
  };

  React.useEffect(() => {
    function changeOfSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", changeOfSize);

    changeOfSize();

    return () => window.removeEventListener("resize", changeOfSize);
  }, [windowSize.width]);

  // console.log(3);

  function windowResize() {
    if (windowSize.width < 1168 && windowSize.width > 659) {
      setQuantityCards(quantityCards + 2);
      cards += 2;
    } else if (windowSize.width > 1168) {
      setQuantityCards(quantityCards + 3);
      cards += 3;
    } else if (windowSize.width < 659) {
      setQuantityCards(quantityCards + 1);
      cards += 1;
    }
  }

  function handleMoreClick() {
    windowResize();
    // console.log(1);
    const arrayVisCards = Array.from(
      document.querySelector(".elements").children
    );
    const visCards = arrayVisCards.slice(0, cards);
    // console.log(2);

    visCards.forEach((el) => el.classList.add("visible"));

    if (
      visCards.length === arrayVisCards.length ||
      arrayVisCards.length === 0
    ) {
      document.querySelector(".more-title").style.display = "none";
    }
  }

  return (
    <main className="content">
      <Switch>
        <Route exact path="/">
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfoli />
        </Route>
        <Route path="/movies">
          <Movies
            onMovieSearch={onMovieSearch}
            cardsData={cardsData}
            searchData={searchData}
            onCardSave={onCardSave}
            handleMoreClick={handleMoreClick}
            cardsDataSave={cardsDataSave}
            onCardDelete={onCardDelete}
            checkPreloader={checkPreloader}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            cardsDataSave={cardsDataSave}
            onSaveMovieSearchr={onSaveMovieSearchr}
            searchSavedData={searchSavedData}
            handleMoreClick={handleMoreClick}
            onCardDelete={onCardDelete}
          />
        </Route>
        <Route path="/profile">
          <Profile
            onDataChangeUser={handleDataChangeUser}
            errorText={errorText}
            goBack={goBack}
            notificationText={notificationText}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
