import React from "react";
import Card from "./Card/Card";
import notesImage from "../../assets/img/notes.webp";
import tasksImage from "../../assets/img/tasks.webp";
import timerImage from "../../assets/img/timer.webp";

import "./DashBoard.scss";

const DashBoard: React.FC = () => {
  return (
    <section id="dashboard">
      <div className="container">
        <h1 className="main-title">DashBoard</h1>
        <div className="grid-cards">
          <Card title="Notes" link="/notes" image={notesImage} />
          <Card title="Tasks" link="/tasks" image={tasksImage} />
          <Card title="Timer" link="/timer" image={timerImage} />
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
