import React, { useEffect } from "react";
import { useUpdateBreadcrump } from "../../BreadcrumpProvider";
import TaskBar from "./TaskBar/TaskBar";
import TaskList from "./TaskList/TaskList";

import "./Tasks.scss";

const Tasks: React.FC = () => {
  const BreadcrumpUpdateContext = useUpdateBreadcrump();

  useEffect(() => {
    BreadcrumpUpdateContext({
      routes: [{ title: "Tasks" }],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="tasks">
      <div className="container">
        <div className="white-card">
          <TaskBar />
          <TaskList />
        </div>
      </div>
    </section>
  );
};

export default Tasks;
