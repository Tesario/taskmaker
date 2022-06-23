import React, { useEffect, useState } from "react";
import { graphQLFetch } from "@/Helpers";
import Modal from "@components/Modal/Modal";
import ToolButton from "./ToolButton/ToolButton";
import { useForm } from "react-hook-form";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import DatetimePicker from "@components/DatetimePicker/DatetimePicker";
import { Task } from "@components/Tasks/TaskList/TaskList";
import StarsInput from "@components/StarsInput/StarsInput";
import { yupResolver } from "@hookform/resolvers/yup";
import MarkdownEditor from "@/Markdown/MarkdownEditor";
import MarkdownPreview from "@/Markdown/MarkdownPreview";
import { handleValueFunc } from "@components/Buttons/EditButton";
import { useAppDispatch } from "@/hooks";
import { addTask } from "@/state/tasks/tasksSlice";
import * as yup from "yup";
import { useFilter } from "@/FilterProvider";
import { useTheme } from "@/ThemeProvider";

import "./ToolForms.scss";

type FormData = {
  title: string;
  desc?: string;
  due: Date;
  priority: 1 | 2 | 3 | 4 | 5;
};

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

export interface Props {
  title: string;
  desc?: string;
}

const FormCreateTask: React.FC<Props> = ({ title, desc }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [creatingTask, setCreatingTask] = useState<boolean>(false);
  const initialFormData: FormData = {
    title: "",
    desc: "",
    due: new Date(Date.now() + 2000 * 120),
    priority: 2,
  };
  const [state, setState] = useState<FormData>(initialFormData);
  const themeContext = useTheme();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    getValues,
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const dispatch = useAppDispatch();

  useEffect(() => {
    resetFormData();
  }, []);

  const resetFormData = () => {
    setValue("title", initialFormData.title);
    handleValue("desc", initialFormData.desc);
    handleValue("due", initialFormData.due);
    handleValue("priority", initialFormData.priority);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (new Date(Date.now() + 1000 * 60) >= getValues("due")) {
      setError(
        "due",
        { type: "min", message: "The due must be in the past." },
        { shouldFocus: true }
      );
      e.preventDefault();
      return;
    }

    handleSubmit((data: FormData) => {
      createTask(data);
    })(e);
  };

  const toggleModal = () => {
    setModalState(!modalState);
    document.body.classList.toggle("lock-scroll");
  };

  const createTask = async (task: FormData) => {
    setCreatingTask(true);
    const query = `mutation taskAdd($task: TaskInputs!) {
      taskAdd(task: $task) {
        id
        title
        desc
        status
        created
        due
        priority
      }
    }`;

    const data: { taskAdd: Task } = await graphQLFetch(query, { task });

    if (data) {
      dispatch(addTask({ task: data.taskAdd }));
      toggleModal();
      resetFormData();
    }
    setCreatingTask(false);
  };

  const handleValue: handleValueFunc = (name, value) => {
    setValue(name, value);
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <ToolButton onClick={toggleModal} icon={faCalendarPlus} />
      <Modal
        modalState={modalState}
        title={title}
        desc={desc}
        toggleModal={toggleModal}
        widthClass="lg-width"
      >
        <form
          onSubmit={(e) => onSubmit(e)}
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
              Create task
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FormCreateTask;
