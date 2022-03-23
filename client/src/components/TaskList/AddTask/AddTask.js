import React, { useState, useRef } from "react";

import "./AddTask.scss";

const AddTask = ({ createTask }) => {
  const [title, setTitle] = useState("");
  const titleInputRef = useRef();

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form
      id="add-task"
      onSubmit={(e) => {
        e.preventDefault();
        titleInputRef.current.focus();

        if (!title) {
          titleInputRef.current.classList.add("is-invalid");
          return;
        }

        setTitle("");
        createTask({ title });
        titleInputRef.current.classList.remove("is-invalid");
      }}
    >
      <input
        type="text"
        placeholder="Title..."
        value={title}
        ref={titleInputRef}
        onChange={changeTitle}
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

export default AddTask;
