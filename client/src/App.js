import React from "react";
import TaskList from "./components/TaskList/TaskList";

import "./assets/global.scss";

const App = () => {
  return (
    <main>
      <section id="tasks">
        <div className="container">
          <TaskList />
        </div>
      </section>
    </main>
  );
};

export default App;
