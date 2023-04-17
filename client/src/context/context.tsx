import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState();
  const [googleDataState, setGoogleDataState] = useState();
  const [key, setKey] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("key")) {
      getUserByKey(localStorage.getItem("key")!);
    }
  }, [key]);

  const getUserByKey = async (key: string) => {
    let response = await fetch("http://127.0.0.1:8000/api/auth/user/", {
      method: "GET",
      headers: {
        Authorization: "Token " + key,
      },
    }).then(async (resp: Response) => {
      let data = await resp.json();
      setUser(data);
    });
  };

  const responseGoogle = async (tokens: any) => {
    let resp: Promise<Response | void> = fetch(
      "http://localhost:8000/api/rest-auth/google/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: tokens.credential,
        }),
      }
    ).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: any = await resp.json();
        setKey(data["key"]);
        getUserByKey(data["key"]);
        localStorage.setItem("key", data["key"]);
        toast.success("Başarıyla giriş yapıldı. 😄");
      }
    });
  };

  const login = (username: string, password: string) => {
    let resp: Promise<Response | void> = fetch(
      "http://127.0.0.1:8000/api/auth/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    ).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: any = await resp.json();
        setKey(data["key"]);
        localStorage.setItem("key", data["key"]);
      }
    });
  };

  const register = (
    username: string,
    email: string,
    password: string,
    password1: string
  ) => {
    let resp: Promise<Response | void> = fetch(
      "http://127.0.0.1:8000/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password1: password,
          password2: password1,
        }),
      }
    ).then(async (resp: Response) => {
      if (resp.status == 200) {
        navigate("/login");
      }
    });
  };

  const logout = async () => {
    let resp = await fetch("http://127.0.0.1:8000/api/auth/logout/", {
      method: "POST",
      headers: {
        Authorization: "Token " + localStorage.getItem("key"),
      },
    }).then(() => {
      setKey(undefined);
      setUser(undefined);
      localStorage.removeItem("key");
      localStorage.removeItem("nkey");
      localStorage.removeItem("profile");
      toast.success("Başarıyla çıkış yapıldı. 🚀");
    });
  };

  let contextData = {
    user: user,
    responseGoogle: responseGoogle,
    logout: logout,
    login: login,
    register: register,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
