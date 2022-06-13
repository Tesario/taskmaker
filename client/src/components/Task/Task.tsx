import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { graphQLFetch } from "../../Helpers";
import TaskStatus from "../Tasks/TaskList/TableRow/TaskStatus/TaskStatus";
import { Task as TaskI } from "../Tasks/TaskList/TaskList";
import { renderStars } from "../StarsInput/StarsInput";
import { timeLeft } from "../../Helpers";
import Loader from "../Loader/Loader";
import dateformat from "dateformat";
import MarkdownPreview from "../../Markdown/MarkdownPreview";
import { useUpdateBreadcrump } from "../../BreadcrumpProvider";
import EditButton from "../Buttons/EditButton";
import RemoveButton from "../Buttons/RemoveButton";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../hooks";

import "./Task.scss";
import { useTheme } from "../../ThemeProvider";

const Task: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [task, setTask] = useState<TaskI | null>(null);
  const BreadcrumpUpdateContext = useUpdateBreadcrump();
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.tasks.tasks);
  const themeContext = useTheme();

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

      if (data.taskList.length) {
        setTask(data.taskList[0]);
        BreadcrumpUpdateContext({
          routes: [
            { pathname: "/tasks", title: "Tasks" },
            { title: data.taskList[0].title },
          ],
        });
        return;
      }

      return navigate("/not-found");
    };

    const data = state.find((task: TaskI) => task.id.toString() === id);
    if (!data) {
      loadData();
      return;
    }
    setTask(data);
    BreadcrumpUpdateContext({
      routes: [{ pathname: "/tasks", title: "Tasks" }, { title: data.title }],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <section id="task-show" className={themeContext}>
      <div className="container">
        <div className="white-card">
          {task ? (
            <>
              <div className="title">{task.title}</div>
              {task.desc && <MarkdownPreview desc={task.desc} />}
              <div className="task-footer">
                <div className="dates">
                  <div className="created">
                    <span>Created</span>{" "}
                    {dateformat(task.created, "H:MM d.m.yyyy")}
                  </div>
                  {task?.status !== "done" && (
                    <div className="due">
                      <span>Due</span> {dateformat(task.due, "H:MM d.m.yyyy")} (
                      {timeLeft(task.due)})
                    </div>
                  )}
                </div>
                <div className="btns-edit">
                  <EditButton icon={faEdit} id={task.id} task={task} />
                  <RemoveButton icon={faTrash} id={task.id} />
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
