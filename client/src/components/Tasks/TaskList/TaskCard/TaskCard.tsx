import React from "react";
import { Task } from "../TaskList";
import TaskStatus from "../TableRow/TaskStatus/TaskStatus";
import { timeLeft } from "../../../../Helpers";
import { renderStars } from "../../../StarsInput/StarsInput";
import { Link } from "react-router-dom";
import MarkdownPreview from "../../../../Markdown/MarkdownPreview";

import "./TaskCard.scss";

interface Props extends Task {
  key: number;
}

const TaskCard: React.FC<{ task: Props }> = ({ task }) => {
  const { key, id, title, desc, priority, status, due } = task;

  return (
    <div id="task-card">
      <div className="task-header">
        <div className="id">{key}</div>
        <Link to={`/tasks/${id}`} className="task-title">
          {title}
        </Link>
      </div>
      {desc && <MarkdownPreview desc={desc} />}
      <div className="task-footer">
        <div className="group">
          {status !== "done" && <div className="remain">{timeLeft(due)}</div>}
          {renderStars(priority)}
        </div>
        <TaskStatus status={status} />
      </div>
    </div>
  );
};

export default TaskCard;
