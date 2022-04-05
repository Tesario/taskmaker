import {
  faCircleCheck,
  faHourglassEmpty,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./TaskStatus.scss";

interface Props {
  status: string;
}

const TaskStatus: React.FC<Props> = ({ status }) => {
  const getStatus = (status: string) => {
    switch (status) {
      case "created":
        return (
          <div className={status}>
            <FontAwesomeIcon icon={faThumbTack} fixedWidth />
          </div>
        );
      case "expired":
        return (
          <div className={status}>
            <FontAwesomeIcon icon={faHourglassEmpty} fixedWidth />
          </div>
        );
      default:
        return (
          <div className={status}>
            <FontAwesomeIcon icon={faCircleCheck} fixedWidth />
          </div>
        );
    }
  };

  return <div id="task-status">{getStatus(status)}</div>;
};

export default TaskStatus;
