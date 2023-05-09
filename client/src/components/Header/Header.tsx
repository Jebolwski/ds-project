import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/context";

function Header() {
  const location = useLocation();

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
        <div className="flex h-[48px]">
          <Link to={"/"} className="logo">
            Hotelingo
          </Link>
          {location.pathname == "/" ? (
            <a href="#availability" className="btn">
              Kullanılabirliği kontrol et
            </a>
          ) : null}
          <div id="menu-btn" className="fas fa-bars"></div>
        </div>
        {user && (
          <div className="text-[#dcc69c] text-3xl mt-8">
            Hoşgeldin, {user.username}.
          </div>
        )}
        <nav className="navbar lg:text-3xl text-base">
          {user && (user.is_superuser || user.receptionist) ? (
            <Link to={"/room/all"}>Odalar</Link>
          ) : null}
          {user && (user.is_superuser || user.receptionist) ? (
            <Link to={"/room-category/all"}>Oda Kategorileri</Link>
          ) : null}
          {user && user.is_superuser ? (
            <Link to={"/rezervation/all"}>Rezervasyonlar</Link>
          ) : null}
          {!user || (user && !user.is_superuser) ? (
            <Link to={"/questions"}>Sıkça Sorulan Sorular</Link>
          ) : null}
          {user && (user.is_superuser || user.receptionist) ? (
            <Link to={"/message/all"}>Mesajlar</Link>
          ) : null}
          {user && (user.is_superuser || user.receptionist) ? (
            <Link to={"/rezervation/add/select"}>Rezerve Et</Link>
          ) : null}
          {user ? <Link to={"/rezervation/my"}>Rezervasyonlarım</Link> : null}
          {user ? (
            <div onClick={logout}>Çıkış Yap</div>
          ) : (
            <Link to={"/login"}>Giriş Yap</Link>
          )}
        </nav>
      </section>
    </>
  );
}

export default Header;
