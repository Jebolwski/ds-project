import { useState, useEffect } from "react";
import { Booking as BookingI } from "../../interfaces/Booking";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { BiChild } from "react-icons/bi";
import { VscPerson } from "react-icons/vsc";
import { Link } from "react-router-dom";
function AllRezervations() {
  const [rezervations, setRezervations] = useState<BookingI[] | undefined>();

  useEffect(() => {
    getAllRezervations();
  }, []);

  const getAllRezervations = async () => {
    fetch(`http://127.0.0.1:8000/api/booking/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
    }).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: any = await resp.json();
        setRezervations(data.data);
      }
    });
  };

  return (
    <section className="text-white lg:text-3xl text-xl">
      <h1 className=" font-semibold">Bütün Rezervasyonlar</h1>
      {rezervations?.map((rezervation: BookingI, index: number) => {
        return (
          <Link
            to={`/rezervation/${rezervation.id}`}
            className="w-full block bg-[#421c08]/50 mt-5 p-5 rounded-lg shadow-md hover:shadow-lg duration-200"
          >
            <div className="flex flex-wrap sm:justify-between justify-center items-center lg:gap-8 gap-5">
              <p>
                {rezervation.room.category.name} {rezervation.room.id}
              </p>
              <div>
                {moment(rezervation.start).format("LL")} -{" "}
                {moment(rezervation.end).format("LL")} arası
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <div className="flex gap-3 items-center">
                <span>{rezervation.adults.length} Yetişkin</span> <VscPerson />
              </div>
              <div>{rezervation.room.category.price}₺</div>
              <div className="flex gap-3 items-center">
                <span>{rezervation.childs.length} Çocuk</span> <BiChild />
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default AllRezervations;
