import React from "react";
import { Task as Props } from "../TaskList";
import TaskStatus from "./TaskStatus/TaskStatus";
import { timeLeft } from "../../../../Helpers";

import "./TaskRow.scss";

const TaskRow: React.FC<{ task: Props }> = ({ task }) => {
  const { id, title, status, due } = task;

  return (
    <div id="task">
      <div className="id">{id}</div>
      <div className="task-title">{title}</div>
      <div className="remain">{status !== "done" && timeLeft(due)}</div>
      <TaskStatus status={status} />
    </div>
  );
};

export default TaskRow;
