import React, { useEffect } from "react";
import { graphQLFetch, notify } from "@/Helpers";
import { useTheme } from "@/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Loader from "@/components/Loader/Loader";
import {
  removeCategory,
  setCategories,
} from "@/state/categories/categoriesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./CategoryList.scss";

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

  const handleRemove = async (uuid: string | null) => {
    if (uuid !== null) {
      const query = `mutation categoryRemove($uuid: String!) {
          categoryRemove(uuid: $uuid) {
            deletedCount
          }
        }`;

      const data = await graphQLFetch(query, { uuid });

      if (data.categoryRemove.deletedCount) {
        dispatch(removeCategory(uuid));
        notify("success", "Category was removed successfully.");
      } else {
        notify("error", "No category was removed.");
      }
    }
  };

  return (
    <div id="category-list" className={themeContext}>
      <div className="title">Category list</div>
      {categories.loading ? (
        <Loader />
      ) : categories.categories.length ? (
        categories.categories.map((category) => (
          <div className="category" key={category.uuid}>
            {category.name}
            <button
              className="btn btn-remove"
              onClick={() => handleRemove(category.uuid)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))
      ) : (
        <div className="empty">There are no categoires yet.</div>
      )}
    </div>
  );
};

export default CategoryList;
