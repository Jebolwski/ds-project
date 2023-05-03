import { useContext, useEffect, useState } from "react";
import HotelContext from "../../context/hotelcontext";
import { Room } from "../../interfaces/Room";
import { Link, useParams } from "react-router-dom";

function SearchRoom2() {
  const params = useParams();
  const [diffDays, setDiffDays] = useState<number>();
  const { searchedRooms, searchRoom }: any = useContext(HotelContext);
  useEffect(() => {
    searchRoom(params.start, params.end, params.children, params.adult);
    const date2: any = new Date(params.end!);
    const date1: any = new Date(params.start!);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDiffDays(diffDays);
  }, []);

  return (
    <section>
      {searchedRooms && searchedRooms.length > 0
        ? searchedRooms.map((room: Room) => {
            return (
              <Link
                to={`/room/${room.id}`}
                state={{ room: room }}
                className="text-3xl w-full block bg-[#421c08]/50 my-5 p-5 shadow-md hover:shadow-lg duration-200 rounded-lg text-white"
                key={room.id}
              >
                <h3 className="font-semibold">
                  {room.category.name} {room.id}
                </h3>
                <div className="flex justify-between flex-wrap items-center gap-6 mt-5">
                  <div className="lg:w-3/4 w-full">
                    {room.category.desc.length > 100 ? (
                      <p className="italic mb-3">
                        {room.category.desc.slice(0, 100)}...
                      </p>
                    ) : (
                      <p className="italic mb-3">{room.category.desc}</p>
                    )}
                  </div>

                  <div>
                    {diffDays ? (
                      <div className="text-[#DCC69C] text-right text-4xl font-normal">
                        {room.category.price * diffDays}₺ ({diffDays} gün x{" "}
                        {room.category.price}₺)
                      </div>
                    ) : null}
                    <div className="flex justify-center items-center">
                      <Link
                        to={"/rezervation/add"}
                        state={{
                          children: params.children,
                          adult: params.adult,
                          room_id: room.id,
                          start: params.start,
                          end: params.end,
                        }}
                        className="btn"
                      >
                        Rezerve Et
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        : null}
    </section>
  );
}

export default SearchRoom2;
