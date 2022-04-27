import React, { useEffect } from "react";
import { Props as ParentProps } from "../Tasks/TaskBar/ToolForms/FormCreateTask";

import "./Modal.scss";

interface Props extends ParentProps {
  toggleModal: () => void;
  modalState: boolean;
  widthClass?: "lg-width";
}

const Modal: React.FC<Props> = ({
  children,
  modalState,
  title,
  desc,
  widthClass,
  toggleModal,
}) => {
  useEffect(() => {
    const closeModal = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && modalState) {
        toggleModal();
      }
    };
    document.addEventListener("keydown", closeModal);

    return () => {
      document.removeEventListener("keydown", closeModal);
    };
  });

  return (
    <div id="modal" className={modalState ? "show" : ""}>
      <div className={`modal-dialog ${widthClass}`}>
        <div className="modal-header">
          <div className="subtitle">{title}</div>
          <div className="desc">{desc}</div>
          <button type="button" className="btn" onClick={toggleModal}>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
