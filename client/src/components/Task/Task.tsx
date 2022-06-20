import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { graphQLFetch } from "@/Helpers";
import TaskStatus from "@components/Tasks/TaskList/TableRow/TaskStatus/TaskStatus";
import { Task, Task as TaskI } from "@components/Tasks/TaskList/TaskList";
import { renderStars } from "@components/StarsInput/StarsInput";
import { timeLeft } from "@/Helpers";
import Loader from "@components/Loader/Loader";
import dateformat from "dateformat";
import MarkdownPreview from "@/Markdown/MarkdownPreview";
import { useUpdateBreadcrump } from "@/BreadcrumpProvider";
import EditButton from "@components/Buttons/EditButton";
import RemoveButton from "@components/Buttons/RemoveButton";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useTheme } from "@/ThemeProvider";
import { addTask, updateTask } from "@/state/tasks/tasksSlice";

import "./Task.scss";

const Task: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [task, setTask] = useState<TaskI | null>(null);
  const BreadcrumpUpdateContext = useUpdateBreadcrump();
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.tasks.tasks);
  const themeContext = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = async (task: TaskI | null) => {
      const query = `query taskGet($id: Int!) {
        taskGet(id: $id) {
          id
          title
          desc
          status
          created
          due
          priority
        }
      }`;

      const queryDescOnly = `query taskGet($id: Int!) {
        taskGet(id: $id) {
          desc
        }
      }`;

      const data = await graphQLFetch(!task ? query : queryDescOnly, {
        id: id ? parseInt(id) : id,
      });

      if (data.taskGet) {
        if (!task) {
          setTask(data.taskGet);
          dispatch(addTask({ task: data.taskGet }));
        } else {
          setTask({ ...task, desc: data.taskGet.desc });
          dispatch(updateTask({ ...task, desc: data.taskGet.desc }));
        }

        BreadcrumpUpdateContext({
          routes: [
            { pathname: "/tasks", title: "Tasks" },
            { title: task?.title || data.taskGet.title },
          ],
        });
        return;
      }

      return navigate("/not-found");
    };

    const data = state.find((task: TaskI) => task.id.toString() === id) || null;

    setTask(data);
    if (!data || data.desc === undefined) {
      loadData(data);
      return;
    }

    BreadcrumpUpdateContext({
      routes: [{ pathname: "/tasks", title: "Tasks" }, { title: data.title }],
    });
  }, [id]);

  const handleTask = (task: TaskI) => {
    setTask(task);
  };

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
                  <EditButton
                    icon={faEdit}
                    id={task.id}
                    task={task}
                    handleTask={handleTask}
                  />
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
