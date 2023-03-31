import React from "react";
import "./Header.css";
import HeaderWhite from "./header/HeaderWhite.js";
import HeaderBlue from "./header/HeaderBlue.js";
import { Route, Switch } from "react-router-dom";

function Header({ loggedIn }) {
  return (
    <Switch>
      <Route path="/movies">
        <HeaderWhite />
      </Route>
      <Route path="/saved-movies">
        <HeaderWhite />
      </Route>
      <Route path="/profile">
        <HeaderWhite />
      </Route>
      <Route path="/">{loggedIn ? <HeaderWhite /> : <HeaderBlue />}</Route>
    </Switch>
  );
}

export default Header;
