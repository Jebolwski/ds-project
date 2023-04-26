import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useContext, useState } from "react";
import AuthContext from "src/context/context";

function Login() {
  let { responseGoogle, login }: any = useContext(AuthContext);

  const [username, setUsername]: any = useState("");
  const [password, setPassword]: any = useState("");

  return (
    <>
      <section className="flex flex-wrap justify-center lg:justify-between gap-5 items-start mt-10">
        <div className="text-white min-w-[230px]">
          <h2 className="text-[3.3rem]">
            Otel Rezervasyon & <br />
            <span className="text-[3.5rem] text-[#dcc69c]">
              Keyifli Bir Tatil
            </span>
          </h2>
          <p className="leading-10 text-2xl">
            "Sevgili misafirlerimiz, sizlere en iyi hizmeti sunmak için
            buradayız.
            <br />
            Konforlu odalarımız, lezzetli yemeklerimiz ve profesyonel
            personelimizle,
            <br />
            konaklamanız boyunca size unutulmaz bir deneyim yaşatmak için
            çalışıyoruz.
            <br />
            "Konforunuz bizim önceliğimizdir - Unutulmaz bir konaklama deneyimi
            için bizi tercih edin!"
          </p>
        </div>

        <div className="bg-[#dcc69c] rounded-xl p-5 shadow-md hover:shadow-lg duration-200 lg:w-1/3 md:w-4/5 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(username, password);
            }}
          >
            <div>
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-user fa-lg"></i>
                <div className="text-[1.6rem] font-semibold">Kullanıcı Adı</div>
              </div>
              <div className="mb-5 grid place-items-center w-full">
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="w-full p-2 border border-stone-200 rounded-lg duration-200 shadow-md hover:shadow-lg text-xl"
                />
              </div>
              <div className="flex items-center gap-1 mt-8">
                <i className="fa-solid fa-lock fa-lg"></i>
                <div className="text-[1.6rem] font-semibold">Şifre</div>
              </div>
              <div className="mb-5 grid place-items-center w-full">
                <input
                  type="password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full p-2 border border-stone-200 rounded-lg duration-200 shadow-md hover:shadow-lg text-xl"
                />
              </div>
            </div>
            <button className="btn mt-0 hover:bg-[#c3a876] p-1 shadow-md hover:shadow-lg duration-200 rounded-md w-full">
              Giriş
            </button>
          </form>

          <div className="flex flex-wrap text-white items-center mt-5 text-xl gap-3">
            Hesabınız yok mu?
            <Link
              to={"/register"}
              className="btn mt-0 text-[1.2rem] hover:bg-[#c3a876] p-1 shadow-md hover:shadow-lg duration-200 rounded-md"
            >
              Kayıt Olun
            </Link>
          </div>
          <div className="flex items-center text-lg mt-1 mb-2">
            <p className="bg-[#2b1103] h-[2px] w-full"></p>
            <div className="w-32 text-center">ya da</div>
            <p className="bg-[#2b1103] h-[2px] w-full"></p>
          </div>
          <div className="grid place-content-center">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
