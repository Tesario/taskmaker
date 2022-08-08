import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categoriesSlice from "./categories/categoriesSlice";
import tasksSlice from "./tasks/tasksSlice";

const store = configureStore({
  reducer: { tasks: tasksSlice, auth: authSlice, categories: categoriesSlice },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
