import React from "react";
import TaskRow from "./TableRow/TaskRow";

import "./TaskTable.scss";

const TaskTable = ({ tasks }) => {
  return (
    <div className="task-grid">
      {tasks.map((task) => {
        return <TaskRow key={task.id} task={task} />;
      })}
    </div>
  );
};

export default TaskTable;
