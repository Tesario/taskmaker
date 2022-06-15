import React from "react";
import { useTheme } from "../../../ThemeProvider";

import "./CategoryBtn.scss";

interface Props {
  title: string;
  active?: boolean;
}

const CategoryBtn: React.FC<Props> = ({ title, active }) => {
  const themeContext = useTheme();

  return (
    <button
      type="button"
      className={`btn btn-category ${active && "active"} ${themeContext}`}
    >
      {title}
    </button>
  );
};

export default CategoryBtn;
