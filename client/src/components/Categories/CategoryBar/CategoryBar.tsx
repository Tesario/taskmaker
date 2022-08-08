import React, { useEffect } from "react";
import CategoryBtn from "@components/Categories/CategoryBtn/CategoryBtn";
import { graphQLFetch } from "@/Helpers";
import { setCategories } from "@/state/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";

import "./CategoryBar.scss";

const CategoryBar: React.FC = () => {
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `query {
          categoryList {
            name
            uuid
          }
        }`;

      const data = await graphQLFetch(query);

      if (data) {
        dispatch(setCategories(data.categoryList));
      }
    };

    fetchCategories();
  }, []);

  return (
    <div id="category-bar">
      <CategoryBtn category={{ name: "All" }} active />
      {categories.categories.map((category) => (
        <CategoryBtn category={category} key={category.uuid} />
      ))}
    </div>
  );
};

export default CategoryBar;
