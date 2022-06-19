import { Filter } from "@/FilterProvider";
import { Task, Tasks } from "@components/Tasks/TaskList/TaskList";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import sortJsonArray from "sort-json-array";

const initialState: Tasks = {
  tasks: [],
  loading: true,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state: Tasks,
      action: PayloadAction<{ task: Task; filter: Filter }>
    ) => {
      return {
        tasks: sortJsonArray(
          [...state.tasks, action.payload.task],
          action.payload.filter.filter,
          action.payload.filter.order === 1 ? "asc" : "des"
        ),
        loading: false,
      };
    },
    setTasks: (state: Tasks, action: PayloadAction<Task[]>) => {
      const tasks = current(state.tasks);
      const newTasks: Task[] = action.payload.map((task: Task) => {
        let updatedTask = tasks.find(
          (updatedTask) => updatedTask.id === task.id
        );
        if (updatedTask && updatedTask.id === task.id) {
          return Object.assign(task, updatedTask);
        }
        return task;
      });

      return { tasks: newTasks, loading: false };
    },
    updateTask: (state: Tasks, action: PayloadAction<Task>) => {
      const tasks = current(state.tasks).slice();
      const newTasks = tasks.filter(
        (task: Task) => task.id !== action.payload.id
      );
      return { tasks: [...newTasks, action.payload], loading: false };
    },
    removeTask: (
      state: Tasks,
      action: PayloadAction<{ id: number; filter: Filter }>
    ) => {
      return {
        tasks: sortJsonArray(
          state.tasks.filter((task) => task.id !== action.payload.id),
          action.payload.filter.filter,
          action.payload.filter.order === 1 ? "asc" : "des"
        ),
        loading: false,
      };
    },
    sortTasks: (state: Tasks, action: PayloadAction<Filter>) => {
      const tasks = current(state.tasks).slice();

      return {
        tasks: sortJsonArray(
          tasks,
          action.payload.filter,
          action.payload.order === 1 ? "asc" : "des"
        ),
        loading: false,
      };
    },
  },
});

export const { addTask, setTasks, updateTask, removeTask, sortTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
