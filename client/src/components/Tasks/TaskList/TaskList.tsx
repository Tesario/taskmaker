import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { useDispatch } from "react-redux";
import TaskRow from "./TableRow/TaskRow";
import { useSelector } from "react-redux";
import { State } from "../../../state/reducers";
import Loader from "../../Loader/Loader";
import { graphQLFetch } from "../../../Helpers";

import "./TaskList.scss";

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

  useEffect(() => {
    const fetchTasks = async () => {
      const query = "query{taskList{id title status created due priority }}";
      const data = await graphQLFetch(query);

      if (data) {
        setTasks(data.taskList);
      }
    };
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default TaskList;
