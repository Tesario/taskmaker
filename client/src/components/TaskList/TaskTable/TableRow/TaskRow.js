import React from "react";

import "./TaskRow.scss";

const TaskRow = ({ task }) => {
  const { id, title, status } = task;

  return (
    <div id="task">
      <div className="id">{id}</div>
      <div className="task-title">{title}</div>
      <div className={"status " + status}>{status}</div>
    </div>
  );
};

export default TaskRow;
