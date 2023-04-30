import { useContext, useEffect } from "react";
import HotelContext from "../../context/hotelcontext";
import { Room } from "../../interfaces/Room";
import { Link, useParams } from "react-router-dom";

function SearchRoom() {
  const params = useParams();

  const { searchedRooms, searchRoom }: any = useContext(HotelContext);
  useEffect(() => {
    searchRoom(params.start, params.end, params.children, params.adult);
  }, []);

  return (
    <section>
      {searchedRooms && searchedRooms.length > 0
        ? searchedRooms.map((room: Room) => {
            return (
              <Link
                to={"/checkout"}
                state={{
                  children: params.children,
                  adult: params.adult,
                  room_id: room.id,
                  start: params.start,
                  end: params.end,
                }}
                className="text-2xl bg-red-500 my-5 p-1 rounded-lg text-white"
                key={room.id}
              >
                {room.category.name} {room.id}
              </Link>
            );
          })
        : null}
    </section>
  );
}

export default SearchRoom;
