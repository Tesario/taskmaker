import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../hooks";
import { useTheme } from "../../ThemeProvider";
import { graphQLFetch } from "../../Helpers";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StarsInput from "../StarsInput/StarsInput";
import MarkdownPreview from "../../Markdown/MarkdownPreview";
import MarkdownEditor from "../../Markdown/MarkdownEditor";
import DatetimePicker from "../DatetimePicker/DatetimePicker";
import { Task } from "../Tasks/TaskList/TaskList";

import "./Button.scss";
import { updateTask } from "../../state/tasks/tasksSlice";

interface Props {
  icon: IconProp;
  id: number;
  task: Task;
  handleTask?: (task: Task) => void;
}

type FormData = {
  title: string;
  desc?: string;
  due: Date;
  priority: number;
};

export type handleValueFunc = (
  name: "title" | "desc" | "due" | "priority",
  value: any
) => void;

const schema = yup
  .object({
    title: yup
      .string()
      .required((value) => `The ${value.path} field is required.`)
      .min(
        3,
        (value) =>
          `The ${value.path} must be at least ${value.value} characters.`
      )
      .max(
        200,
        (value) =>
          `The ${value.path} may not be greater than ${value.max} characters.`
      ),
    desc: yup
      .string()
      .max(
        2000,
        (value) =>
          `The ${value.path} may not be greater than ${value.max} characters.`
      ),
    due: yup
      .date()
      .required((value) => `The ${value.path} field is required.`)
      .min(
        new Date(Date.now() + 1000 * 60),
        (value) => `The ${value.path} must be in the past.`
      )
      .typeError((value) => `The ${value.path} is not a valid date.`),
  })
  .required();

const EditButton: React.FC<Props> = ({ icon, id, task, handleTask }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [creatingTask, setCreatingTask] = useState<boolean>(false);
  const [state, setState] = useState<Task>(task);
  const themeContext = useTheme();
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  useEffect(() => {
    setValue("title", task["title"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (task: FormData) => {
    setCreatingTask(true);

    const query = `mutation taskUpdate($id: Int!, $task: TaskInputs!) {
      taskUpdate(id: $id, task: $task) {
        acknowledged
        modifiedCount
        task{
          id
          title
          desc
          priority
          due
          created
          status
        }
      }
    }`;

    const data = await graphQLFetch(query, {
      id,
      task: { ...task, due: new Date(task.due) },
    });

    if (data) {
      dispatch(updateTask(data.taskUpdate.task));

      if (handleTask) {
        handleTask(data.taskUpdate.task);
      }
    }

    setCreatingTask(false);
    toggleModal();
  };

  const toggleModal = () => {
    setModalState(!modalState);
    document.body.classList.toggle("lock-scroll");
  };

  const handleValue: handleValueFunc = (name, value) => {
    setValue(name, value);
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <button type="button" className="btn btn-edit" onClick={toggleModal}>
        <FontAwesomeIcon icon={icon} />
      </button>
      <Modal
        title="Editing task"
        toggleModal={toggleModal}
        modalState={modalState}
        widthClass="lg-width"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="tool-form"
          className={themeContext}
        >
          <div className="form-body">
            <div className="form-control">
              <label>Title</label>
              <input {...register("title")} />
              <div
                className={
                  "error-message " + (errors.title?.message ? "show" : "")
                }
              >
                {errors.title?.message}
              </div>
            </div>
            <div className="form-control">
              <label>Description</label>
              <MarkdownEditor
                handleValue={handleValue}
                mdText={state.desc || ""}
              />
              <MarkdownPreview desc={state.desc} preview />
              <div
                className={
                  "error-message " + (errors.desc?.message ? "show" : "")
                }
              >
                {errors.desc?.message}
              </div>
            </div>
            <div className="form-control">
              <label>Due</label>
              <DatetimePicker handleValue={handleValue} due={state.due} />
              <div
                className={
                  "error-message " + (errors.due?.message ? "show" : "")
                }
              >
                {errors.due?.message}
              </div>
            </div>
            <div className="form-control">
              <label>Priority</label>
              <StarsInput handleValue={handleValue} priority={state.priority} />
            </div>
          </div>
          <div className="form-footer wave-1">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creatingTask}
              className="btn btn-primary"
            >
              Apply
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditButton;
