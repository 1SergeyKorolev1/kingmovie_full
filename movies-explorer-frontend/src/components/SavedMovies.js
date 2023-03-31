import React from "react";
import "./SavedMovies.css";
import MoviesCardList from "./movies/MoviesCardList.js";
import SearchForm from "./movies/SearchForm.js";
import More from "./movies/More.js";

function SavedMovies({
  cardsDataSave,
  onSaveMovieSearchr,
  searchSavedData,
  handleMoreClick,
  onCardDelete,
}) {
  function handleCheckboxClick() {
    const CheckboxSearch = document.getElementById("checkbox-search");
    console.log(CheckboxSearch.checked);
    if (CheckboxSearch.checked) {
      localStorage.setItem(
        "checkingSave",
        JSON.stringify(CheckboxSearch.checked)
      );
      window.location.reload();
    } else {
      localStorage.setItem(
        "checkingSave",
        JSON.stringify(CheckboxSearch.checked)
      );
      window.location.reload();
    }
  }

  const checking = JSON.parse(localStorage.getItem("checkingSave"));

  const check = true;

  return (
    <section className="saved-movies">
      <SearchForm
        searchSavedData={searchSavedData}
        onMovieSearchr={onSaveMovieSearchr}
        handleCheckboxClick={handleCheckboxClick}
        cardsDataSave={cardsDataSave}
        checkboxState={checking}
      />
      <MoviesCardList
        checkboxState={checking}
        checked={check}
        cardsDataSave={cardsDataSave}
        searchSavedData={searchSavedData}
        onCardDelete={onCardDelete}
      />
      <More
        handleMoreClick={handleMoreClick}
        cardsDataSave={cardsDataSave}
        searchSavedData={searchSavedData}
      />
    </section>
  );
}

export default SavedMovies;
