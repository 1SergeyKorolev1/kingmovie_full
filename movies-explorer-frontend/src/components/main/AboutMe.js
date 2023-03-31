import React from "react";
import "./AboutMe.css";
import AboutMeLogo from "../../images/AboutMe.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="about-me__title">Студент</h3>
      <div class="about-me__wrapper">
        <div class="about-me__description">
          <p class="about-me__name">Сергей</p>
          <p class="about-me__specialty">Фронтенд-разработчик, 31 год</p>
          <p class="about-me__text">
            Я родился и живу в Рыбинске. Жены и детей нет. Я люблю слушать
            музыку, и заниматься разными видами спорта. Люблю природу и
            животных. Недавно начал кодить. В данный момент работаю в
            строительстве. Так же увлекаюсь 3д моделированием - 3д.печатью -
            Видео, фото - монтажом. Всегда интересовался программированием, как
            прошёл курс по веб-разработке, начал понимать что материал неплохо
            так усваивается и дальнейшую деятельность планирую связать с
            кодингом!
          </p>
          <p class="about-me__links">
            <a
              class="about-me__link"
              href="https://github.com/1SergeyKorolev1"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </p>
        </div>
        <img class="about-me__avatar" src={AboutMeLogo} alt="Мой Аватар"></img>
      </div>
    </section>
  );
}

export default AboutMe;
