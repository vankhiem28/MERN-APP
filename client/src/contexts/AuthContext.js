import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import authReducer, { initState } from "../reducers/auth/reducer";
import { apiUrl } from "./constants";
import setAuthToken from "../utils/setAuthToken";
import { set_auth } from "../reducers/auth/actions";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initState);

  //Authenticate user
  const loadUser = async () => {
    if (localStorage["auth_token"]) {
      setAuthToken(localStorage["auth_token"]);
    }
    try {
      const res = await axios.get(`${apiUrl}/users/auth`);
      if (res.data.success) {
        dispatch(set_auth({ isAuthenticated: true, authLoading: false, user: res.data.user }));
      }
    } catch (error) {
      localStorage.removeItem("auth_token");
      setAuthToken(null);
      dispatch(set_auth({ isAuthenticated: false, user: null }));
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const LoginUser = async (userData) => {
    try {
      const res = await axios.post(`${apiUrl}/users/login`, userData);
      if (res?.data?.success) {
        localStorage.setItem("auth_token", res.data.token);
      }
      await loadUser();
      return res?.data;
    } catch (error) {
      return error;
    }
  };

  const RegisterUser = async (userData) => {
    try {
      const res = await axios.post(`${apiUrl}/users/register`, userData);
      return res?.data;
    } catch (error) {
      return error;
    }
  };

  const LogoutUser = () => {
    localStorage.removeItem("auth_token");
    setAuthToken(null);
    dispatch(set_auth({ isAuthenticated: false, user: null }));
  };

  const values = { LoginUser, authState, RegisterUser, LogoutUser };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
