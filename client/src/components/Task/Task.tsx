import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { graphQLFetch } from "../../Helpers";
import TaskStatus from "../Tasks/TaskList/TableRow/TaskStatus/TaskStatus";
import { Task as TaskI } from "../Tasks/TaskList/TaskList";
import { renderStars } from "../StarsInput/StarsInput";
import { timeLeft } from "../../Helpers";
import Loader from "../Loader/Loader";
import dateformat from "dateformat";

import "./Task.scss";

const Task: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [task, setTask] = useState<TaskI | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const query = `query taskList($id: Int) {
        taskList(id: $id) {
          id
          title
          desc
          status
          created
          due
          priority
        }
      }`;

      const data = await graphQLFetch(query, { id: id ? parseInt(id) : id });

      if (data) {
        setTask(data.taskList[0]);
      }
    };

    loadData();
  }, [id]);

  return (
    <section id="task-show">
      <div className="container">
        <div className="white-card">
          {task ? (
            <>
              <div className="title">{task.title}</div>
              <div className="desc">{task?.desc}</div>
              <div className="task-footer">
                <div>
                  <div className="created">
                    <span>Created</span>{" "}
                    {dateformat(task.created, "h:MM d.m.yyyy")}
                  </div>
                  {task?.status !== "done" && (
                    <div className="due">
                      <span>Due</span> {dateformat(task.due, "h:MM d.m.yyyy")} (
                      {timeLeft(task.due)})
                    </div>
                  )}
                </div>
                <div className="group">
                  {renderStars(task.priority)}
                  <TaskStatus status={task.status} />
                </div>
              </div>
            </>
          ) : task === undefined ? (
            <Navigate to={"/not-found"} />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </section>
  );
};

export default Task;
