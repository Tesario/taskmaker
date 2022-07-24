import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

import "../Login/Login.scss";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object({
    username: yup
      .string()
      .min(
        8,
        (value) =>
          `The ${value.path} may not be lower than ${value.min} characters.`
      )
      .max(
        100,
        (value) =>
          `The ${value.path} may not be greater than ${value.max} characters.`
      )
      .required((value) => `The ${value.path} field is required.`),
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
      ),
    confirmPassword: yup
      .string()
      .required(`The confirm password field is required.`)
      .min(
        8,

        `The confirm password may not be lower than 8 characters.`
      )
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();

const Register: React.FC = () => {
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
      <h1 className="title">Register</h1>
      <div className="form-control">
        <label>Username</label>
        <input {...register("username")} />
        <div
          className={
            "error-message " + (errors.username?.message ? "show" : "")
          }
        >
          {errors.username?.message}
        </div>
      </div>
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
      <div className="form-control">
        <label>Confirm password</label>
        <input {...register("confirmPassword")} type="password" />
        <div
          className={
            "error-message " + (errors.confirmPassword?.message ? "show" : "")
          }
        >
          {errors.confirmPassword?.message}
        </div>
      </div>
      <div className="buttons">
        <button className="btn btn-primary" type="submit">
          Register
        </button>
        <Link className="btn btn-secondary" to="/login">
          Login
        </Link>
      </div>
    </form>
  );
};

export default Register;
