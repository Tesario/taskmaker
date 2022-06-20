import React, { useEffect, useState } from "react";
import TaskRow from "./TableRow/TaskRow";
import Loader from "@components/Loader/Loader";
import { graphQLFetch } from "@/Helpers";
import { useLayout } from "@/LayoutProvider";
import TaskCard from "./TaskCard/TaskCard";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  FilterUpdateContext,
  useFilter,
  useUpdateFilter,
} from "@/FilterProvider";
import { setTasks } from "@/state/tasks/tasksSlice";
import sortJsonArray from "sort-json-array";
import "./TaskList.scss";

export interface Tasks {
  tasks: Task[];
  loading: boolean;
}

export interface Task {
  id: number;
  title: string;
  desc?: string;
  status: string;
  priority: 1 | 2 | 3 | 4 | 5;
  created: Date;
  due: Date;
}

const TaskList: React.FC = () => {
  const layoutContext = useLayout();
  const filterContext = useFilter();
  const filterUpdateContext = useUpdateFilter();
  const state = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      const query = `query {
        taskList {
          id
          title
          status
          created
          due
          priority
        }
      }`;

      const data: { taskList: Task[] } = await graphQLFetch(query);

      if (data) {
        dispatch(setTasks(data.taskList));
      }
    };
    fetchTasks();

    return () => {
      filterUpdateContext({ search: "" });
    };
  }, []);

  const renderTasksByFilter = () => {
    let sortedTasks = sortJsonArray(
      state.tasks.slice(),
      filterContext.filter,
      filterContext.order === 1 ? "asc" : "des"
    );

    if (filterContext.search !== undefined) {
      sortedTasks = sortedTasks.filter((task: Task) => {
        if (
          filterContext.search !== undefined &&
          task.title.toLowerCase().includes(filterContext.search)
        ) {
          return task;
        }
      });

      if (!sortedTasks.length) {
        return <div className="empty">There are no results.</div>;
      }
    }

    return sortedTasks.map((task: Task, index: number) => {
      return layoutContext.type === "rows" ? (
        <TaskRow key={task.id} task={{ ...task, key: ++index }} />
      ) : (
        <TaskCard key={task.id} task={{ ...task, key: ++index }} />
      );
    });
  };

  return (
    <div className={`task-grid columns-${layoutContext.columns}`}>
      {state.loading ? (
        <Loader />
      ) : state.tasks.length > 0 ? (
        renderTasksByFilter()
      ) : (
        <div className="empty">There are no tasks yet.</div>
      )}
    </div>
  );
};

export default TaskList;
