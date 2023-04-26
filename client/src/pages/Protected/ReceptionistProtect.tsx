import { useContext } from "react";
import AuthContext from "../../context/context";
import { Navigate, Outlet } from "react-router-dom";

const ReceptionistProtect = () => {
  let { user }: any = useContext(AuthContext);
  let flag: boolean = true;
  if (user) {
    if (user.receptionist) {
      flag = true;
    } else {
      flag = false;
    }
  }

  return !flag ? <Navigate to="/" /> : <Outlet />;
};

export default ReceptionistProtect;
