import React from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import LoginImage from "../images/logo_King_Movie.svg";
import Error from "./error/Error.js";

function Login({ onAuthorizedUser, errorText }) {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  function onChangePassword(evt) {
    setPassword(evt.target.value);
    validateForm();
    validateInput(evt.target);
  }

  function onChangeEmail(evt) {
    setEmail(evt.target.value);
    validateForm();
    validateInput(evt.target);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAuthorizedUser({
      email: email,
      password: password,
    });

    setPassword("");
    setEmail("");
  };

  function validateForm() {
    const form = document.querySelector(".login__form");
    const submitButton = form.querySelector(".login__button");

    if (form.checkValidity()) {
      submitButton.removeAttribute("disabled");
      submitButton.classList.add("login__button_valid");
      submitButton.classList.remove("login__button_invalid");
    } else {
      submitButton.setAttribute("disabled", true);
      submitButton.classList.remove("login__button_valid");
      submitButton.classList.add("login__button_invalid");
    }
  }

  function validateInput(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
  }

  React.useEffect(() => {
    validateForm();
  });

  const goHome = () => {
    history.push("/");
  };

  return (
    <section className="login">
      <div className="login__wrapper">
        <img
          src={LoginImage}
          className="login__image"
          alt="логотип"
          onClick={goHome}
        />
        <p className="login__welcome">Рады видеть!</p>
        <form onSubmit={handleSubmit} className="login__form" noValidate>
          <label htmlFor="email" className="login__label">
            E-mail
          </label>
          <input
            className="login__input"
            id="email-authorized"
            required
            name="login-email"
            type="email"
            value={email}
            onChange={onChangeEmail}
          />
          <span className="login__error" id="email-authorized-error"></span>
          <label htmlFor="password" className="login__label">
            Пароль
          </label>
          <input
            className="login__input"
            id="password-authorized"
            minLength="2"
            maxLength="40"
            required
            name="login-password"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
          <span className="login__error" id="password-authorized-error"></span>
          <Error errorText={errorText} />
          <button type="submit" className="login__button">
            Войти
          </button>
          <div className="login__link-wrapper">
            <p className="login__link-title">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="login__link-register">
              Регистрация
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
