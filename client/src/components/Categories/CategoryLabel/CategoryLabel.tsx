import React from "react";
import { categoryI } from "types/category";
import { useUpdateFilter } from "@/FilterProvider";
import { useNavigate } from "react-router-dom";

import "./CategoryLabel.scss";

interface Props {
  category: categoryI;
  className?: "smaller";
}

const CategoryLabel: React.FC<Props> = ({ category, className }) => {
  const FilterUpdateContext = useUpdateFilter();
  const navigate = useNavigate();

  const handleChangeCategory = (uuid: string | null) => {
    FilterUpdateContext({ category: uuid });
    navigate("/tasks");
  };

  return (
    <button
      className={`category-label btn btn-primary ${className ? className : ""}`}
      onClick={() => handleChangeCategory(category?.uuid)}
    >
      {category.name}
    </button>
  );
};

export default CategoryLabel;
