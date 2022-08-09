import React, { useRef } from "react";
import ToolButton from "./ToolButton/ToolButton";
import { faSearch, faRemove } from "@fortawesome/free-solid-svg-icons";

import "./ToolForms.scss";

interface PropsI {
  search: string;
  handleSearch: any;
}

const FormSearchTask: React.FC<PropsI> = ({ handleSearch, search }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchRef.current ? searchRef.current.value : "");
  };

  const clearSearch = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
      handleSearch("");
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
