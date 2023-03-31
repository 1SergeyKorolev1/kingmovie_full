import React from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./SearchForm.css";

function SearchForm({
  onMovieSearchr,
  handleCheckboxClick,
  searchData,
  searchSavedData,
  cardsData,
  checkboxState,
  cardsDataSave,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();
  const [movieName, setMovieName] = React.useState("");

  function replaceSaveSerchText() {
    if (searchSavedData === null) {
      return "";
    } else {
      return searchSavedData;
    }
  }

  const searchSavedDataText = replaceSaveSerchText();

  function storedArrayValidation() {
    if (cardsDataSave !== undefined) {
      const cardsDataSaveSearch = cardsDataSave.filter(function (card) {
        let serchText = searchSavedDataText.toLowerCase();
        let cardText = card.nameRU.toLowerCase();
        return (
          card.owner === currentUser._id &&
          (cardText.includes(serchText.slice(0, 2)) ||
            cardText.includes(serchText) ||
            cardText.includes(serchText.slice(1, 3)))
        );
      });
      if (checkboxState) {
        const cardsSaveDataSearchCheck = cardsDataSaveSearch.filter(function (
          card
        ) {
          return card.duration < 40;
        });
        if (cardsSaveDataSearchCheck.length === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        // console.log(cardsDataSaveSearch.length);
        if (cardsDataSaveSearch.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  function replaceSerchText() {
    if (searchData === null) {
      return "";
    } else {
      return searchData;
    }
  }

  const serchDataText = replaceSerchText();

  function arrayValidation() {
    if (cardsData !== null && cardsData !== undefined) {
      const cardsDataSearch = cardsData.filter(function (card) {
        let serchText = serchDataText.toLowerCase();
        let cardText = card.nameRU.toLowerCase();
        return (
          cardText.includes(serchText.slice(0, 2)) ||
          cardText.includes(serchText) ||
          cardText.includes(serchText.slice(1, 3))
        );
      });
      if (checkboxState) {
        const cardsDataSearchCheck = cardsDataSearch.filter(function (card) {
          return card.duration < 40;
        });
        if (cardsDataSearchCheck.length === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        if (cardsDataSearch.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  const cardsDataArrayLength = arrayValidation();
  const cardsSaveDataArrayLength = storedArrayValidation();

  function errorRename() {
    if (location.pathname === "/movies") {
      return serchDataText === "" || serchDataText === " "
        ? ""
        : "Ничего не найдено";
    } else if (location.pathname === "/saved-movies") {
      // console.log(searchSavedDataText);
      return searchSavedDataText === "" || searchSavedDataText === " "
        ? ""
        : "Ничего не найдено";
    }
  }

  const errorName = errorRename();

  function handleCheckboxClicking(evt) {
    handleCheckboxClick(evt);
  }

  function onChangeMovieName(evt) {
    setMovieName(evt.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onMovieSearchr({
      name: movieName,
    });
  };

  function onSearchText() {
    if (location.pathname === "/movies") {
      return searchData;
    } else if (location.pathname === "/saved-movies") {
      return searchSavedData;
    }
  }

  const searchText = onSearchText();

  function checkpointCheck() {
    if (location.pathname === "/movies") {
      if (JSON.parse(localStorage.getItem("checking")) === true) {
        return true;
      } else {
        return false;
      }
    }
    if (location.pathname === "/saved-movies") {
      if (JSON.parse(localStorage.getItem("checkingSave")) === true) {
        return true;
      } else {
        return false;
      }
    }
  }

  const checkpoint = checkpointCheck();

  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="search__wrapper">
        <input
          className="search__text"
          id="movie-text"
          required
          name="movie-name"
          type="text"
          placeholder={searchText}
          value={movieName}
          onChange={onChangeMovieName}
        />
        <button type="submit" className="search__link">
          Найти
        </button>
      </div>
      <div className="checkbox-container">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            class="invisible-checkbox"
            onClick={handleCheckboxClicking}
            id="checkbox-search"
            checked={checkpoint && true}
          />
          <span class="visible-checkbox">
            <span className="visible-checkbox__radio"></span>
          </span>
          <span className="checkbox-wrapper__text">Короткометражки</span>
        </label>
        <p
          className={
            cardsDataArrayLength || cardsSaveDataArrayLength
              ? "checkbox-container__error"
              : "checkbox-container__error-none"
          }
        >
          {errorName}
        </p>
      </div>
    </form>
  );
}

export default SearchForm;
