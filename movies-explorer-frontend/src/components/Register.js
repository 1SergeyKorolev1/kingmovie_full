import React from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import LoginImage from "../images/logo_King_Movie.svg";
import Error from "./error/Error.js";

function Register({ onAddUser, errorText }) {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const history = useHistory();

  function onChangeName(evt) {
    setName(evt.target.value);
    validateInput(evt.target);
    validateForm();
  }

  function onChangePassword(evt) {
    setPassword(evt.target.value);
    validateInput(evt.target);
    validateForm();
  }

  function onChangeEmail(evt) {
    setEmail(evt.target.value);
    validateInput(evt.target);
    validateForm();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddUser({
      name: name,
      email: email,
      password: password,
    });

    setName("");
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
        <p className="login__welcome">Добро пожаловать!</p>
        <form onSubmit={handleSubmit} className="login__form" noValidate>
          <label htmlFor="text" className="login__label">
            Имя
          </label>
          <input
            className="login__input"
            id="name-register"
            required
            name="login-email"
            type="text"
            minLength="2"
            maxLength="22"
            value={name}
            onChange={onChangeName}
          />
          <span className="login__error" id="name-register-error"></span>
          <label htmlFor="email" className="login__label">
            E-mail
          </label>
          <input
            className="login__input"
            id="email-register"
            required
            name="login-email"
            type="email"
            value={email}
            onChange={onChangeEmail}
          />
          <span className="login__error" id="email-register-error"></span>
          <label htmlFor="password" className="login__label">
            Пароль
          </label>
          <input
            className="login__input"
            id="password-register"
            required
            name="login-password"
            type="password"
            minLength="4"
            maxLength="24"
            value={password}
            onChange={onChangePassword}
          />
          <span className="login__error" id="password-register-error"></span>
          <Error errorText={errorText} />
          <button type="submit" className="login__button">
            Зарегистрироваться
          </button>
          <div className="login__link-wrapper">
            <p className="login__link-title">Уже зарегистрированы?</p>
            <Link to="/signin" className="login__link-register">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
