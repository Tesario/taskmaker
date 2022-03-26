import React from "react";
import dateformat from "dateformat";

import "./TaskRow.scss";

const TaskRow = ({ task }) => {
  const { id, title, status, created } = task;

  return (
    <div id="task">
      <div className="id">{id}</div>
      <div className="task-title">
        {title} | {dateformat(created, "dd.mm.yyyy")}
      </div>
      <div className={"status " + status}>{status}</div>
    </div>
  );
};

export default TaskRow;
