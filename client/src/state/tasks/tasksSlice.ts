import { Tasks } from "../../components/Tasks/TaskList/TaskList";
import { createSlice, current } from "@reduxjs/toolkit";
import sortJsonArray from "sort-json-array";

const initialState: Tasks = {
  tasks: [],
  loading: true,
};

// Problém s PayloadAction - měl by se načítat z toolkitu
interface PayloadAction {
  type: any;
  payload: any;
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state: Tasks, action: PayloadAction) => {
      return {
        tasks: sortJsonArray(
          [...state.tasks, action.payload.task],
          action.payload.filter.filter,
          action.payload.filter.order === 1 ? "asc" : "des"
        ),
        loading: false,
      };
    },
    setTasks: (state: Tasks, action: PayloadAction) => {
      return { tasks: action.payload, loading: false };
    },
    removeTask: (state: Tasks, action: PayloadAction) => {
      return {
        tasks: sortJsonArray(
          state.tasks.filter((task) => task.id !== action.payload.id),
          action.payload.filter.filter,
          action.payload.filter.order === 1 ? "asc" : "des"
        ),
        loading: false,
      };
    },
    sortTasks: (state: Tasks, action: PayloadAction) => {
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

export const { addTask, setTasks, removeTask, sortTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
