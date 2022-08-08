import React from "react";
import CategoryBtn from "@components/Categories/CategoryBtn/CategoryBtn";

import "./CategoryBar.scss";

const CategoryBar: React.FC = () => {
  return (
    <div id="category-bar">
      <CategoryBtn title="All" active />
      <CategoryBtn title="Home" />
      <CategoryBtn title="Work" />
    </div>
  );
};

export default CategoryBar;
