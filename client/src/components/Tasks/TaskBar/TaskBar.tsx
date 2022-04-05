import React from "react";
import FormCreateTask from "./ToolForms/FormCreateTask";
import FormSearchTask from "./ToolForms/FormSearchTask";

import "./TaskBar.scss";
import FormFilter from "./ToolForms/FormFilter";
import FormLayout from "./ToolForms/FormLayout";

const TaskBar: React.FC = () => {
  return (
    <div id="taskbar">
      <div className="tool-group tasks">
        <FormCreateTask title="Create task" />
        <FormSearchTask title="Search task" />
      </div>
      <h1 className="title">Tasks</h1>
      <div className="tool-group option">
        <FormFilter title="Filter" />
        <FormLayout title="Layout" />
      </div>
    </div>
  );
};

export default TaskBar;
