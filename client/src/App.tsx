import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import Footer from "./components/Footer/Footer";
import Error from "./components/Error/Error";
import Task from "./components/Task/Task";
import TasksLayout from "./components/Layouts/TasksLayout";
import DashBoard from "./components/DashBoard/DashBoard";
import { useTheme } from "./ThemeProvider";
import Login from "./components/Login/Login";
import LoginLayout from "./components/Layouts/LoginLayout";
import Register from "./components/Register/Register";
import { Toaster } from "react-hot-toast";

import "./assets/global.scss";

const App: React.FC = () => {
  const themeContext = useTheme();

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(themeContext);
  }, [themeContext]);

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "#198754",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#dc3545",
                color: "#fff",
              },
            },
          }}
        />
        <Routes>
          <Route index element={<DashBoard />} />
          <Route path="tasks" element={<TasksLayout />}>
            <Route index element={<Tasks />} />
            <Route path=":id" element={<Task />} />
          </Route>
          <Route path="/" element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route
            path="*"
            element={<Error error={{ message: "Page not found", code: 404 }} />}
          ></Route>
        </Routes>
        <Outlet />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
