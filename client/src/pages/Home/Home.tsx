import AuthContext from "../../context/context";
import "src/pages/Home/Home.css";
import { useContext, useEffect } from "react";
import { Navigation, Pagination, EffectCards } from "swiper";
import Home1 from "../../assets/images/home-img-1.jpg";
import Home2 from "../../assets/images/home-img-2.jpg";
import Home3 from "../../assets/images/home-img-3.jpg";
import Pic1 from "../../assets/images/pic-1.png";
import Pic3 from "../../assets/images/pic-3.png";
import Pic4 from "../../assets/images/pic-4.png";
import Pic5 from "../../assets/images/pic-5.png";
import Pic6 from "../../assets/images/pic-6.png";
import About1 from "../../assets/images/about-img-1.jpg";
import About2 from "../../assets/images/about-img-2.jpg";
import About3 from "../../assets/images/about-img-3.jpg";
import Icon1 from "../../assets/images/icon-1.png";
import Icon2 from "../../assets/images/icon-2.png";
import Icon3 from "../../assets/images/icon-3.png";
import Icon4 from "../../assets/images/icon-4.png";
import Icon5 from "../../assets/images/icon-5.png";
import Icon6 from "../../assets/images/icon-6.png";
import Galery1 from "../../assets/images/gallery-img-1.jpg";
import Galery2 from "../../assets/images/gallery-img-2.webp";
import Galery3 from "../../assets/images/gallery-img-3.webp";
import Galery4 from "../../assets/images/gallery-img-4.webp";
import Galery5 from "../../assets/images/gallery-img-5.webp";
import Galery6 from "../../assets/images/gallery-img-6.webp";
import { Swiper, SwiperSlide } from "swiper/react";

