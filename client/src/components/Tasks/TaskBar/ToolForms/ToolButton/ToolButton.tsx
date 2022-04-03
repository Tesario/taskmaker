import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import "./ToolButton.scss";

export interface Props {
  toggleModal: () => void;
  icon: IconDefinition;
}

const ToolButton: React.FC<Props> = ({ icon, toggleModal }) => {
  return (
    <button
      type="submit"
      id="tool-button"
      className="btn btn-tool"
      onClick={toggleModal}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ToolButton;
