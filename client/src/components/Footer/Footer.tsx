import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/context";

function Footer() {
  const { user, logout }: any = useContext(AuthContext);

  return (
    <>
      <section className="footer">
        <div className="box-container">
          <div className="box">
            <a href="tel:2122210202">
              <i className="fas fa-phone"></i> +90 212-221-02-02
            </a>
            <a href="tel:2121100101">
              <i className="fas fa-phone"></i> +90 212-110-01-01
            </a>
            <a href="mailto:shakhanas@gmail.com">
              <i className="fas fa-envelope"></i> shakhanas@gmail.com
            </a>
            <a href="#">
              <i className="fas fa-map-marker-alt"></i> Liman, Akdeniz Blv.,
              07070 Konyaaltı/Antalya
            </a>
          </div>

          <div className="box">
            <Link to={"/"}>Anasayfa</Link>
            {user && (user.is_superuser || user.receptionist) ? (
              <Link to={"/room/all"}>Odalar</Link>
            ) : null}
            {user && (user.is_superuser || user.receptionist) ? (
              <Link to={"/room-category/all"}>Oda Kategorileri</Link>
            ) : null}
            {user && user.is_superuser ? (
              <Link to={"/rezervation/all"}>Rezervasyonlar</Link>
            ) : null}
            {!user ? (
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
              <a onClick={logout}>Çıkış Yap</a>
            ) : (
              <Link to={"/login"}>Giriş Yap</Link>
            )}
          </div>

          <div className="box">
            <a href="#">
              facebook <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              twitter <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              instagram <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
