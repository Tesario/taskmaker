import React from "react";
import TaskBar from "./TaskBar/TaskBar";
import TaskList from "./TaskList/TaskList";

import "./Tasks.scss";

const Tasks: React.FC = () => {
  return (
    <section id="tasks">
      <div className="container">
        <div className="white-card">
          <TaskBar />
          <TaskList />
        </div>
      </div>
    </section>
  );
};

export default Tasks;
