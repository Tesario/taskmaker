import React, { useEffect } from "react";
import { useUpdateBreadcrump } from "@/BreadcrumpProvider";
import CategoryBar from "@components/Categories/CategoryBar/CategoryBar";
import TaskBar from "./TaskBar/TaskBar";
import TaskList from "./TaskList/TaskList";

const Tasks: React.FC = () => {
  const BreadcrumpUpdateContext = useUpdateBreadcrump();

  useEffect(() => {
    BreadcrumpUpdateContext({
      routes: [{ title: "Tasks" }],
    });
  }, []);

  return (
    <section id="tasks">
      <div className="container">
        <div className="white-card">
          <TaskBar />
          <CategoryBar />
          <TaskList />
        </div>
      </div>
    </section>
  );
};

export default Tasks;
