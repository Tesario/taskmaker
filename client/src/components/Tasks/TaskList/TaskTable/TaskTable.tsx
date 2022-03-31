import React from "react";
import TaskRow from "./TableRow/TaskRow";
import { useSelector } from "react-redux";
import { State } from "../../../../state/reducers";

import Loader from "../../../Loader/Loader";
import "./TaskTable.scss";

const TaskTable: React.FC = () => {
  const state = useSelector((state: State) => state.tasks);

  return (
    <div className="task-grid">
      {state === null ? (
        <Loader />
      ) : (
        state.map((task) => {
          return <TaskRow key={task.id} task={task} />;
        })
      )}
    </div>
  );
};

export default TaskTable;
