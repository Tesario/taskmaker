import React, { useState, useRef } from "react";

import "./AddTask.scss";

interface Props {
  createTask: (task: Task) => Promise<void>;
}

interface Task {
  title: string;
}

const AddTask: React.FC<Props> = ({ createTask }) => {
  const [title, setTitle] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form
      id="add-task"
      onSubmit={(e) => {
        e.preventDefault();

        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
        setTitle("");
        createTask({ title });
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
