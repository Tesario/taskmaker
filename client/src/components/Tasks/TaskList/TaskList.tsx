import React, { useEffect } from "react";
import TaskTable from "./TaskTable/TaskTable";
import AddTask from "./AddTask/AddTask";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { useDispatch } from "react-redux";

export interface Tasks {
  tasks: Task[] | null;
}

export interface Task {
  id: number;
  title: string;
  status: string;
  created: Date;
}

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { addTask, setTasks } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const fetchTasks = async () => {
      const query = "query{taskList{id title status created}}";
      const data = await graphQLFetch(query);

      if (data) {
        setTasks(data.taskList);
      }
    };
    fetchTasks();
  });

  const graphQLFetch = async (query: string, variables = {}) => {
    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        const error = result.errors[0];

        if (error.extensions.code === "BAD_USER_INPUT") {
          const details = error.extensions.exception.errors.join("\n");
          alert(`${error.message}: ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }

      return result.data;
    } catch (error: any) {
      alert(`Error in sending data to server: ${error.message}`);
    }
  };

  const createTask = async (task: object) => {
    const query = `mutation taskAdd($task: TaskInputs!) {
      taskAdd(task: $task) {
        id
        title
        status
      }
    }`;

    const data: { taskAdd: Task } = await graphQLFetch(query, { task });

    if (data) {
      addTask(data.taskAdd);
    }
  };

  return (
    <div className="white-card">
      <h1>Tasks</h1>
      <AddTask createTask={createTask} />
      <TaskTable />
    </div>
  );
};

export default TaskList;
