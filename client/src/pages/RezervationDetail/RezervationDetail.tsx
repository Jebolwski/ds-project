import "./RezervationDetail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip } from "swiper";
import Galery1 from "../../assets/images/gallery-img-1.jpg";
import Galery2 from "../../assets/images/gallery-img-2.webp";
import Galery3 from "../../assets/images/gallery-img-3.webp";
import Galery4 from "../../assets/images/gallery-img-4.webp";
import Galery5 from "../../assets/images/gallery-img-5.webp";
import Galery6 from "../../assets/images/gallery-img-6.webp";

function RezervationDetail() {
  return (
    <>
      <section className="header">
        <div className="flex">
          <div id="menu-btn" className="fas fa-bars"></div>
        </div>
      </section>

      <section className="flex lg:flex-nowrap flex-wrap items-start gap-6">
        <Swiper
          modules={[Navigation, EffectFlip]}
          spaceBetween={20}
          effect={"cards"}
          navigation={true}
          slidesPerView={1}
          loop={true}
          className="lg:w-1/2 w-full rounded-lg shadow-md hover:shadow-lg duration-300"
        >
          <SwiperSlide>
            <img src={Galery3} className="swiper-slide w-full" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Galery4} className="swiper-slide w-full" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Galery3} className="swiper-slide w-full" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Galery4} className="swiper-slide w-full" alt="" />
          </SwiperSlide>
        </Swiper>
        <div className="lg:w-1/2 w-full">
          <div className="bg-[#dcc69c] rounded-md text-[#2b1103] p-3 text-2xl font-semibold text-center mb-4">
            REZERVASYON BİLGİLERİ
          </div>
          <div className="right-area p-4 rounded-lg shadow-md hover:shadow-lg duration-200">
            <h4 className="underline font-bold mb-2">Genel Bilgiler</h4>
            <p className="my-1">Giriş Tarihi : 16 Nisan 2022</p>
            <p className="my-1">Çıkış Tarihi : 21 Nisan 2022</p>
            <p className="my-1">Yetişkin Sayısı : 2</p>
            <p className="my-1">Çocuk Sayısı : 1</p>

            <p className="my-1">Fiyat : 1650₺</p>
            <h4 className="underline font-bold my-2">Oda Bilgileri</h4>
            <p className="my-1">Kat : 12</p>
            <p className="my-1">Oda Numarası : 1203</p>
            <p className="my-1">Oda Türü : Deluxe Room</p>
            <h4 className="underline font-bold my-2">Müşteri Bilgileri</h4>
            <p className="my-1">Ad-Soyad : Asya GÜNGÖRMÜŞ</p>
            <p className="my-1">Kimlik Numarası : 29939697996</p>
          </div>
        </div>
      </section>
      <section className="flex flex-wrap items-start gap-6">
        {/* Yetişkinler */}
        <div className="right-area min-w-[300px] flex-1 p-4 rounded-lg shadow-md hover:shadow-lg duration-200">
          <h4 className="underline font-bold mb-2">Yetişkin 1</h4>
          <p className="my-1">Ad Soyad : Charlie Hemog</p>
          <p className="my-1">TC Kimlik Numara : 62136541281</p>
          <h4 className="underline font-bold mb-2">Yetişkin 2</h4>
          <p className="my-1">Ad Soyad : Rüştü Reçber</p>
          <p className="my-1">TC Kimlik Numara : 42136598282</p>
        </div>
        {/* Çocuklar */}
        <div className="right-area min-w-[300px] flex-1 p-4 rounded-lg shadow-md hover:shadow-lg duration-200">
          <h4 className="underline font-bold mb-2">Çocuk 1</h4>
          <p className="my-1">Ad Soyad : Charlie Hemog</p>
          <p className="my-1">TC Kimlik Numara : 62136541281</p>
          <p className="my-1">Yaş : 11</p>
          <h4 className="underline font-bold mb-2">Çocuk 2</h4>
          <p className="my-1">Ad Soyad : Rüştü Reçber</p>
          <p className="my-1">TC Kimlik Numara : 42136598282</p>
          <p className="my-1">Yaş : 7</p>
        </div>
      </section>
    </>
  );
}

export default RezervationDetail;
