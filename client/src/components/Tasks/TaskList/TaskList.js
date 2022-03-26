import React, { useEffect, useState } from "react";
import TaskTable from "./TaskTable/TaskTable";
import AddTask from "./AddTask/AddTask";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const query = "query{taskList{id title status created}}";
      const data = await graphQLFetch(query);

      if (data) {
        setTasks(data.taskList);
      }
    };
    fetchTasks();
  }, []);

  const graphQLFetch = async (query, variables = {}) => {
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
    } catch (error) {
      alert(`Error in sending data to server: ${error.message}`);
    }
  };

  const createTask = async (task) => {
    const query = `mutation taskAdd($task: TaskInputs!) {
      taskAdd(task: $task) {
        id
        title
        status
      }
    }`;

    const data = await graphQLFetch(query, { task });

    if (data) {
      setTasks([...tasks, data.taskAdd]);
    }
  };

  return (
    <div className="white-card">
      <h1>Tasks</h1>
      <AddTask createTask={createTask} />
      <TaskTable tasks={tasks} />
    </div>
  );
};

export default TaskList;
