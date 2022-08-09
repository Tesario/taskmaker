import React from "react";
import FormCreateTask from "./ToolForms/FormCreateTask";
import FormSearchTask from "./ToolForms/FormSearchTask";
import FormFilter from "./ToolForms/FormFilter";
import FormLayout from "./ToolForms/FormLayout";

import "./TaskBar.scss";

interface PropsI {
  search: string;
  handleSearch: any;
}

const TaskBar: React.FC<PropsI> = ({ handleSearch, search }) => {
  return (
    <div id="taskbar">
      <div className="tool-group tasks">
        <FormLayout title="Layout" />
        <FormFilter title="Filter" />
        <FormCreateTask title="Create task" />
      </div>
      <h1 className="title">Tasks</h1>
      <div className="tool-group option">
        <FormSearchTask handleSearch={handleSearch} search={search} />
      </div>
    </div>
  );
};

export default TaskBar;
