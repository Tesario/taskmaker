import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./EditButton.scss";

interface Props {
  icon: IconProp;
  type: "edit" | "delete";
}

const EditButton: React.FC<Props> = ({ icon, type }) => {
  return (
    <button type="button" className={"btn btn-edit " + type}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default EditButton;
