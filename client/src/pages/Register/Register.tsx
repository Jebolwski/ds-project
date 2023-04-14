import React from "react";
import { useContext, useState } from "react";
import AuthContext from "src/context/context";
import { Link } from "react-router-dom";

function Register() {
  let { responseGoogle, login }: any = useContext(AuthContext);

  const [username, setUsername]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [passwordConfirm, setPasswordConfirm]: any = useState("");

  return (
    <section className="flex flex-wrap justify-center lg:justify-between gap-5 items-start mt-10">
      <div className="text-white min-w-[230px]">
        <h2 className="text-[3.3rem]">
          Otel Rezervasyon & <br />
          <span className="text-[3.5rem] text-[#dcc69c]">
            Keyifli Bir Tatil
          </span>
        </h2>
        <p className="leading-10 text-2xl">
          "Sevgili misafirlerimiz, sizlere en iyi hizmeti sunmak için buradayız.
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
        <div>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-user fa-lg"></i>
            <div className="text-[1.6rem] font-semibold">Kullanıcı Adı</div>
          </div>
          <div className="mb-5 grid place-items-center w-full">
            <input
              type="text"
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full p-2 border border-stone-200 rounded-lg duration-200 shadow-md hover:shadow-lg text-xl"
            />
          </div>
          <div className="flex items-center gap-1 mt-8">
            <i className="fa-solid fa-lock fa-lg"></i>
            <div className="text-[1.6rem] font-semibold">Şifre (Yeniden)</div>
          </div>
          <div className="mb-5 grid place-items-center w-full">
            <input
              type="password"
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              className="w-full p-2 border border-stone-200 rounded-lg duration-200 shadow-md hover:shadow-lg text-xl"
            />
          </div>
        </div>
        <button
          className="btn mt-0 hover:bg-[#c3a876] p-1 shadow-md hover:shadow-lg duration-200 rounded-md w-full"
          onClick={() => {
            login(username, password);
          }}
        >
          Kayıt Ol
        </button>
        <div className="flex flex-wrap text-white items-center mt-5 text-xl gap-3">
          Zaten hesabınız var mı?
          <Link
            to={"/login"}
            className="btn mt-0 text-[1.2rem] hover:bg-[#c3a876] p-1 shadow-md hover:shadow-lg duration-200 rounded-md"
          >
            Giriş Yapın
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
