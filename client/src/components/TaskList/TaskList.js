import React, { useEffect, useState } from "react";
import TaskTable from "./TaskTable/TaskTable";
import AddTask from "./AddTask/AddTask";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const initialTasks = [
      {
        id: 1,
        title: "Math test",
        status: "unfinished",
      },
      {
        id: 2,
        title: "Physic test",
        status: "done",
      },
      {
        id: 3,
        title: "Science test",
        status: "uncompleted",
      },
    ];

    setTasks(initialTasks);
  }, []);

  const createTask = (task) => {
    task.id = tasks.length + 1;
    task.status = "unfinished";
    setTasks([...tasks, task]);
  };

  return (
    <>
      <h1>Tasks</h1>
      <AddTask createTask={createTask} />
      <TaskTable tasks={tasks} />
    </>
  );
};

export default TaskList;
