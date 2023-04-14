import React, { useContext } from "react";
import AuthContext from "src/context/context";
import { Navigate, Outlet } from "react-router-dom";

const AuthProtect = () => {
  let { user }: any = useContext(AuthContext);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default AuthProtect;
