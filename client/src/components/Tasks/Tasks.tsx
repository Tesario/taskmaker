import React from "react";
import TaskList from "./TaskList/TaskList";

import "./Tasks.scss";

const Tasks: React.FC = () => {
  return (
    <section id="tasks">
      <div className="container">
        <TaskList />
      </div>
    </section>
  );
};

export default Tasks;
