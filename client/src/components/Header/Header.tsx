import { Link } from "react-router-dom";
import "./Header.css";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/context";

function Header() {
  useEffect(() => {
    let navbar: HTMLElement | null = document.querySelector(".header .navbar");
    let menu_btn: HTMLElement | null = document.querySelector("#menu-btn");

    if (menu_btn != null && navbar != null) {
      menu_btn.onclick = () => {
        navbar!.classList.toggle("active");
      };
    }

    window.onscroll = () => {
      if (navbar != null) navbar.classList.remove("active");
    };
  });

  const { user, logout }: any = useContext(AuthContext);
  return (
    <>
      <section className="header">
        <div className="flex">
          <Link to={"/"} className="logo">
            Hotelingo
          </Link>
          <a href="#availability" className="btn">
            Kullanılabirliği kontrol et
          </a>
          <div id="menu-btn" className="fas fa-bars"></div>
        </div>
        {user && (
          <div className="text-[#dcc69c] text-3xl mt-8">
            Hoşgeldin, {user.username}.
          </div>
        )}
        <nav className="navbar">
          <Link to={"/"}>Anasayfa</Link>
          <div>Hakkında</div>
          <div>Rezervasyon</div>
          <div>Galeri</div>
          <div>İncelemeler</div>
          {user ? (
            <div onClick={logout}>Çıkış Yap</div>
          ) : (
            <Link to={"/login"}>Giriş Yap</Link>
          )}
          {}
        </nav>
      </section>
    </>
  );
}

export default Header;
