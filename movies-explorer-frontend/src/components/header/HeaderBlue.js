import React from "react";
import "../Header.css";
import "./HeaderBlue.css";
import logoKingMovie from "../../images/logo_King_Movie.svg";
import { Link } from "react-router-dom";

function HeaderBlue() {
  return (
    <header className="header">
      <div className="header__container">
        <img
          src={logoKingMovie}
          className="header__logo"
          alt="лого-King-Movie"
          title="лого-King-Movie"
        />
        <div className="header__wrapper back-link">
          <nav className="header__wrapper-link">
            <Link to="/signup" className="header__link-register">
              Регистраия
            </Link>
            <Link to="/signin" className="header__link-come">
              Вход
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderBlue;
