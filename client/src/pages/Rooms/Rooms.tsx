import { useState, useEffect, useContext } from "react";
import { Room } from "../../interfaces/Room";
import { Link } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiHotel } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import AuthContext from "../../context/context";

function Rooms() {
  const { user }: any = useContext(AuthContext);
  const [rooms, setRooms] = useState<Room[]>();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/room/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
    }).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: { data: Room[] } = await resp.json();
        setRooms(data.data);
      }
    });
  }, []);
  return (
    <section className="text-white text-3xl">
      {" "}
      {rooms && rooms?.length > 0 ? (
        <div className="flex gap-4 flex-wrap items-center justify-between">
          <h3 className="font-semibold">Odalar</h3>
          <Link
            to={"/room/add"}
            className="font-semibold flex items-center gap-4"
          >
            Oda Ekle
            <BiHotel size={24} />
          </Link>
        </div>
      ) : null}
      {rooms && rooms?.length > 0 ? (
        rooms.map((room: Room) => {
          let x = 0;
          if (room.image1 != null) {
            x += 1;
          }
          if (room.image2 != null) {
            x += 1;
          }
          if (room.image3 != null) {
            x += 1;
          }
          if (room.image4 != null) {
            x += 1;
          }

          return (
            <Link
              to={`/room/${room.id}`}
              state={{ room: room }}
              className="bg-[#421c08]/50 block mt-5 p-5 rounded-lg shadow-md hover:shadow-lg duration-200"
              key={room.id}
            >
              <div>
                <div className="font-semibold flex items-center sm:justify-between justify-center flex-wrap gap-8">
                  <span>
                    {room.category.name} {room.id}
                  </span>
                  <span className="font-normal">{x} Fotoğraf</span>
                  <div className="flex gap-3 items-center font-normal">
                    <FaMoneyBillWave />
                    <span>{room.category.price}₺</span>
                  </div>
                  {user && (user.is_superuser || user.receptionist) ? (
                    <Link to={`/room/${room.id}/delete`}>
                      <AiFillDelete size={24} />
                    </Link>
                  ) : null}
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <h3 className="text-center mt-5">Herhangi bir oda yok. 😥</h3>
      )}
    </section>
  );
}

export default Rooms;
