import React, { useState, useRef } from "react";
import ToolButton from "./ToolButton/ToolButton";
import { faSearch, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useFilter } from "@/FilterProvider";
import { useAppDispatch } from "@/hooks";
import { graphQLFetch } from "@/Helpers";
import { setTasks } from "@/state/tasks/tasksSlice";

import "./ToolForms.scss";

const FormSearchTask: React.FC = () => {
  const filterContext = useFilter();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchRef.current ? searchRef.current.value : "");

    const query = `query taskSearch($search: Search!) {
      taskSearch(search: $search) {
        id
        title
        desc
        status
        created
        due
        priority
      }
    }
    `;

    const data = await graphQLFetch(query, {
      search: {
        search: searchRef.current ? searchRef.current.value : "",
        filter: filterContext,
      },
    });

    if (data) {
      dispatch(setTasks(data.taskSearch));
    }
  };

  const clearSearch = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} id="tool-form" className="search">
      <div className="form-control">
        <input
          placeholder="Write something..."
          onChange={(e) => onSubmit(e)}
          ref={searchRef}
        />
        {search ? (
          <ToolButton
            icon={faRemove}
            onClick={clearSearch}
            className="btn-search btn-clear-search"
          />
        ) : (
          <ToolButton icon={faSearch} className="btn-search" />
        )}
      </div>
    </form>
  );
};

export default FormSearchTask;
