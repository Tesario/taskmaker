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
// import Login from "./components/Login/Login";
// import LoginLayout from "./components/Layouts/LoginLayout";
// import Register from "./components/Register/Register";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./hooks";
import Homepage from "./components/Homepage/Homepage";
import Cookie from "js-cookie";
import { userI } from "types/auth";
import { graphQLFetch, notify } from "./Helpers";
import { login, signOut } from "./state/auth/authSlice";
import { clearTasks } from "./state/tasks/tasksSlice";
import Cookies from "js-cookie";
import Categories from "./components/Categories/Categories";
import Stats from "./components/Stats/Stats";

import "./assets/global.scss";

const App: React.FC = () => {
  const themeContext = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const auth = async () => {
    const token = Cookie.get("token");

    if (token) {
      const query = `mutation userLogin($token: String!) {
        userLogin(token: $token) {
          given_name
          family_name
          picture
          name
        }
      }`;

      const data: { userLogin: userI } = await graphQLFetch(query, { token });

      if (data) {
        dispatch(login(data.userLogin));
      } else {
        google.accounts.id.disableAutoSelect();
        dispatch(signOut());
        dispatch(clearTasks());
        Cookies.remove("token", { path: "/" });
        notify("error", "Your login session expired.");
      }
    }
  };

  useEffect(() => {
    auth();
  }, []);

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
          {user ? (
            <Route index element={<DashBoard />} />
          ) : (
            <Route index element={<Homepage />} />
          )}
          <Route path="/tasks" element={<TasksLayout />}>
            <Route index element={<Tasks />} />
            <Route path=":id" element={<Task />} />
          </Route>
          <Route path="/categories" element={<TasksLayout />}>
            <Route index element={<Categories />} />
          </Route>
          <Route path="/stats" element={<TasksLayout />}>
            <Route index element={<Stats />} />
          </Route>
          {/* <Route path="/" element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route> */}
          <Route
            path="/unauthorized"
            element={<Error error={{ message: "Unauthorized", code: 403 }} />}
          ></Route>
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
