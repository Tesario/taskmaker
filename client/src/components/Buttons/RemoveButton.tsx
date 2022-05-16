import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { graphQLFetch } from "../../Helpers";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

import "./Button.scss";

interface Props {
  icon: IconProp;
  id: number;
}

const RemoveButton: React.FC<Props> = ({ icon, id }) => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<boolean>(false);
  const [creatingTask, setCreatingTask] = useState<boolean>(false);

  useEffect(() => {
    return () => setCreatingTask(false);
  });

  const removeTask = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setCreatingTask(true);
    const query = `
        mutation taskRemove($id: Int!) {
            taskRemove(id: $id) {
                deletedCount
            }
        }`;

    const data = await graphQLFetch(query, { id });

    if (data) {
      navigate("/tasks");
    }
    setCreatingTask(false);
  };

  const toggleModal = () => {
    setModalState(!modalState);
    document.body.classList.toggle("lock-scroll");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-remove"
        onClick={() => toggleModal()}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
      <Modal
        title="Removing task"
        toggleModal={toggleModal}
        desc="Do you want to remove the task?"
        modalState={modalState}
      >
        <form onSubmit={(e) => removeTask(e, id)} id="tool-form">
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
              disabled={creatingTask}
              className="btn btn-primary"
            >
              Remove task
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default RemoveButton;
