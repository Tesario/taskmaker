import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrump from "../Breadcrump/Breadcrump";

const TasksLayout: React.FC = () => {
  return (
    <>
      <Breadcrump />
      <Outlet />
    </>
  );
};

export default TasksLayout;
