function Footer() {
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
            <a href="#home">Anasayfa</a>
            <a href="#about">Hakkında</a>
            <a href="#reservation">Rezervasyon</a>
            <a href="#gallery">Galeri</a>
            <a href="#contact">İletişim</a>
            <a href="#reviews">Yorumlar</a>
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
