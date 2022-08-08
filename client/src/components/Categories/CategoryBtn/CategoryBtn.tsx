import React from "react";
import { useTheme } from "@/ThemeProvider";
import { categoryI } from "types/category";

import "./CategoryBtn.scss";

interface Props {
  category: categoryI;
  active?: boolean;
}

const CategoryBtn: React.FC<Props> = ({ category, active }) => {
  const themeContext = useTheme();

  return (
    <button
      type="button"
      className={`btn btn-category ${active && "active"} ${themeContext}`}
    >
      {category.name}
    </button>
  );
};

export default CategoryBtn;
