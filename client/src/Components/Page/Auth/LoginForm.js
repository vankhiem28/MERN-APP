import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "./Input";
import Button from "./Button";
import { AuthContext } from "../../../contexts/AuthContext";

const schema = yup
  .object({
    email: yup.string().email("email must be a valid email").required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
  })
  .required();

function LoginForm() {
  const authData = useContext(AuthContext);

  const { LoginUser } = authData;

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const res = await LoginUser(data);
    // error
    if (!res?.response?.data?.success) {
      toast.error(res?.response?.data?.error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        type="text"
        name="email"
        placeholder="Your email"
        className={"mt-4"}
      />
      <Input
        control={control}
        type="password"
        name="password"
        placeholder="Your password"
        className={"mt-4"}
      />
      <div className="flex justify-end my-2 text-white text-sm">
        You don't have an account?
        <Link to={"/register"} className="pl-1 text-blue-600">
          Sign up
        </Link>
      </div>
      <Button>Log In</Button>
    </form>
  );
}

export default LoginForm;
