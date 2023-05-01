import { useLocation } from "react-router-dom";
import { Navigation, Pagination, EffectCards } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaMoneyBillWave } from "react-icons/fa";
function Room() {
  const location = useLocation();
  const { room } = location.state;

  return (
    <section className="text-white text-3xl">
      <div className=" bg-[#421c08]/50 mt-5 p-5 rounded-lg shadow-md hover:shadow-lg duration-200">
        <div className="font-semibold flex items-center mb-5 sm:justify-between justify-center flex-wrap gap-8">
          <span>
            {room.category.name} {room.id}
          </span>
          <div className="flex gap-3 items-center">
            <FaMoneyBillWave />
            <span>{room.category.price}₺</span>
          </div>
        </div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides
          className="lg:w-3/5 rounded-lg w-4/5"
          pagination={true}
          loop={true}
        >
          {room.image1 ? (
            <SwiperSlide>
              <div className="max-h-[30rem] overflow-hidden">
                <img
                  src={"http://127.0.0.1:8000" + room.image1}
                  className="w-full"
                />
              </div>
            </SwiperSlide>
          ) : null}
          {room.image2 ? (
            <SwiperSlide>
              <div className="max-h-[30rem] overflow-hidden">
                <img
                  src={"http://127.0.0.1:8000" + room.image2}
                  className="w-full"
                />
              </div>
            </SwiperSlide>
          ) : null}
          {room.image3 ? (
            <SwiperSlide>
              <div className="max-h-[30rem] overflow-hidden">
                <img
                  src={"http://127.0.0.1:8000" + room.image3}
                  className="w-full"
                />
              </div>
            </SwiperSlide>
          ) : null}
          {room.image3 ? (
            <SwiperSlide>
              <div className="max-h-[30rem] overflow-hidden">
                <img
                  src={"http://127.0.0.1:8000" + room.image3}
                  className="w-full"
                />
              </div>
            </SwiperSlide>
          ) : null}
        </Swiper>
        <p className="italic mt-5">{room.category.desc}</p>
      </div>
    </section>
  );
}

export default Room;
