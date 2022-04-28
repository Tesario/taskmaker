import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { graphQLFetch } from "../../Helpers";
import { useNavigate } from "react-router-dom";

import "./Button.scss";

interface Props {
  icon: IconProp;
  id: number;
}

const RemoveButton: React.FC<Props> = ({ icon, id }) => {
  const navigate = useNavigate();

  const removeTask = async (id: number) => {
    const query = `
        mutation taskRemove($id: Int!) {
            taskRemove(id: $id) {
                deletedCount
            }
        }`;

    const data = await graphQLFetch(query, { id });

    if (data) {
      alert(`It was deleted ${data.taskRemove.deletedCount} task(s)`);
      navigate("/tasks");
    }
  };

  return (
    <button
      type="button"
      className="btn btn-remove"
      onClick={() => removeTask(id)}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default RemoveButton;
