import React from "react";
import TaskList from "./TaskList/TaskList";

import "./Tasks.scss";

const Tasks = () => {
  return (
    <section id="tasks">
      <div className="container">
        <TaskList />
      </div>
    </section>
  );
};

export default Tasks;
