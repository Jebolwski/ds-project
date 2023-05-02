import { useContext } from "react";
import AuthContext from "../../context/context";
import { Navigate, Outlet } from "react-router-dom";
function LoggedIn() {
  let { user }: any = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/" />;
}

export default LoggedIn;
