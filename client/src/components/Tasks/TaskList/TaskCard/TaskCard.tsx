import React from "react";
import { Task } from "../TaskList";
import TaskStatus from "../TableRow/TaskStatus/TaskStatus";
import { timeLeft } from "../../../../Helpers";
import { renderStars } from "../../../StarsInput/StarsInput";
import { Link } from "react-router-dom";

import "./TaskCard.scss";

interface Props extends Task {
  key: number;
}

const TaskCard: React.FC<{ task: Props }> = ({ task }) => {
  const { key, id, title, desc, priority, status, due } = task;

  return (
    <Link to={`/tasks/${id}`} id="task-card">
      <div className="task-header">
        <div className="id">{key}</div>
        <div className="task-title">{title}</div>
      </div>
      {desc && <p className="desc">{desc}</p>}
      <div className="task-footer">
        <div className="group">
          {status !== "done" && <div className="remain">{timeLeft(due)}</div>}
          {renderStars(priority)}
        </div>
        <TaskStatus status={status} />
      </div>
    </Link>
  );
};

export default TaskCard;
