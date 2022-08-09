import { Task, Tasks } from "@components/Tasks/TaskList/TaskList";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

const initialState: Tasks = {
  tasks: [],
  loading: true,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state: Tasks, action: PayloadAction<{ task: Task }>) => {
      return {
        tasks: [...state.tasks, action.payload.task],
        loading: false,
      };
    },
    setTasks: ({}, action: PayloadAction<Task[]>) => {
      return { tasks: action.payload, loading: false };
    },
    updateTask: (state: Tasks, action: PayloadAction<Task>) => {
      const tasks = current(state.tasks).slice();
      const newTasks = tasks.filter(
        (task: Task) => task.id !== action.payload.id
      );
      return { tasks: [...newTasks, action.payload], loading: false };
    },
    removeTask: (state: Tasks, action: PayloadAction<{ id: number }>) => {
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
        loading: false,
      };
    },
    clearTasks: () => {
      return initialState;
    },
  },
});

export const { addTask, setTasks, updateTask, removeTask, clearTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
