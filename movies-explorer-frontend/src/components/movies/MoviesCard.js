import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({
  onCheck,
  card,
  onCardSave,
  chekButtonClass,
  onCardDelete,
}) {
  const location = useLocation();

  function handleSaveClick(evt) {
    onCardSave(card, evt);
  }

  function handleDeleteClick(evt) {
    onCardDelete(card, evt);
  }

  function handleImageClick() {
    window.open(card.trailerLink, "_blank");
  }

  const buttonContent = `${
    chekButtonClass || onCheck === true ? "" : "сохранить"
  }`;

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    if (hours === 0) {
      return minutes + "мин";
    } else {
      return hours + "ч " + minutes + "мин";
    }
  }

  if (location.pathname === "/movies") {
    if (chekButtonClass) {
      return (
        <li className="element">
          <div className="element__group">
            <h2 className="element__title">{card.nameRU}</h2>
            <p className="element__time">{getTimeFromMins(card.duration)}</p>
          </div>
          <img
            className="element__img"
            src={`https://api.nomoreparties.co${card.image.formats.thumbnail.url}`}
            alt={`превью картинка для фильма ${card.nameRU}`}
            onClick={handleImageClick}
          />
          <button
            type="button"
            className="element__saved"
            onClick={handleDeleteClick}
          >
            {buttonContent}
          </button>
        </li>
      );
    } else {
      return (
        <li className="element">
          <div className="element__group">
            <h2 className="element__title">{card.nameRU}</h2>
            <p className="element__time">{getTimeFromMins(card.duration)}</p>
          </div>
          <img
            className="element__img"
            src={`https://api.nomoreparties.co${card.image.formats.thumbnail.url}`}
            alt={`превью картинка для фильма ${card.nameRU}`}
            onClick={handleImageClick}
          />
          <button
            type="button"
            className="element__save"
            onClick={handleSaveClick}
          >
            {buttonContent}
          </button>
        </li>
      );
    }
  } else if (location.pathname === "/saved-movies") {
    return (
      <li className="element">
        <div className="element__group">
          <h2 className="element__title">{card.nameRU}</h2>
          <p className="element__time">{getTimeFromMins(card.duration)}</p>
        </div>
        <img
          className="element__img"
          src={card.thumbnail}
          alt={`превью картинка для фильма ${card.nameRU}`}
          onClick={handleImageClick}
        />
        <button
          type="button"
          className="element__delete"
          onClick={handleDeleteClick}
        >
          {buttonContent}
        </button>
      </li>
    );
  }
}

export default MoviesCard;
