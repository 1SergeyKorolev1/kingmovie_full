import React from "react";
import "./Promo.css";
import PromoLogo from "../../images/World_King_Movie_Promo_image.svg";

function Promo() {
  return (
    <section className="promo">
      <img
        alt="web world"
        className="promo__logo rotation"
        src={PromoLogo}
      ></img>
      <h1 className="promo__title">
        Учебный&nbsp;проект студента факультета Веб&#8209;разработки.
      </h1>
      <p className="promo__subtitle">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <a className="promo__link" href="#t1">
        Узнать больше
      </a>
    </section>
  );
}

export default Promo;
