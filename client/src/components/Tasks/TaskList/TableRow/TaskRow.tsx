import React from "react";
import { Task } from "../TaskList";
import TaskStatus from "./TaskStatus/TaskStatus";
import { timeLeft } from "../../../../Helpers";

import "./TaskRow.scss";

interface Props extends Task {
  key: number;
}

const TaskRow: React.FC<{ task: Props }> = ({ task }) => {
  const { key, title, status, due } = task;

  return (
    <div id="task">
      <div className="id">{key}</div>
      <div className="task-title">{title}</div>
      <div className="remain">{status !== "done" && timeLeft(due)}</div>
      <TaskStatus status={status} />
    </div>
  );
};

export default TaskRow;
