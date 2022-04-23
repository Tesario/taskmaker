import React, { useState } from "react";
import Modal from "../../../Modal/Modal";
import ToolButton from "./ToolButton/ToolButton";
import { useForm } from "react-hook-form";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { useLayout, useUpdateLayout } from "../../../../LayoutProvider";

import "./ToolForms.scss";

type FormData = {
  columns: 1 | 2;
  type: "cards" | "rows";
};

export interface Props {
  title: string;
  desc?: string;
}

const FormLayout: React.FC<Props> = ({ title, desc }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const layoutContext = useLayout();
  const layoutUpdateContext = useUpdateLayout();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    layoutUpdateContext(data);
    toggleModal();
  });

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
    <>
      <ToolButton toggleModal={toggleModal} icon={faBorderAll} />
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
                  id="column-1"
                  value="1"
                  {...register("columns")}
                  defaultChecked={
                    String(layoutContext.columns) === String(1) ? true : false
                  }
                />
                <label htmlFor="column-1">1 column</label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  id="column-2"
                  value="2"
                  {...register("columns")}
                  defaultChecked={
                    String(layoutContext.columns) === String(2) ? true : false
                  }
                />
                <label htmlFor="column-2">2 columns</label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-radio">
                <input
                  type="radio"
                  id="rows"
                  value="rows"
                  {...register("type")}
                  defaultChecked={layoutContext.type === "rows" ? true : false}
                />
                <label htmlFor="rows">Rows</label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  id="cards"
                  value="cards"
                  {...register("type")}
                  defaultChecked={layoutContext.type === "cards" ? true : false}
                />
                <label htmlFor="cards">Cards</label>
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
              Apply layout
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FormLayout;
