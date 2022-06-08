import React from "react";
import { graphQLFetch } from "../../../../Helpers";
import ToolButton from "./ToolButton/ToolButton";
import { useForm } from "react-hook-form";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Task } from "../../TaskList/TaskList";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./ToolForms.scss";

type FormData = {
  search: string;
};

const schema = yup.object({
  search: yup.string(),
});

const FormSearchTask: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => createTask(data));

  const createTask = async (search: FormData) => {
    const query = `mutation taskAdd($task: TaskInputs!) {
      taskAdd(task: $task) {
        id
        title
        desc
        created
        due
        priority
      }
    }`;
    const data: { taskAdd: Task } = await graphQLFetch(query, { search });
    if (data) {
      //addTask(data.taskAdd);
      reset();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} id="tool-form" className="search">
        <div className="form-control">
          <input {...register("search")} />
          <ToolButton icon={faSearch} />
        </div>
      </form>
    </>
  );
};

export default FormSearchTask;
