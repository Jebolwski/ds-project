function Footer() {
  return (
    <>
      <section className="footer">
        <div className="box-container">
          <div className="box">
            <a href="tel:1234567890">
              <i className="fas fa-phone"></i> +123-456-7890
            </a>
            <a href="tel:1112223333">
              <i className="fas fa-phone"></i> +111-222-3333
            </a>
            <a href="mailto:shakhanas@gmail.com">
              <i className="fas fa-envelope"></i> shakhanas@gmail.com
            </a>
            <a href="#">
              <i className="fas fa-map-marker-alt"></i> mumbai, india - 400104
            </a>
          </div>

          <div className="box">
            <a href="#home">home</a>
            <a href="#about">about</a>
            <a href="#reservation">reservation</a>
            <a href="#gallery">gallery</a>
            <a href="#contact">contact</a>
            <a href="#reviews">reviews</a>
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
            <a href="#">
              linkedin <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="credit">
          &copy; copyright @ 2022 by mr. web designer | all rights reseved!
        </div>
      </section>
    </>
  );
}

export default Footer;
