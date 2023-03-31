import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="t1" className="project">
      <h3 className="project__title">О проекте</h3>
      <div className="project-table">
        <div className="project-table__cell">
          <h4 class="project-table__heading">
            Дипломный проект включал 5 этапов
          </h4>
          <p class="project-table__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project-table__cell">
          <h4 class="project-table__heading">
            На выполнение диплома ушло 5 недель
          </h4>
          <p class="project-table__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="project-graph">
        <div className="project-graph__backend">
          <h4 class="project-graph__progress-backend">1 неделя</h4>
          <p class="project-graph__text">Back-end</p>
        </div>
        <div className="project-graph__frontend">
          <h4 class="project-graph__progress-frontend">4 недели</h4>
          <p class="project-graph__text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
