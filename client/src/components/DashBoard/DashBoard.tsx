import React from "react";
import Card from "./Card/Card";
import tasksImage from "@assets/img/tasks.webp";
import statsImage from "@assets/img/stats.webp";
import categoriesImage from "@assets/img/categories.webp";

import "./DashBoard.scss";

const DashBoard: React.FC = () => {
  return (
    <section id="dashboard">
      <div className="container">
        <h1 className="main-title">DashBoard</h1>
        <div className="grid-cards">
          <Card title="Tasks" link="/tasks" image={tasksImage} />
          <Card title="Statistics" link="/stats" image={statsImage} />
          <Card title="Categories" link="/categories" image={categoriesImage} />
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
