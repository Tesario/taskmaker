import React from "react";
import { Props as ParentsProps } from "../Tasks/TaskBar/ToolButton/ToolButton";

import "./Modal.scss";

interface Props extends ParentsProps {
  modalState: Boolean;
  toggleModal: () => void;
}

const Modal: React.FC<Props> = ({
  children,
  modalState,
  title,
  desc,
  toggleModal,
}) => {
  return (
    <div id="modal" className={modalState ? "show" : ""}>
      <div className="modal-dialog">
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
