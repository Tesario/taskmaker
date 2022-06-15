import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useTheme } from "../../../../../ThemeProvider";

import "./ToolButton.scss";

export interface Props {
  icon: IconDefinition;
  onClick?: () => void;
  className?: string;
}

const ToolButton: React.FC<Props> = ({ icon, onClick, className }) => {
  const themeContext = useTheme();

  return (
    <button
      type="submit"
      className={`btn tool-button ${
        className ? className : ""
      } ${themeContext}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ToolButton;
