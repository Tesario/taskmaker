import React from "react";
import CategoryBtn from "../CategoryBtn/CategoryBtn";

import "./CategoryBar.scss";

const CategoryBar: React.FC = () => {
  return (
    <div id="category-bar">
      <CategoryBtn title="Home" active />
      <CategoryBtn title="Work" />
      <button type="button" className="btn btn-primary btn-edit-categories">
        Edit categories
      </button>
    </div>
  );
};

export default CategoryBar;
