import React, { useEffect } from "react";
import { graphQLFetch } from "@/Helpers";
import { useTheme } from "@/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Loader from "@/components/Loader/Loader";

import "./CategoryList.scss";
import { setCategories } from "@/state/categories/categoriesSlice";

const CategoryList = () => {
  const themeContext = useTheme();
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
    <div id="category-list" className={themeContext}>
      <div className="title">Category list</div>
      {categories.loading ? (
        <Loader />
      ) : categories.categories.length ? (
        categories.categories.map((category) => (
          <div className="category" key={category.uuid}>
            {category.name}
          </div>
        ))
      ) : (
        <div className="empty">There are no categoires yet.</div>
      )}
    </div>
  );
};

export default CategoryList;
