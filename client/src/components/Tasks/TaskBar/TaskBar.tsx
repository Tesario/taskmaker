import React from "react";
import ToolButton from "./ToolButton/ToolButton";
import {
  faBorderAll,
  faCalendarPlus,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import "./TaskBar.scss";

const TaskBar: React.FC = () => {
  return (
    <div id="taskbar">
      <div className="tool-group tasks">
        <ToolButton title="Create task" icon={faCalendarPlus} />
        <ToolButton title="Search tasks" icon={faSearch} />
      </div>
      <h1 className="title">Tasks</h1>
      <div className="tool-group option">
        <ToolButton title="Filter" icon={faFilter} />
        <ToolButton title="Layout" icon={faBorderAll} />
      </div>
    </div>
  );
};

export default TaskBar;
