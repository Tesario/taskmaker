import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./Button.scss";

interface Props {
  icon: IconProp;
  id: number;
}

const EditButton: React.FC<Props> = ({ icon, id }) => {
  return (
    <button type="button" className="btn btn-edit">
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default EditButton;
