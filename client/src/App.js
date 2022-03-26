import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/global.scss";
import Tasks from "./components/Tasks/Tasks";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Tasks />}></Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
