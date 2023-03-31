import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h3 className="techs__title">Технологии</h3>
      <h2 class="techs__subtitle">7 технологий</h2>
      <p class="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div class="logo-zone">
        <a
          href="https://developer.mozilla.org/ru/docs/Web/HTML"
          class="logo-zone__link"
          target="_blank"
          rel="noreferrer"
        >
          HTML
        </a>
        <a
          href="https://developer.mozilla.org/ru/docs/Web/CSS"
          class="logo-zone__link"
          target="_blank"
          rel="noreferrer"
        >
          CSS
        </a>
        <a
          href="https://developer.mozilla.org/ru/docs/Web/JavaScript"
          class="logo-zone__link"
          target="_blank"
          rel="noreferrer"
        >
          JS
        </a>
        <a
          href="https://clck.ru/33CCbf"
          class="logo-zone__link"
          target="_blank"
          rel="noreferrer"
        >
          React
        </a>
        <a
          href="https://clck.ru/33CCd7"
          class="logo-zone__link"
          target="_blank"
          rel="noreferrer"
        >
          Git
        </a>
        <a
          href="https://clck.ru/33CCeg"
          class="logo-zone__link"
          target="_blank"
          rel="noreferrer"
        >
          Express.js
        </a>
        <a
          href="https://clck.ru/33CCfY"
          class="logo-zone__link"
          target="_blank"
          rel="noreferrer"
        >
          mongoDB
        </a>
      </div>
    </section>
  );
}

export default Techs;
