import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { graphQLFetch } from "../../Helpers";
import TaskStatus from "../Tasks/TaskList/TableRow/TaskStatus/TaskStatus";
import { Task as TaskI } from "../Tasks/TaskList/TaskList";
import { renderStars } from "../StarsInput/StarsInput";
import { timeLeft } from "../../Helpers";
import Loader from "../Loader/Loader";
import dateformat from "dateformat";
import MarkdownPreview from "../../Markdown/MarkdownPreview";
import { useUpdateBreadcrump } from "../../BreadcrumpProvider";

import "./Task.scss";
import EditButton from "../Buttons/EditButton";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Task: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [task, setTask] = useState<TaskI | null>(null);
  const BreadcrumpUpdateContext = useUpdateBreadcrump();

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
        BreadcrumpUpdateContext({
          routes: [
            { pathname: "/tasks", title: "Tasks" },
            { title: data.taskList[0].title },
          ],
        });
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <section id="task-show">
      <div className="container">
        <div className="white-card">
          {task ? (
            <>
              <div className="title">{task.title}</div>
              {task.desc && <MarkdownPreview desc={task.desc} />}
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
                  <div className="btns-edit">
                    <EditButton icon={faEdit} type={"edit"} />
                    <EditButton icon={faTrash} type={"delete"} />
                  </div>
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