function Home() {
  useEffect(() => {
    let box = document.querySelectorAll(".contact .row .faq .box");
    if (box.length > 0) {
      box.forEach((faqBox: any) => {
        faqBox.onclick = () => {
          faqBox.classList.toggle("active");
        };
      });
    }
  });
  return (
    <>
      <section className="home" id="home">
        <Swiper
          spaceBetween={20}
          modules={[Navigation]}
          slidesPerView={1}
          navigation={true}
          loop={true}
        >
          <SwiperSlide>
            <div className="h-[60vh] overflow-hidden">
              <img src={Home1} className="w-full" />
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-[#DCC69C] text-[2.4rem] font-semibold">
                Lüks Odalar
              </h3>
              <a href="#availability" className="btn">
                Kullanılabirliği kontrol et
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[60vh] overflow-hidden">
              <img src={Home2} className="w-full" />
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-[#DCC69C] text-[2.4rem] font-semibold">
                Foods And Drinks
              </h3>
              <a href="#reservation" className="btn">
                Make A Reservation
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[60vh] overflow-hidden">
              <img src={Home3} className="w-full" />
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-[#DCC69C] text-[2.4rem] font-semibold">
                Luxurious Halls
              </h3>
              <a href="#contact" className="btn">
                contact Us
              </a>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="availability" id="availability">
        <form action="" method="post">
          <div className="flex">
            <div className="box">
              <p>
                Rezervasyon Giriş <span>*</span>
              </p>
              <input type="date" name="check_in" className="input" required />
            </div>
            <div className="box">
              <p>
                Rezervasyon Çıkış <span>*</span>
              </p>
              <input type="date" name="check_out" className="input" required />
            </div>
            <div className="box">
              <p>
                Yetişkin sayısı <span>*</span>
              </p>
              <select
                name="Yetişkin sayısı"
                className="input h-[50px]"
                required
              >
                <option value="1">1 Yetişkin </option>
                <option value="2">2 Yetişkin</option>
                <option value="3">3 Yetişkin</option>
                <option value="4">4 Yetişkin</option>
                <option value="5">5 Yetişkin</option>
                <option value="6">6 Yetişkin</option>
              </select>
            </div>
            <div className="box">
              <p>
                Çocuk Sayısı <span>*</span>
              </p>
              <select name="Çocuk Sayısı" className="input h-[50px]" required>
                <option value="-">0 Çocuk</option>
                <option value="1">1 Çocuk</option>
                <option value="2">2 Çocuk</option>
                <option value="3">3 Çocuk</option>
                <option value="4">4 Çocuk</option>
                <option value="5">5 Çocuk</option>
                <option value="6">6 Çocuk</option>
              </select>
            </div>
            <div className="box">
              <p>
                Oda Sayısı <span>*</span>
              </p>
              <select name="Oda Sayısı" className="input h-[50px]" required>
                <option value="1">1 Oda </option>
                <option value="2">2 Oda</option>
                <option value="3">3 Oda</option>
                <option value="4">4 Oda</option>
                <option value="5">5 Oda</option>
                <option value="6">6 Oda</option>
              </select>
            </div>
          </div>
          <input
            type="submit"
            value="Kullanılabirliği kontrol et"
            name="check"
            className="btn"
          />
        </form>
      </section>

      <section className="about" id="about">
        <div className="row flex justify-center">
          <div className="image">
            <img src={About1} />
          </div>
          <div className="content col">
            <h3>Uzman Kadro</h3>
            <p>Güler yüzlü ve tecrübeli kadromuz her daim hizmetinizde.</p>
            <a href="#reservation" className="btn">
              Rezervasyon
            </a>
          </div>
        </div>

        <div className="row revers flex justify-center">
          <div className="image">
            <img src={About2} />
          </div>
          <div className="content">
            <h3>Lezzetli Yemekler </h3>
            <p>
              Ünlü şeflerimizin hazırladığı Türk ve Dünya mutfaklarından eşsiz
              menüleri deneyimleyin.
            </p>
            <a href="#contact" className="btn">
              İletişime Geçin
            </a>
          </div>
        </div>

        <div className="row flex justify-center">
          <div className="image">
            <img src={About3} alt="" />
          </div>
          <div className="content">
            <h3>Yüzme Havuzu</h3>
            <p>
              Açık, kapalı ve çocuk havuzlarımızla eğlenceyi doruklarda yaşayın.
            </p>
            <a href="#availability" className="btn">
              Uygun Tarihler
            </a>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="box-container">
          <div className="box">
            <img src={Icon1} alt="" />
            <h3>Yemek & İçecek</h3>
            <p>
              Türk ve Dünya mutfaklarından kahvaltı, öğle ve akşam yemekleri
            </p>
          </div>

          <div className="box">
            <img src={Icon2} alt="" />
            <h3>Açık Havada Yemek</h3>
            <p>Deniz manzarası eşliğinde akşam yemeği fırsatı</p>
          </div>

          <div className="box">
            <img src={Icon3} alt="" />
            <h3>Deniz Manzarası</h3>
            <p>Her odadan görünen eşsiz deniz manzarası</p>
          </div>

          <div className="box">
            <img src={Icon4} alt="" />
            <h3>Dekorasyon</h3>
            <p>Özel olarak dekore edilmiş odalar</p>
          </div>

          <div className="box">
            <img src={Icon5} alt="" />
            <h3>Yüzme Havuzu</h3>
            <p>Açık, kapalı ve çocuk havuzları</p>
          </div>

          <div className="box">
            <img src={Icon6} alt="" />
            <h3>Plaj</h3>
            <p>Tertemiz deniz ve eşine az rastlanan kumsallar</p>
          </div>
        </div>
      </section>

      <section className="reservation" id="reservation">
        <form action="" method="post">
          <h3>rezervasyon Yaptır</h3>
          <div className="flex">
            <div className="box">
              <p>
                giriş tarihi <span>*</span>
              </p>
              <input type="date" name="check_in" className="input" required />
            </div>
            <div className="box">
              <p>
                çıkış tarihi <span>*</span>
              </p>
              <input type="date" name="check_out" className="input" required />
            </div>
            <div className="box">
              <p>
                yetişkin <span>*</span>
              </p>
              <select name="adults" className="input" required>
                <option value="1">1 yetişkin </option>
                <option value="2">2 yetişkin</option>
                <option value="3">3 yetişkin</option>
                <option value="4">4 yetişkin</option>
                <option value="5">5 yetişkin</option>
                <option value="6">6 yetişkin</option>
              </select>
            </div>
            <div className="box">
              <p>
                çocuklar <span>*</span>
              </p>
              <select name="childs" className="input" required>
                <option value="-">0 çocuk</option>
                <option value="1">1 çocuk </option>
                <option value="2">2 çocuk </option>
                <option value="3">3 çocuk </option>
                <option value="4">4 çocuk </option>
                <option value="5">5 çocuk </option>
                <option value="6">6 çocuk </option>
              </select>
            </div>
            <div className="box">
              <p>
                oda<span>*</span>
              </p>
              <select name="rooms" className="input" required>
                <option value="1">1 oda</option>
                <option value="2">2 oda</option>
                <option value="3">3 oda</option>
                <option value="4">4 oda</option>
                <option value="5">5 oda</option>
                <option value="6">6 oda</option>
              </select>
            </div>
          </div>
          <input
            type="submit"
            value="check availability"
            name="check"
            className="btn"
          />
        </form>
      </section>

      <section className="gallery" id="gallery">
        <Swiper
          modules={[Pagination, EffectCards]}
          spaceBetween={20}
          effect={"cards"}
          pagination={true}
          slidesPerView={2}
          centeredSlides
          loop={true}
        >
          <SwiperSlide>
            <img src={Galery1} className="swiper-slide" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Galery2} className="swiper-slide" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Galery3} className="swiper-slide" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Galery4} className="swiper-slide" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Galery5} className="swiper-slide" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Galery6} className="swiper-slide" alt="" />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="contact" id="contact">
        <div className="row">
          <form action="" method="post">
            <h3>Bize mesaj gönderin</h3>
            <input
              type="text"
              name="name"
              required
              placeholder="isim ve soyisminizi girin"
              className="box"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="email adresinizi girin"
              className="box"
            />
            <input
              type="number"
              name="number"
              required
              min="0"
              max="9999999999"
              placeholder="numaranızı girin"
              className="box"
            />
            <textarea
              name="msg"
              className="box"
              required
              placeholder="mesajınızı girin"
              cols={30}
              rows={10}
            ></textarea>
            <input
              type="submit"
              value="mesajı gönder"
              name="send"
              className="btn"
            />
          </form>

          <div className="faq">
            <h3 className="title">SIKÇA SORULAN SORULAR</h3>
            <div className="box active">
              <h3>Nasıl iptal ederim?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                sunt aspernatur excepturi eos! Quibusdam, sapiente.
              </p>
            </div>
            <div className="box">
              <h3>Boş oda var mı?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
                ipsam neque quaerat mollitia ratione? Soluta!
              </p>
            </div>
            <div className="box">
              <h3>Ödeme yöntemleri neler?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
                ipsam neque quaerat mollitia ratione? Soluta!
              </p>
            </div>
            <div className="box">
              <h3>Kupon kodumu nasıl kullanabilirim?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
                ipsam neque quaerat mollitia ratione? Soluta!
              </p>
            </div>
            <div className="box">
              <h3>Yaş gereksinimi nedir?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
                ipsam neque quaerat mollitia ratione? Soluta!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews" id="reviews">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          pagination={true}
          slidesPerView={2}
          loop={true}
        >
          <SwiperSlide>
            <div className="swiper-slide box grid place-items-center">
              <img src={Pic1} />
              <h3>john deo</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates blanditiis optio dignissimos eaque aliquid explicabo.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide box grid place-items-center">
              <img src={Pic3} alt="" />
              <h3>john deo</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates blanditiis optio dignissimos eaque aliquid explicabo.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide box grid place-items-center">
              <img src={Pic4} alt="" />
              <h3>john deo</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates blanditiis optio dignissimos eaque aliquid explicabo.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide box grid place-items-center">
              <img src={Pic5} alt="" />
              <h3>john deo</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates blanditiis optio dignissimos eaque aliquid explicabo.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide box grid place-items-center">
              <img src={Pic6} alt="" />
              <h3>john deo</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates blanditiis optio dignissimos eaque aliquid explicabo.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}

export default Home;
