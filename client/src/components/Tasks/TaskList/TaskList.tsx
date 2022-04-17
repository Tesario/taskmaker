import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { useDispatch } from "react-redux";
import TaskRow from "./TableRow/TaskRow";
import { useSelector } from "react-redux";
import { State } from "../../../state/reducers";
import Loader from "../../Loader/Loader";
import { graphQLFetch } from "../../../Helpers";
import { useLayout } from "../../../LayoutProvider";
import TaskCard from "./TaskCard/TaskCard";

import "./TaskList.scss";
import { useFilter } from "../../../FilterProvider";

export interface Tasks {
  tasks: Task[] | null;
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
  const dispatch = useDispatch();
  const { setTasks } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state: State) => state.tasks);
  const layoutContext = useLayout();
  const filterContext = useFilter();

  useEffect(() => {
    const fetchTasks = async () => {
      const query = `mutation taskFilter($filter: Filter!) {
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
        setTasks(data.taskFilter);
      }
    };
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`task-grid columns-${layoutContext.columns}`}>
      {state === null ? (
        <Loader />
      ) : (
        state.map((task) => {
          return layoutContext.type === "rows" ? (
            <TaskRow key={task.id} task={task} />
          ) : (
            <TaskCard key={task.id} task={task} />
          );
        })
      )}
    </div>
  );
};

export default TaskList;
