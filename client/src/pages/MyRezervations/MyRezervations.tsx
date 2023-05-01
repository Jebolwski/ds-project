import { useState, useEffect, useContext } from "react";
import { Room } from "../../interfaces/Room";
import { Link } from "react-router-dom";
import AuthContext from "../../context/context";
import { Booking } from "../../interfaces/Booking";
import moment from "moment";
import { BiChild } from "react-icons/bi";
import { VscPerson } from "react-icons/vsc";
function MyRezervations() {
  const { user }: any = useContext(AuthContext);
  const [rezervations, setRezervations] = useState<Booking[]>();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/booking/my`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
    }).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: { data: Booking[] } = await resp.json();
        setRezervations(data.data);
      }
    });
  }, []);
  return (
    <section className="text-white text-3xl">
      <h3 className="font-semibold">Rezervasyonlarım</h3>
      {rezervations && rezervations.length > 0
        ? rezervations.map((rezervation: Booking) => {
            if (user && (user.receptionist || user.is_superuser)) {
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
                      <span>{rezervation.adults.length} Yetişkin</span>{" "}
                      <VscPerson />
                    </div>
                    <div>{rezervation.room.category.price}₺</div>
                    <div className="flex gap-3 items-center">
                      <span>{rezervation.childs.length} Çocuk</span> <BiChild />
                    </div>
                  </div>
                </Link>
              );
            } else {
              return (
                <div className="w-full bg-[#421c08]/50 mt-5 p-5 rounded-lg shadow-md hover:shadow-lg duration-200">
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
                      <span>{rezervation.adults.length} Yetişkin</span>{" "}
                      <VscPerson />
                    </div>
                    <div>{rezervation.room.category.price}₺</div>
                    <div className="flex gap-3 items-center">
                      <span>{rezervation.childs.length} Çocuk</span> <BiChild />
                    </div>
                  </div>
                </div>
              );
            }
          })
        : null}
    </section>
  );
}

export default MyRezervations;
