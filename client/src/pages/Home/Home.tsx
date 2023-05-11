import "src/pages/Home/Home.css";
import { useContext, useEffect, useState } from "react";
import { Navigation, Pagination, EffectCards } from "swiper";
import { toast } from "react-toastify";
import Home1 from "../../assets/images/home-img-1.jpg";
import Home2 from "../../assets/images/home-img-2.jpg";
import Home3 from "../../assets/images/home-img-3.jpg";
import Pic1 from "../../assets/images/pic-1.png";
import Pic2 from "../../assets/images/pic-2.png";
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
import HotelContext from "../../context/hotelcontext";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/context";
import { User as UserI } from "../../interfaces/User";

function Home() {
  const { user }: any = useContext(AuthContext);

  let navigate = useNavigate();

  return (
    <div className="home-all">
      <section className="home" id="home">
        <Swiper
          spaceBetween={20}
          modules={[Navigation]}
          slidesPerView={1}
          navigation={true}
          loop={true}
        >
          <SwiperSlide>
            <div className="max-h-[40rem] overflow-hidden">
              <img src={Home1} className="w-full" />
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-[#DCC69C] text-[2.4rem] font-semibold">
                Lüks Odalar
              </h3>
              <a className="btn" href="#availability">
                Kullanılabirliği kontrol et
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="max-h-[40rem] overflow-hidden">
              <img src={Home2} className="w-full" />
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-[#DCC69C] text-[2.4rem] font-semibold">
                Yiyecek ve içecekler
              </h3>
              <a href="#reservation" className="btn">
                Rezervasyon Yap
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="max-h-[40rem] overflow-hidden">
              <img src={Home3} className="w-full" />
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-[#DCC69C] text-[2.4rem] font-semibold">
                Lüks Salonlar
              </h3>
              <Link to={"/questions"} className="btn">
                İletişime Geç
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="availability" id="availability">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!user) {
              toast.info(
                "Bu eylemi gerçekleştirebilmek için giriş yapmanız gerekir. 😞"
              );
              return;
            }
            let start: Date = e.target.check_in.value;
            let end: Date = e.target.check_out.value;
            if (start > end) {
              toast.error("Giriş tarihi çıkış tarihinden büyük olamaz. 😶");
              return;
            } else if (new Date(start) < new Date(Date.now())) {
              toast.error("Geçmiş bir tarihe rezervasyon alınamaz. 😞");
              return;
            }
            let adult: number = e.target.adult.value;
            let children: number = e.target.children.value;
            navigate(`/search-room/${start}/${end}/${children}/${adult}`);
          }}
        >
          <div className="flex">
            <div className="box">
              <p>
                Rezervasyon Giriş <span>*</span>
              </p>
              <input
                type="date"
                name="check_in"
                className="input h-[50px]"
                required
              />
            </div>
            <div className="box">
              <p>
                Rezervasyon Çıkış <span>*</span>
              </p>
              <input
                type="date"
                name="check_out"
                className="input h-[50px]"
                required
              />
            </div>
            <div className="box">
              <p>
                Yetişkin sayısı <span>*</span>
              </p>
              <select name="adult" className="input h-[50px]" required>
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
              <select name="children" className="input h-[50px]" required>
                <option value="0">0 Çocuk</option>
                <option value="1">1 Çocuk</option>
                <option value="2">2 Çocuk</option>
                <option value="3">3 Çocuk</option>
                <option value="4">4 Çocuk</option>
                <option value="5">5 Çocuk</option>
                <option value="6">6 Çocuk</option>
              </select>
            </div>
          </div>
          <input
            type="submit"
            value="Müsaitliği kontrol et"
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
            <Link to={"/questions"} className="btn">
              İletişime Geçin
            </Link>
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
              <h3>Mert Gökmen</h3>
              <p>
                Temizlik açısından iyi bir oteldi. Her yönüyle tavsiye ederim.
                Otelde giriş ve çıkış işlemleri çok hızlı şekilde yapıldı.
                Personeller çok güler yüzlüydü.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide box grid place-items-center">
              <img src={Pic4} alt="" />
              <h3>Edanur Yıldız</h3>
              <p>Konum,odaların modern tasarımı ve rahatlığı çok güzeldi.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide box grid place-items-center">
              <img src={Pic3} alt="" />
              <h3>Emre Aydın</h3>
              <p>
                Konum olarak uygun bir oteldi. Otelin temizliği idare ederdi.
                Otelde giriş çıkış işlemleri rahat bir şekilde yapıldı.
                Personeller gayet iyiydi.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide box grid place-items-center">
              <img src={Pic2} alt="" />
              <h3>Gülsüm Küntür</h3>
              <p>
                Otel gayet iyiydi bu sezonda kullanılacak en iyi yerlerden biri.
                Yemek ve temizlik konusunda da gayet iyiydi. Personel konusunda
                hiç sıkıntı yaşamadık.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide box grid place-items-center">
              <img src={Pic5} alt="" />
              <h3>Tahir Ekrem</h3>
              <p>Tam bir fiyat performans yeri</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide box grid place-items-center">
              <img src={Pic2} alt="" />
              <h3>Tuğba Kır</h3>
              <p>
                Herşey çok güzeldi, bahar hanım ekstra yardımcı oldu. ilgi ve
                alakası ve yardımseverliği için çok teşekkür ediyorum
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}

export default Home;
