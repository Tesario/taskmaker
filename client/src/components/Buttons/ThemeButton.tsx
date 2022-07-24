import React from "react";
import { useTheme, useUpdateTheme } from "@/ThemeProvider";

import "./ThemeButton.scss";

const ThemeButton: React.FC = () => {
  const themeContext = useTheme();
  const themeUpdateContext = useUpdateTheme();

  const onChangeTheme = () => {
    themeUpdateContext(themeContext === "light" ? "dark" : "light");
  };

  return (
    <div className="btn-theme">
      <input
        type="checkbox"
        id="hide-checkbox"
        defaultChecked={themeContext === "light"}
        onChange={onChangeTheme}
      />
      <label htmlFor="hide-checkbox" className="toggle">
        <span className="toggle-button">
          <span className="crater crater-1"></span>
          <span className="crater crater-2"></span>
          <span className="crater crater-3"></span>
          <span className="crater crater-4"></span>
          <span className="crater crater-5"></span>
          <span className="crater crater-6"></span>
          <span className="crater crater-7"></span>
        </span>
        <span className="star star-1"></span>
        <span className="star star-2"></span>
        <span className="star star-3"></span>
        <span className="star star-4"></span>
        <span className="star star-5"></span>
        <span className="star star-6"></span>
        <span className="star star-7"></span>
        <span className="star star-8"></span>
      </label>
    </div>
  );
};

export default ThemeButton;
