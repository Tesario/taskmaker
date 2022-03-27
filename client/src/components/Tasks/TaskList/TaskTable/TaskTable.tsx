import React from "react";
import TaskRow from "./TableRow/TaskRow";

import "./TaskTable.scss";

interface Props {
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  status: string;
  created: Date;
}

const TaskTable: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="task-grid">
      {tasks.map((task) => {
        return <TaskRow key={task.id} task={task} />;
      })}
    </div>
  );
};

export default TaskTable;
