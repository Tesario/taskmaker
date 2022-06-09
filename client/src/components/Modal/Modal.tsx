import React, { useEffect } from "react";
import { useTheme } from "../../ThemeProvider";
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
  const themeContext = useTheme();

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
    <div id="modal" className={themeContext + (modalState ? " show" : "")}>
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
