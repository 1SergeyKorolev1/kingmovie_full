import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./More.css";

function More({
  handleMoreClick,
  cardsData,
  cardsDataSave,
  searchData,
  searchSavedData,
}) {
  const currentUser = React.useContext(CurrentUserContext);

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
    // console.log(cardsDataSearch.length);
    if (cardsDataSearch.length > 6 || cardsDataSearch.length > 6) {
      return (
        <p className="more-title" onClick={handleMoreClick}>
          Еще
        </p>
      );
    }
  }

  if (cardsDataSave !== undefined) {
    const cardsDataSearch = cardsDataSave.filter(function (card) {
      if (currentUser._id === card.owner) {
        let serchText = searchSavedDataText.toLowerCase();
        let cardText = card.nameRU.toLowerCase();
        return (
          cardText.includes(serchText.slice(0, 2)) ||
          cardText.includes(serchText) ||
          cardText.includes(serchText.slice(1, 3))
        );
      }
    });
    // console.log(cardsDataSearch.length);
    if (cardsDataSearch.length > 6 || cardsDataSearch.length > 6) {
      return (
        <p className="more-title" onClick={handleMoreClick}>
          Еще
        </p>
      );
    }
  }
}

export default More;
