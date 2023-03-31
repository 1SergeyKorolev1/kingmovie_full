import React from "react";
import "./Profile.css";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Error from "./error/Error.js";
import Notification from "./notification/Notification.js";

function Profile({ onDataChangeUser, errorText, goBack, notificationText }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);
  const history = useHistory();

  // const goBack = () => {
  //   history.push("/signin");
  // };

  function onChangeName(evt) {
    setName(evt.target.value);
    validateForm();
    validateInput(evt.target);
  }

  function onChangeEmail(evt) {
    setEmail(evt.target.value);
    validateForm();
    validateInput(evt.target);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (email === "") {
      onDataChangeUser({
        email: currentUser.email,
        name: name,
      });
    } else if (name === "") {
      onDataChangeUser({
        email: email,
        name: currentUser.name,
      });
    }
  }

  function validateForm() {
    const form = document.querySelector(".profile__form");
    const submitButton = form.querySelector(".profile__button");

    if (
      (form.checkValidity() && name !== "" && name !== currentUser.name) ||
      (email !== currentUser.email && email !== "")
    ) {
      console.log("работает");
      submitButton.removeAttribute("disabled");
      submitButton.classList.add("profile__button_valid");
      submitButton.classList.remove("profile__button_invalid");
    } else {
      submitButton.setAttribute("disabled", true);
      submitButton.classList.remove("profile__button_valid");
      submitButton.classList.add("profile__button_invalid");
    }
  }

  function validateInput(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
  }

  React.useEffect(() => {
    validateForm();
  });

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <p className="profile__welcome">{`Привет, ${currentUser.name}!`}</p>
        <form onSubmit={handleSubmit} className="profile__form" noValidate>
          <span className="profile__error" id="name-profile-error"></span>
          <div className="profile__input-wrapper">
            <label htmlFor="text" className="profile__label">
              Имя
            </label>
            <input
              className="profile__input"
              id="name-profile"
              required
              name="profile-name"
              type="text"
              minLength="2"
              maxLength="22"
              value={name === "" ? currentUser.name : name}
              onChange={onChangeName}
            />
          </div>
          <div className="profile__line"></div>
          <div className="profile__input-wrapper">
            <label htmlFor="email" className="profile__label">
              E-mail
            </label>
            <input
              className="profile__input"
              id="email-profile"
              required
              name="profile-email"
              type="email"
              value={email === "" ? currentUser.email : email}
              onChange={onChangeEmail}
            />
          </div>
          <span className="profile__error" id="email-profile-error"></span>
          <Notification notificationText={notificationText} />
          <Error errorText={errorText} />
          <button type="submit" className="profile__button">
            Редактировать
          </button>
          <button onClick={goBack} className="profile__link">
            Выйти из аккаунта
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
