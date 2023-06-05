import React, { useContext } from "react";
import { landing } from "../../../assets/img";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AuthContext } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "../../loading";

function AuthPage({ authRoute }) {
  const { authState } = useContext(AuthContext);

  if (authState.isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="relative h-screen">
      {authState.authLoading ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loading></Loading>
        </div>
      ) : (
        <>
          <img src={landing} className="absolute w-full h-full" alt="landing" />
          <div className="absolute bg-black left-0 right-0 top-0 bottom-0 opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <h1 className="text-4xl text-white font-bold text-center pb-4">
              {authRoute === "login" ? "Login" : "Sign up"}
            </h1>
            {authRoute === "login" && <LoginForm></LoginForm>}
            {authRoute === "register" && <RegisterForm></RegisterForm>}
          </div>
        </>
      )}
    </div>
  );
}

export default AuthPage;
