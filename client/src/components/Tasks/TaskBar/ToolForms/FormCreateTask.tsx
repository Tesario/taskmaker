import React, { useEffect, useState } from "react";
import { graphQLFetch } from "../../../../Helpers";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../state";
import { bindActionCreators } from "@reduxjs/toolkit";
import Modal from "../../../Modal/Modal";
import ToolButton from "./ToolButton/ToolButton";
import { useForm } from "react-hook-form";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import DatetimePicker from "../../../DatetimePicker/DatetimePicker";
import { Task } from "../../TaskList/TaskList";
import StarsInput from "../../../StarsInput/StarsInput";
import { yupResolver } from "@hookform/resolvers/yup";
import MarkdownEditor from "../../../../Markdown/MarkdownEditor";
import MarkdownPreview from "../../../../Markdown/MarkdownPreview";
import * as yup from "yup";

import "./ToolForms.scss";

type FormData = {
  title: string;
  desc?: string;
  due: Date;
  priority: number;
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
  const dispatch = useDispatch();
  const { addTask } = bindActionCreators(actionCreators, dispatch);
  const [creatingTask, setCreatingTask] = useState<boolean>(false);
  const [mdText, setMdText] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    getValues,
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  useEffect(() => {
    setValue("desc", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (new Date(Date.now() + 1000 * 60) <= getValues("due")) {
      setError("due", { type: "min" }, { shouldFocus: true });
    }

    handleSubmit((data: FormData) => {
      createTask(data);
    })(e);
  };

  const toggleModal = () => {
    setModalState(!modalState);
    document.body.classList.toggle("lock-scroll");
  };

  const setDatetime = (value: Date) => {
    setValue("due", value);
  };

  const setPriority = (value: number) => {
    setValue("priority", value);
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
      addTask(data.taskAdd);
      reset();
      toggleModal();
      setMdText("");
    }
    setCreatingTask(false);
  };

  const handleDesc = (text: string) => {
    setValue("desc", text);
    setMdText(text);
  };

  return (
    <>
      <ToolButton toggleModal={toggleModal} icon={faCalendarPlus} />
      <Modal
        modalState={modalState}
        title={title}
        desc={desc}
        toggleModal={toggleModal}
        widthClass="lg-width"
      >
        <form onSubmit={(e) => onSubmit(e)} id="tool-form">
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
              <MarkdownEditor handleDesc={handleDesc} mdText={mdText} />
              <MarkdownPreview desc={mdText} preview />
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
              <DatetimePicker setDatetime={setDatetime} />
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
              <StarsInput setPriority={setPriority} />
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
