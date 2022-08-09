import React, { useEffect, useState } from "react";
import CategoryBtn from "@components/Categories/CategoryBtn/CategoryBtn";
import { graphQLFetch } from "@/Helpers";
import { setCategories } from "@/state/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useFilter } from "@/FilterProvider";

import "./CategoryBar.scss";

const CategoryBar: React.FC = () => {
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  const FilterContext = useFilter();

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
      <CategoryBtn
        category={{ name: "All", uuid: null }}
        active={!FilterContext.category ? true : false}
      />
      {categories.categories.map((category) => (
        <CategoryBtn
          category={category}
          key={category.uuid}
          active={FilterContext.category === category.uuid ? true : false}
        />
      ))}
    </div>
  );
};

export default CategoryBar;
