import React from "react";

import "./CategoryBtn.scss";

interface Props {
  title: string;
  active?: boolean;
}

const CategoryBtn: React.FC<Props> = ({ title, active }) => {
  return (
    <button type="button" className={`btn btn-category ${active && "active"}`}>
      {title}
    </button>
  );
};

export default CategoryBtn;
