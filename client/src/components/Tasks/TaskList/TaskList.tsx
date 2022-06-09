import React, { useEffect } from "react";
import TaskRow from "./TableRow/TaskRow";
import Loader from "../../Loader/Loader";
import { graphQLFetch } from "../../../Helpers";
import { useLayout } from "../../../LayoutProvider";
import TaskCard from "./TaskCard/TaskCard";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { useFilter } from "../../../FilterProvider";
import { setTasks } from "../../../state/tasks/tasksSlice";

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
  const state = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      const query = `query taskFilter($filter: Filter!) {
        taskFilter(filter: $filter) {
          id
          title
          desc
          status
          created
          due
          priority
        }
      }
      `;
      const data: { taskFilter: Task[] } = await graphQLFetch(query, {
        filter: filterContext,
      });

      if (data) {
        dispatch(setTasks(data.taskFilter));
      }
    };
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`task-grid columns-${layoutContext.columns}`}>
      {state.loading ? (
        <Loader />
      ) : state.tasks.length > 0 ? (
        state.tasks.map((task: Task, index: number) => {
          return layoutContext.type === "rows" ? (
            <TaskRow key={task.id} task={{ ...task, key: ++index }} />
          ) : (
            <TaskCard key={task.id} task={{ ...task, key: ++index }} />
          );
        })
      ) : (
        <div className="empty">There are no tasks yet.</div>
      )}
    </div>
  );
};

export default TaskList;
