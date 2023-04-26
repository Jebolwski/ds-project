import { useContext } from "react";
import AuthContext from "../../context/context";
import { Navigate, Outlet } from "react-router-dom";

const SuperUserProtect = () => {
  let { user }: any = useContext(AuthContext);

  let flag: boolean = true;
  if (user) {
    if (user.is_superuser) {
      flag = true;
    } else {
      flag = false;
    }
  }

  return flag ? <Outlet /> : <Navigate to="/" />;
};

export default SuperUserProtect;
