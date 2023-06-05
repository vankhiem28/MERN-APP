import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup
  .object({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("email must be a valid email").required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
  })
  .required();

function RegisterForm() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const authData = useContext(AuthContext);
  const { RegisterUser } = authData;

  const onSubmit = async (data) => {
    const res = await RegisterUser(data);

    if (res?.success) {
      navigate("/login");
    }

    if (!res?.response?.data?.success) {
      toast.error(res?.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} type="text" name="name" placeholder="Your name" />
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
        You have an account?
        <Link to={"/login"} className="pl-1 text-blue-600">
          Login
        </Link>
      </div>
      <Button>Sign up</Button>
    </form>
  );
}

export default RegisterForm;
