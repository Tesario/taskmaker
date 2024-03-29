import React from "react";
import { useTheme } from "@/ThemeProvider";
import { categoryI } from "types/category";
import { useUpdateFilter } from "@/FilterProvider";

import "./CategoryBtn.scss";

interface Props {
  category: categoryI;
  active?: boolean;
}

const CategoryBtn: React.FC<Props> = ({ category, active }) => {
  const themeContext = useTheme();
  const FilterUpdateContext = useUpdateFilter();

  const handleChangeCategory = (uuid: string | null) => {
    FilterUpdateContext({ category: uuid });
  };

  return (
    <button
      type="button"
      onClick={() => handleChangeCategory(category.uuid)}
      className={`btn btn-category ${active ? "active" : ""} ${themeContext}`}
    >
      {category.name}
    </button>
  );
};

export default CategoryBtn;
