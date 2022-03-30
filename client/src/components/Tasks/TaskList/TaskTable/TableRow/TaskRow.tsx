import React from "react";
import dateformat from "dateformat";
import { Task as Props } from "../../TaskList";

import "./TaskRow.scss";

const TaskRow: React.FC<{ task: Props }> = ({ task }) => {
  const { id, title, status, created } = task;

  return (
    <div id="task">
      <div className="id">{id}</div>
      <div className="task-title">
        <div className="date">{dateformat(created, "dd.mm.yyyy")}</div>
        <div className="text">{title}</div>
      </div>
      <div className={"status " + status}>{status}</div>
    </div>
  );
};

export default TaskRow;
