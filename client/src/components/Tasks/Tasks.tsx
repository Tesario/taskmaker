import React, { useEffect } from "react";
import { useUpdateBreadcrump } from "@/BreadcrumpProvider";
import CategoryBar from "@components/Categories/CategoryBar/CategoryBar";
import TaskBar from "./TaskBar/TaskBar";
import TaskList from "./TaskList/TaskList";
import { useAppSelector } from "@/hooks";
import { Navigate } from "react-router-dom";

const Tasks: React.FC = () => {
  const BreadcrumpUpdateContext = useUpdateBreadcrump();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    BreadcrumpUpdateContext({
      routes: [{ title: "Tasks" }],
    });
  }, []);

  if (!user) {
    return <Navigate to={"/unauthorized"} replace />;
  }

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
