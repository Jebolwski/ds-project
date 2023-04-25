import "./RezervationDetail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip } from "swiper";
import Galery3 from "../../assets/images/gallery-img-3.webp";
import Galery4 from "../../assets/images/gallery-img-4.webp";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Booking as BookingI } from "../../interfaces/Booking";

function RezervationDetail() {
  const params = useParams();

  const [booking, setBooking] = useState<BookingI>();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/booking/" + params.id, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
    }).then(async (resp: Response) => {
      let data = await resp.json();
      setBooking(data.data);
    });
  }, []);

  return (
    <>
      {booking ? (
        <>
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
              {booking?.room.image1 ? (
                <SwiperSlide>
                  <img
                    src={"http://127.0.0.1:8000" + booking?.room.image1}
                    className="swiper-slide w-full"
                    alt=""
                  />
                </SwiperSlide>
              ) : null}
              {booking?.room.image2 ? (
                <SwiperSlide>
                  <img
                    src={"http://127.0.0.1:8000" + booking?.room.image2}
                    className="swiper-slide w-full"
                    alt=""
                  />
                </SwiperSlide>
              ) : null}
              {booking?.room.image3 ? (
                <SwiperSlide>
                  <img
                    src={"http://127.0.0.1:8000" + booking?.room.image3}
                    className="swiper-slide w-full"
                    alt=""
                  />
                </SwiperSlide>
              ) : null}
              {booking?.room.image4 ? (
                <SwiperSlide>
                  <img
                    src={"http://127.0.0.1:8000" + booking?.room.image4}
                    className="swiper-slide w-full"
                    alt=""
                  />
                </SwiperSlide>
              ) : null}
            </Swiper>
            <div className="lg:w-1/2 w-full">
              <div className="bg-[#dcc69c] rounded-md text-[#2b1103] p-3 text-2xl font-semibold text-center mb-4">
                REZERVASYON BİLGİLERİ
              </div>
              <div className="right-area p-4 rounded-lg shadow-md hover:shadow-lg duration-200">
                <h4 className="underline font-bold mb-2">Genel Bilgiler</h4>
                <p className="my-1">
                  Giriş Tarihi : {booking?.start.toString()}
                </p>
                <p className="my-1">Çıkış Tarihi : {booking?.end.toString()}</p>
                <p className="my-1">
                  Yetişkin Sayısı : {booking?.adults.length}
                </p>
                <p className="my-1">Çocuk Sayısı : {booking?.childs.length}</p>

                <p className="my-1">Fiyat : {booking?.room.category.price}₺</p>
                <h4 className="underline font-bold my-2">Oda Bilgileri</h4>
                <p className="my-1">Oda Numarası : {booking?.room.id}</p>
                <p className="my-1">Oda Türü : {booking?.room.category.name}</p>
              </div>
            </div>
          </section>
          <section className="flex flex-wrap items-start gap-6">
            {/* Yetişkinler */}
            {booking?.adults ? (
              <div className="right-area min-w-[300px] flex-1 p-4 rounded-lg shadow-md hover:shadow-lg duration-200">
                {booking.adults.map((adult, index) => {
                  return (
                    <div key={adult.id}>
                      <h4 className="underline font-bold mb-2">
                        Yetişkin {index + 1}
                      </h4>
                      <p className="my-1">Ad Soyad : {adult.name}</p>
                      <p className="my-1">TC Kimlik Numara : {adult.tcno}</p>
                    </div>
                  );
                })}
              </div>
            ) : null}
            {/* Çocuklar */}

            {booking?.childs && booking.childs.length > 0 ? (
              <div className="right-area min-w-[300px] flex-1 p-4 rounded-lg shadow-md hover:shadow-lg duration-200">
                {booking.childs.map((child, index) => {
                  return (
                    <div key={child.id}>
                      <h4 className="underline font-bold mb-2">
                        Çocuk {index + 1}
                      </h4>
                      <p className="my-1">Ad Soyad : {child.name}</p>
                      <p className="my-1">TC Kimlik Numara : {child.tcno}</p>
                      <p className="my-1">Yaş : {child.age}</p>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </section>
        </>
      ) : (
        <div className="text-3xl font-semibold mt-16 mb-10 text-white text-center">
          Rezervasyon bulunamadı. 😥
        </div>
      )}
    </>
  );
}

export default RezervationDetail;
