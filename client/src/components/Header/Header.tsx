import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import "../../assets/js/header";
import AuthContext from "../../context/context";

function Header() {
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
