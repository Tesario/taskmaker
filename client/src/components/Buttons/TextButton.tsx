import React, { useEffect } from "react";
import { useTheme } from "@/ThemeProvider";

import "./Button.scss";

export interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const TextButton: React.FC<Props> = ({ text, onClick, disabled }) => {
  const themeContext = useTheme();

  return (
    <button
      type="button"
      className={`btn btn-text ${themeContext}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default TextButton;
