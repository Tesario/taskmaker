import React, { useState } from "react";
//import { graphQLFetch } from "../../../../Helpers";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../state";
import { bindActionCreators } from "@reduxjs/toolkit";
import Modal from "../../../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import "./ToolButton.scss";

// interface Task {
//   title: string;
// }

export interface Props {
  title: string;
  desc?: String;
}

const ToolButton: React.FC<Props & { icon: IconDefinition }> = ({
  children,
  title,
  desc,
  icon,
}) => {
  const [modalState, setModalState] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const { ToolButton } = bindActionCreators(actionCreators, dispatch);

  // const createTask = async (task: object) => {
  //   setModalState(true);
  //   const query = `mutation taskAdd($task: TaskInputs!) {
  //     taskAdd(task: $task) {
  //       id
  //       title
  //       status
  //     }
  //   }`;

  //   const data: { taskAdd: Task } = await graphQLFetch(query, { task });

  //   if (data) {
  //     ToolButton(data.taskAdd);
  //   }
  // };

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
    <>
      <button
        type="submit"
        id="tool-button"
        className="btn btn-tool"
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
      <Modal
        modalState={modalState}
        title={title}
        desc={desc}
        toggleModal={toggleModal}
      >
        {children}
      </Modal>
    </>
  );
};

export default ToolButton;
