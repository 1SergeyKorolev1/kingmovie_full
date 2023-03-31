import React from "react";
import "./Movies.css";
import SearchForm from "./movies/SearchForm.js";
import MoviesCardList from "./movies/MoviesCardList.js";
import More from "./movies/More.js";

function Movies({
  onMovieSearch,
  cardsData,
  searchData,
  onCardSave,
  handleMoreClick,
  cardsDataSave,
  onCardDelete,
  checkPreloader,
}) {
  function handleCheckboxClick() {
    const CheckboxSearch = document.getElementById("checkbox-search");
    console.log(CheckboxSearch.checked);
    if (CheckboxSearch.checked) {
      localStorage.setItem("checking", JSON.stringify(CheckboxSearch.checked));
      window.location.reload();
    } else {
      localStorage.setItem("checking", JSON.stringify(CheckboxSearch.checked));
      window.location.reload();
    }
  }

  const checking = JSON.parse(localStorage.getItem("checking"));

  return (
    <>
      <section className="movies">
        <SearchForm
          searchData={searchData}
          onMovieSearchr={onMovieSearch}
          handleCheckboxClick={handleCheckboxClick}
          cardsData={cardsData}
          checkboxState={checking}
        />
        <MoviesCardList
          checkboxState={checking}
          cardsData={cardsData}
          searchData={searchData}
          onCardSave={onCardSave}
          cardsDataSave={cardsDataSave}
          onCardDelete={onCardDelete}
          checkPreloader={checkPreloader}
        />
        <More
          handleMoreClick={handleMoreClick}
          cardsData={cardsData}
          searchData={searchData}
        />
      </section>
    </>
  );
}

export default Movies;
