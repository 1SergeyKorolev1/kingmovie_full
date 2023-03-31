import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio-container">
        <li>
          <a
            class="portfolio-container__link"
            href="https://1sergeykorolev1.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li>
          <a
            class="portfolio-container__link"
            href="https://1sergeykorolev1.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li>
          <a
            class="portfolio-container__link"
            href="https://1sergeykorolev1.github.io/mesto/"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
