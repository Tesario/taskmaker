import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { graphQLFetch, notify } from "@/Helpers";
import { addCategory } from "@/state/categories/categoriesSlice";
import { useAppDispatch } from "@/hooks";

import "./CategoryForm.scss";

type FormData = {
  name: string;
};

const schema = yup
  .object({
    name: yup
      .string()
      .required((value) => `The ${value.path} field is required.`)
      .min(
        3,
        (value) => `The ${value.path} must be at least ${value.min} characters.`
      )
      .max(
        200,
        (value) =>
          `The ${value.path} may not be greater than ${value.max} characters.`
      ),
  })
  .required();

const CategoryForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const dispatch = useAppDispatch();
  const [creatingCategory, setCreatingCategory] = useState<boolean>(false);

  const onSubmit = async (category: FormData) => {
    setCreatingCategory(true);
    const query = `mutation categoryAdd($category: CategoryInputs!) {
        categoryAdd(category: $category) {
          name
          uuid
        }
      }`;

    const data = await graphQLFetch(query, {
      category,
    });

    if (data) {
      dispatch(addCategory(data.categoryAdd));
      notify("success", "Task was added successfully.");
    }

    setCreatingCategory(false);
  };

  return (
    <form id="category-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Add category</div>
      <div className="form-control">
        <label>Name</label>
        <input {...register("name")} />
        <div
          className={"error-message " + (errors.name?.message ? "show" : "")}
        >
          {errors.name?.message}
        </div>
      </div>
      <button
        type="submit"
        disabled={creatingCategory}
        className="btn btn-primary"
      >
        Add category
      </button>
    </form>
  );
};

export default CategoryForm;
