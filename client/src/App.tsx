import React from "react";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import Footer from "./components/Footer/Footer";
import Error from "./components/Error/Error";

import "./assets/global.scss";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/tasks" />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>
          <Route
            path="*"
            element={<Error error={{ message: "Page not found", code: 404 }} />}
          ></Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
