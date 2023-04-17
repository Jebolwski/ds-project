import { useContext, useEffect } from "react";
import HotelContext from "../../context/hotelcontext";
import { Room } from "../../interfaces/Room";
import { useParams } from "react-router-dom";

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
              <h3 className="text-2xl text-white" key={room.id}>
                {room.category.name}
              </h3>
            );
          })
        : null}
    </section>
  );
}

export default SearchRoom;
