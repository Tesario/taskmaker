import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import Footer from "./components/Footer/Footer";
import Error from "./components/Error/Error";
import Task from "./components/Task/Task";

import "./assets/global.scss";

const App: React.FC = () => {
  const overlayLoaderRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (overlayLoaderRef.current) {
      overlayLoaderRef.current.classList.remove("show");
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Tasks />} />
          <Route path="tasks" element={<Outlet />}>
            <Route index element={<Tasks />} />
            <Route path=":id" element={<Task />} />
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
