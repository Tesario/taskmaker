import React from "react";
import { Task as Props } from "../TaskList";
import TaskStatus from "../TableRow/TaskStatus/TaskStatus";
import { timeLeft } from "../../../../Helpers";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./TaskCard.scss";

const TaskCard: React.FC<{ task: Props }> = ({ task }) => {
  const { id, title, desc, priority, status, due } = task;

  const renderStars = (stars: 1 | 2 | 3 | 4 | 5) => {
    var rows = [];
    for (var i = 0; i < stars; i++) {
      rows.push(
        <div key={i} className="star">
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    }
    return <div className="priority">{rows}</div>;
  };

  return (
    <div id="task-card">
      <div className="task-header">
        <div className="id">{id}</div>
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
    </div>
  );
};

export default TaskCard;
