import React, { useState } from "react";
import { graphQLFetch } from "../../../../Helpers";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../state";
import { bindActionCreators } from "@reduxjs/toolkit";
import Modal from "../../../Modal/Modal";
import ToolButton from "./ToolButton/ToolButton";
import { useForm } from "react-hook-form";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Task } from "../../TaskList/TaskList";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFilter, useUpdateFilter } from "../../../../FilterProvider";
import * as yup from "yup";

import "./ToolForms.scss";

type FormData = {
  filter: string;
  order: number;
};

export interface Props {
  title: string;
  desc?: string;
}

const schema = yup.object({
  filter: yup.string(),
  order: yup.number(),
});

const FormFilter: React.FC<Props> = ({ title, desc }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { setTasks } = bindActionCreators(actionCreators, dispatch);
  const filterContext = useFilter();
  const FilterUpdateContext = useUpdateFilter();

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (filter: FormData) => {
    FilterUpdateContext(filter);

    const query = `mutation taskFilter($filter: Filter!) {
      taskFilter(filter: $filter) {
        id
        title
        desc
        status
        created
        due
        priority
      }
    }
    `;

    const data: { taskFilter: Task[] } = await graphQLFetch(query, {
      filter,
    });

    if (data) {
      setTasks(data.taskFilter);
      reset();
      toggleModal();
    }
  });

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
    <>
      <ToolButton toggleModal={toggleModal} icon={faFilter} />
      <Modal
        modalState={modalState}
        title={title}
        desc={desc}
        toggleModal={toggleModal}
      >
        <form onSubmit={onSubmit} id="tool-form">
          <div className="form-body form-flex">
            <div className="form-group">
              <div className="form-radio">
                <input
                  type="radio"
                  id="due"
                  value="due"
                  {...register("filter")}
                  defaultChecked={filterContext.filter === "due" ? true : false}
                />
                <label htmlFor="due">Deadline</label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  id="created"
                  value="created"
                  {...register("filter")}
                  defaultChecked={
                    filterContext.filter === "created" ? true : false
                  }
                />
                <label htmlFor="created">Created date</label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  id="title"
                  value="title"
                  {...register("filter")}
                  defaultChecked={
                    filterContext.filter === "title" ? true : false
                  }
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  id="priority"
                  value="priority"
                  {...register("filter")}
                  defaultChecked={
                    filterContext.filter === "priority" ? true : false
                  }
                />
                <label htmlFor="priority">Priority</label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-radio">
                <input
                  type="radio"
                  id="ascending"
                  value="1"
                  {...register("order")}
                  defaultChecked={filterContext.order === 1 ? true : false}
                />
                <label htmlFor="ascending">Ascending</label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  id="descending"
                  value="-1"
                  {...register("order")}
                  defaultChecked={filterContext.order === -1 ? true : false}
                />
                <label htmlFor="descending">Descending</label>
              </div>
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
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Apply Filter
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FormFilter;
