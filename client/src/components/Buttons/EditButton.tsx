import React, { useState, useEffect } from "react";
import Modal from "@components/Modal/Modal";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useTheme } from "@/ThemeProvider";
import { graphQLFetch } from "@/Helpers";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StarsInput from "@components/StarsInput/StarsInput";
import MarkdownPreview from "@/Markdown/MarkdownPreview";
import MarkdownEditor from "@/Markdown/MarkdownEditor";
import DatetimePicker from "@components/DatetimePicker/DatetimePicker";
import { Task } from "@components/Tasks/TaskList/TaskList";
import { updateTask } from "@/state/tasks/tasksSlice";
import { notify } from "@/Helpers";
import { setCategories } from "@/state/categories/categoriesSlice";

import "./Button.scss";

interface Props {
  icon: IconProp;
  task: Task;
  handleTask?: (task: Task) => void;
}

type FormData = {
  title: string;
  desc?: string;
  due: Date;
  priority: number;
  categoryUuid: string;
};

export type handleValueFunc = (
  name: "title" | "desc" | "due" | "priority" | "categoryUuid",
  value: any
) => void;

const schema = yup
  .object({
    title: yup
      .string()
      .required((value) => `The ${value.path} field is required.`)
      .min(
        3,
        (value) => `The ${value.path} must be at least ${value.min} characters.`
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

const EditButton: React.FC<Props> = ({ icon, task, handleTask }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [creatingTask, setCreatingTask] = useState<boolean>(false);
  const [state, setState] = useState<Task>(task);
  const categories = useAppSelector((state) => state.categories);
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
    handleValue("desc", task.desc);

    const fetchCategories = async () => {
      const query = `query {
        categoryList {
          name
          uuid
        }
      }`;

      const data = await graphQLFetch(query);

      if (data) {
        dispatch(setCategories(data.categoryList));
        setValue("categoryUuid", task.category?.uuid || "");
      }
    };

    if (categories.loading) {
      fetchCategories();
      return;
    }

    setValue("categoryUuid", task.category?.uuid || "");
  }, [task]);

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
          completed
          category {
            name
            uuid
          }
        }
      }
    }`;

    const data = await graphQLFetch(query, {
      id: state.id,
      task: { ...task, due: new Date(task.due) },
    });

    if (data.taskUpdate.modifiedCount) {
      dispatch(updateTask(data.taskUpdate.task));
      notify("success", "Task was edited successfully.");

      if (handleTask) {
        handleTask(data.taskUpdate.task);
      }
    } else {
      notify("error", "No task was edited.");
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
            <div className="form-select">
              <label>Category</label>
              <select {...register("categoryUuid")}>
                <option value="">-</option>
                {!categories.loading
                  ? categories.categories.map((category) => {
                      if (category.uuid) {
                        return (
                          <option
                            key={category.uuid}
                            value={category.uuid || ""}
                          >
                            {category.name}
                          </option>
                        );
                      }
                    })
                  : null}
              </select>
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
