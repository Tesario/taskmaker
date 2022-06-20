import React, { useState, useRef } from "react";
import ToolButton from "./ToolButton/ToolButton";
import { faSearch, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useFilter, useUpdateFilter } from "@/FilterProvider";

import "./ToolForms.scss";

const FormSearchTask: React.FC = () => {
  const filterUpdateContext = useUpdateFilter();
  const filterContext = useFilter();
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchRef.current ? searchRef.current.value : "");
    filterUpdateContext({
      search: searchRef.current ? searchRef.current.value.toLowerCase() : "",
    });
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
