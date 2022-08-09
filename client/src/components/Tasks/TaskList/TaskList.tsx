import React, { useEffect } from "react";
import TaskRow from "./TableRow/TaskRow";
import Loader from "@components/Loader/Loader";
import { graphQLFetch } from "@/Helpers";
import { useLayout } from "@/LayoutProvider";
import TaskCard from "./TaskCard/TaskCard";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useFilter } from "@/FilterProvider";
import { setTasks } from "@/state/tasks/tasksSlice";
import sortJsonArray from "sort-json-array";
import { categoryI } from "types/category";

import "./TaskList.scss";

export interface Tasks {
  tasks: Task[];
  loading: boolean;
}

export interface Task {
  id: number;
  title: string;
  desc?: string;
  completed: boolean;
  priority: 1 | 2 | 3 | 4 | 5;
  created: Date;
  due: Date;
  category?: categoryI;
}

const TaskList: React.FC<{ search: string }> = ({ search }) => {
  const layoutContext = useLayout();
  const filterContext = useFilter();
  const state = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      const query = `query {
        taskList {
          id
          title
          completed
          created
          due
          priority
          category {
            name
            uuid
          }
        }
      }`;

      const data: { taskList: Task[] } = await graphQLFetch(query);

      if (data) {
        dispatch(setTasks(data.taskList));
      }
    };
    fetchTasks();
  }, []);

  const renderTasksByFilter = () => {
    let sortedTasks = sortJsonArray(
      state.tasks.slice(),
      filterContext.filter,
      filterContext.order === 1 ? "asc" : "des"
    );

    if (search) {
      sortedTasks = sortedTasks.filter((task: Task) => {
        if (task.title.toLowerCase().includes(search.toLowerCase())) {
          return task;
        }
      });
    }

    if (filterContext.category) {
      sortedTasks = sortedTasks.filter((task: Task) => {
        if (filterContext.category === task.category?.uuid) {
          return task;
        }
      });
    }

    sortedTasks = sortedTasks.filter((task: Task) => {
      if (
        (filterContext.status.includes("completed") && task.completed) ||
        (filterContext.status.includes("expired") &&
          new Date(task.due) < new Date() &&
          !task.completed) ||
        (filterContext.status.includes("uncompleted") &&
          new Date(task.due) > new Date() &&
          !task.completed)
      ) {
        return task;
      }
    });

    if (!sortedTasks.length) {
      return <div className="empty">There are no results.</div>;
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
