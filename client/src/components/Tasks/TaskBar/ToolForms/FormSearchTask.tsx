import React, { useState } from "react";
import { graphQLFetch } from "../../../../Helpers";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../state";
import { bindActionCreators } from "@reduxjs/toolkit";
import Modal from "../../../Modal/Modal";
import ToolButton from "./ToolButton/ToolButton";
import { useForm } from "react-hook-form";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Task } from "../../TaskList/TaskList";

import "./ToolForms.scss";

type FormData = {
  search: string;
};

export interface Props {
  title: string;
  desc?: string;
}

const FormSearchTask: React.FC<Props> = ({ title, desc }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { addTask } = bindActionCreators(actionCreators, dispatch);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => createTask(data));

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const createTask = async (task: FormData) => {
    const query = `mutation taskAdd($task: TaskInputs!) {
      taskAdd(task: $task) {
        id
        title
        desc
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
    }
  };

  return (
    <>
      <ToolButton toggleModal={toggleModal} icon={faSearch} />
      <Modal
        modalState={modalState}
        title={title}
        desc={desc}
        toggleModal={toggleModal}
      >
        <form onSubmit={onSubmit} id="tool-form">
          <div className="form-body">
            <div className="form-control">
              <label>Search</label>
              <input {...register("search")} />
            </div>
          </div>
          <div className="form-footer wave-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Search task
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FormSearchTask;
