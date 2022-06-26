import { useTheme } from "@/ThemeProvider";
import {
  faCircleCheck,
  faHourglassEmpty,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./TaskStatus.scss";

interface Props {
  completed: boolean;
  due: Date;
}

const TaskStatus: React.FC<Props> = ({ completed, due }) => {
  const themeContext = useTheme();

  const getStatus = ({ completed, due }: Props) => {
    if (completed) {
      return (
        <div className="completed">
          <FontAwesomeIcon icon={faCircleCheck} fixedWidth />
          <span className="status-tooltip">Completed</span>
        </div>
      );
    }
    if (new Date(due) < new Date()) {
      return (
        <div className="expired">
          <FontAwesomeIcon icon={faHourglassEmpty} fixedWidth />
          <span className="status-tooltip">Expired</span>
        </div>
      );
    }
    return (
      <div className="uncompleted">
        <FontAwesomeIcon icon={faThumbTack} fixedWidth />
        <span className="status-tooltip">Uncompleted</span>
      </div>
    );
  };

  return (
    <div className={`task-status ${themeContext}`}>
      {getStatus({ completed, due })}
    </div>
  );
};

export default TaskStatus;
