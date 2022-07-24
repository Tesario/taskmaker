import React from "react";
import { Task } from "@components/Tasks/TaskList/TaskList";
import TaskStatus from "./TaskStatus/TaskStatus";
import { timeLeft } from "@/Helpers";
import { Link } from "react-router-dom";
import { useTheme } from "@/ThemeProvider";

import "./TaskRow.scss";

interface Props extends Task {
  key: number;
}

const TaskRow: React.FC<{ task: Props }> = ({ task }) => {
  const { key, id, title, completed, due } = task;
  const themeContext = useTheme();

  return (
    <Link to={`/tasks/${id}`} id="task" className={themeContext}>
      <div className="id">{key}</div>
      <div className="task-title">{title}</div>
      <div className="remain">{!completed && timeLeft(due)}</div>
      <TaskStatus completed={completed} due={due} />
    </Link>
  );
};

export default TaskRow;
