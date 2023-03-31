import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import Card from "./MoviesCard.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Preloader from "../Preloader.js";

function MoviesCardList({
  checked,
  cardsData,
  searchData,
  checkboxState,
  onCardSave,
  cardsDataSave,
  searchSavedData,
  onCardDelete,
  checkPreloader,
}) {
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);

  if (location.pathname === "/movies") {
    window.onload = function () {
      const checkboxSearch = document.getElementById("checkbox-search");
      if (JSON.parse(localStorage.getItem("checking")) === true) {
        checkboxSearch.checked = true;
      } else {
        checkboxSearch.checked = false;
      }
    };
  }

  if (location.pathname === "/saved-movies") {
    window.onload = function () {
      const checkboxSearch = document.getElementById("checkbox-search");
      if (JSON.parse(localStorage.getItem("checkingSave")) === true) {
        checkboxSearch.checked = true;
      } else {
        checkboxSearch.checked = false;
      }
    };
  }

  function replaceSaveSerchText() {
    if (searchSavedData === null) {
      return "";
    } else {
      return searchSavedData;
    }
  }

  const searchSavedDataText = replaceSaveSerchText();

  function replaceSerchText() {
    if (searchData === null) {
      return "";
    } else {
      return searchData;
    }
  }

  const serchDataText = replaceSerchText();

  function addAttributeKey() {
    // console.log(document.querySelectorAll(".element"));
    const listElements = document.querySelectorAll(".element");
    if (cardsData !== null && cardsData !== undefined) {
      cardsData.map((elementMovie) => {
        listElements.forEach((elementSaveMovie) => {
          if (
            elementSaveMovie.children[0].children[0].textContent ===
            elementMovie.nameRU
          ) {
            elementSaveMovie.setAttribute("key", `7764${elementMovie.id}`);
          }
        });
      });
    }

    if (cardsDataSave !== null && cardsDataSave !== undefined) {
      cardsDataSave.map((elementMovie) => {
        listElements.forEach((elementSaveMovie) => {
          if (
            elementSaveMovie.children[0].children[0].textContent ===
            elementMovie.nameRU
          ) {
            elementSaveMovie.setAttribute("key", `7764${elementMovie._id}`);
          }
        });
      });
    }
  }

  addAttributeKey();

  if (location.pathname === "/movies" && cardsData !== null) {
    if (checkPreloader) {
      return <Preloader />;
    } else {
      return (
        <ul className="elements">
          {cardsData.map((card) => {
            const arrayChekButtonClass = cardsDataSave.map((cardSave) => {
              const saveButtonClassCheck =
                card.nameRU === cardSave.nameRU &&
                cardSave.owner === currentUser._id;
              return saveButtonClassCheck;
            });
            const chekButtonClass = arrayChekButtonClass.includes(true);
            let serchText = serchDataText.toLowerCase();
            let cardText = card.nameRU.toLowerCase();
            if (cardText.includes(serchText)) {
              if (checkboxState) {
                if (card.duration <= 40) {
                  return (
                    <Card
                      card={card}
                      onCheck={checked}
                      onCardSave={onCardSave}
                      chekButtonClass={chekButtonClass}
                      onCardDelete={onCardDelete}
                    />
                  );
                }
              } else {
                return (
                  <Card
                    card={card}
                    onCheck={checked}
                    onCardSave={onCardSave}
                    chekButtonClass={chekButtonClass}
                    onCardDelete={onCardDelete}
                  />
                );
              }
            }
          })}
        </ul>
      );
    }
  } else if (location.pathname === "/saved-movies") {
    return (
      <ul className="elements">
        {cardsDataSave.map((card) => {
          if (card.owner === currentUser._id) {
            let serchText = searchSavedDataText.toLowerCase();
            let cardText = card.nameRU.toLowerCase();
            if (cardText.includes(serchText)) {
              if (checkboxState) {
                if (card.duration <= 40) {
                  return (
                    <Card
                      card={card}
                      onCheck={checked}
                      onCardDelete={onCardDelete}
                    />
                  );
                }
              } else {
                return (
                  <Card
                    card={card}
                    onCheck={checked}
                    onCardDelete={onCardDelete}
                  />
                );
              }
            }
          }
        })}
      </ul>
    );
  }
}

export default MoviesCardList;
