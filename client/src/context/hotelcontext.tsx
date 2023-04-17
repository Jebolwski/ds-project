import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HotelContext = createContext({});

export default HotelContext;

export const HotelProvider = ({ children }: any) => {
  const [searchedRooms, setSearchedRooms] = useState();

  let navigate = useNavigate();

  const searchRoom = (
    start: Date,
    end: Date,
    adult: number,
    children: number
  ) => {
    fetch(
      `http://127.0.0.1:8000/api/room/search?start=${start}&end=${end}&children=${children}&adult=${adult}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: any = await resp.json();
        setSearchedRooms(data.data);
      }
    });
  };

  const sendMessage = (
    name: string,
    email: string,
    number: number,
    message: string
  ) => {
    fetch(
      `http://127.0.0.1:8000/api/room/search?start=${start}&end=${end}&children=${children}&adult=${adult}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          number: number,
          message: message,
        }),
      }
    ).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: any = await resp.json();
        setSearchedRooms(data.data);
      }
    });
  };

  let contextData = {
    searchRoom: searchRoom,
    searchedRooms: searchedRooms,
    sendMessage: sendMessage,
  };
  return (
    <HotelContext.Provider value={contextData}>
      {children}
    </HotelContext.Provider>
  );
};
