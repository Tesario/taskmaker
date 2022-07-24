import React, { useState } from "react";
import Modal from "@components/Modal/Modal";
import ToolButton from "./ToolButton/ToolButton";
import { useForm } from "react-hook-form";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFilter, useUpdateFilter } from "@/FilterProvider";
import * as yup from "yup";
import { useTheme } from "@/ThemeProvider";

import "./ToolForms.scss";

type FormData = {
  filter: string;
  order: number;
  status: ["completed" | "expired" | "uncompleted"];
};

export interface Props {
  title: string;
  desc?: string;
}

const schema = yup.object({
  filter: yup
    .string()
    .required((value) => `The ${value.path} field is required.`),
  order: yup
    .number()
    .required((value) => `The ${value.path} field is required.`),
});

const FormFilter: React.FC<Props> = ({ title, desc }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const filterContext = useFilter();
  const themeContext = useTheme();
  const FilterUpdateContext = useUpdateFilter();
  const [checkboxError, setCheckboxError] = useState<string | null>(null);

  const { register, handleSubmit, reset, getValues } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onBlurStatus = (e: React.FormEvent<HTMLInputElement>) => {
    const currentStatus = e.currentTarget.id;
    const statuses = getValues("status");

    if (statuses.length > 1) {
      setCheckboxError(null);
    } else if (statuses.length === 1 && statuses[0] === currentStatus) {
      setCheckboxError("Choose at least one status.");
      return;
    }

    setCheckboxError(null);
  };

  const onSubmit = handleSubmit(async (filter: FormData) => {
    if (checkboxError) {
      return;
    }

    FilterUpdateContext(filter);
    reset();
    toggleModal();
  });

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
    <>
      <ToolButton onClick={toggleModal} icon={faFilter} />
      <Modal
        modalState={modalState}
        title={title}
        desc={desc}
        toggleModal={toggleModal}
      >
        <form onSubmit={onSubmit} id="tool-form" className={themeContext}>
          <div className="form-body form-grid">
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
            <div className="form-group checkboxes">
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="completed"
                  value="completed"
                  {...register("status")}
                  onChange={onBlurStatus}
                  defaultChecked={filterContext.status.includes("completed")}
                />
                <label htmlFor="completed">Completed</label>
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="expired"
                  value="expired"
                  {...register("status")}
                  onChange={onBlurStatus}
                  defaultChecked={filterContext.status.includes("expired")}
                />
                <label htmlFor="expired">Expired</label>
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="uncompleted"
                  value="uncompleted"
                  {...register("status")}
                  onChange={onBlurStatus}
                  defaultChecked={filterContext.status.includes("uncompleted")}
                />
                <label htmlFor="uncompleted">Uncompleted</label>
              </div>
              <div className={"error-message " + (checkboxError ? "show" : "")}>
                {checkboxError}
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
