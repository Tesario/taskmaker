import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./Login.scss";
import { Link } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email((value) => `The ${value.path} is not valid.`)
      .required((value) => `The ${value.path} field is required.`),
    password: yup
      .string()
      .min(
        8,
        (value) =>
          `The ${value.path} may not be lower than ${value.min} characters.`
      )
      .required((value) => `The ${value.path} field is required.`),
  })
  .required();

const Login: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form id="login" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="title">Login</h1>
      <div className="form-control">
        <label>E-mail</label>
        <input {...register("email")} />
        <div
          className={"error-message " + (errors.email?.message ? "show" : "")}
        >
          {errors.email?.message}
        </div>
      </div>
      <div className="form-control">
        <label>Password</label>
        <input {...register("password")} type="password" />
        <div
          className={
            "error-message " + (errors.password?.message ? "show" : "")
          }
        >
          {errors.password?.message}
        </div>
      </div>
      <div className="buttons">
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <Link className="btn btn-secondary" to="/register">
          Register
        </Link>
      </div>
    </form>
  );
};

export default Login;
