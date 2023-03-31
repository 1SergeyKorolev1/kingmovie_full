import React from "react";
import "./NotFound.css";
import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button onClick={goBack} className="not-found__link">
        Назад
      </button>
    </div>
  );
}

export default NotFound;
