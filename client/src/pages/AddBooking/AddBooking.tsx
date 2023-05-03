import { API_URL } from "src/config/config";
import "../CheckOut/CheckOut.css";
import { toast } from "react-toastify";
import "moment/locale/fr";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Room as RoomI } from "../../interfaces/Room";
function AddBooking() {
  const location = useLocation();
  const { children, adult, room_id, start, end } = location.state;
  const [diffDays, setDiffDays] = useState<number>();

  const navigate = useNavigate();

  const addRezervation = async () => {
    generateRezervData();
    await fetch(`http://127.0.0.1:8000/api/room/book-rec`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
      body: JSON.stringify({
        children: childrenData,
        adults: adultsData,
        price: diffDays! * (room?.category.price! * 100) || 1 * 100,
        start: start,
        end: end,
        room: room?.id,
        product_name: room?.category.name + " " + room?.id,
      }),
    }).then(async (resp: Response) => {
      let data: any = await resp.json();
      if (resp.status == 200) {
        navigate("/rezervation/my");
        toast.success(data.msg_tr);
      } else {
        toast.error(data.msg_tr);
      }
    });
  };

  useEffect(() => {
    let arr: number[] = [];
    for (let i = 0; i < parseInt(adult); i++) {
      arr.push(0);
    }
    setAdults(arr);
    let arr1: number[] = [];
    for (let i = 0; i < parseInt(children); i++) {
      arr1.push(0);
    }
    setChildrens(arr1);

    getRoom();

    const date2: any = new Date(end!);
    const date1: any = new Date(start!);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDiffDays(diffDays);
  }, []);

  const getRoom = async () => {
    await fetch("http://127.0.0.1:8000/api/room/" + room_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: any = await resp.json();
        setRoom(data.data);
      } else {
        setRoom(null);
      }
    });
  };

  const generateRezervData = () => {
    let div: NodeList = document.querySelectorAll(".adults");
    let data: any[] = [];
    div.forEach((element: any) => {
      let name: HTMLInputElement = element.querySelector(".name");
      let tc: HTMLInputElement = element.querySelector(".tc");
      data.push({
        name: name.value,
        tcno: tc.value,
      });
    });

    let div1: NodeList = document.querySelectorAll(".children");
    let data1: any[] = [];
    div1.forEach((element: any) => {
      let name: HTMLInputElement = element.querySelector(".name");
      let tc: HTMLInputElement = element.querySelector(".tc");
      let age: HTMLInputElement = element.querySelector(".age");

      data1.push({
        name: name.value,
        tcno: tc.value,
        age: age.value,
      });
    });
    setAdultsData(data);
    setChildrenData(data1);
  };

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [adults, setAdults] = useState<number[]>();
  const [adultsData, setAdultsData] = useState<number[]>();
  const [childrenData, setChildrenData] = useState<number[]>();
  const [childrens, setChildrens] = useState<number[]>();
  const [room, setRoom] = useState<RoomI | undefined | null>(undefined);

  return (
    <section className="text-white text-2xl">
      <form
        className="flex items-start gap-6 flex-wrap"
        onSubmit={(e) => {
          e.preventDefault();
          addRezervation();
        }}
      >
        <div className="flex-1 min-w-[370px]">
          {/* Yetişkin */}
          {adults && adults.length > 0
            ? adults.map((adult, index: number) => {
                return (
                  <div className="mb-10 adults">
                    <p className="text-3xl mb-3">{index + 1}. Yetişkin</p>
                    <div className="my-1">
                      <input
                        type="text"
                        placeholder="adı soyadı"
                        name="name"
                        className="bg-transparent name w-full placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                      />
                    </div>
                    <div className="my-1">
                      <input
                        type="text"
                        maxLength={11}
                        name="tc"
                        placeholder="tc kimlik no"
                        className="bg-transparent w-full tc placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                      />
                    </div>
                  </div>
                );
              })
            : null}

          {/* Çocuk */}
          {childrens && childrens.length > 0
            ? childrens.map((child, index: number) => {
                return (
                  <div className="mb-10 children">
                    <p className="text-3xl mb-3">{index + 1}. Çocuk</p>
                    <div className="my-1">
                      <input
                        type="text"
                        name="name"
                        placeholder="adı soyadı"
                        className="bg-transparent w-full name placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                      />
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="my-1 flex-1">
                        <input
                          type="text"
                          maxLength={11}
                          name="tc"
                          placeholder="tc kimlik no"
                          className="bg-transparent w-full tc placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                        />
                      </div>
                      <div className="my-1 flex-1">
                        <input
                          type="number"
                          maxLength={2}
                          name="age"
                          placeholder="yaş"
                          className="bg-transparent w-full age placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>

        <div className="flex-1 min-w-[370px]">
          <h3 className="text-3xl font-semibold text-[#dcc69c]">Özet</h3>
          <p className="my-4 text-3xl">
            {room?.category.name} {room?.id}
          </p>
          <span className="my-4 text-3xl">
            {adult} Yetişkin - {children} Çocuk
          </span>
          <p className="my-4 text-3xl">
            {new Date(start).toLocaleString(undefined, options)} -{" "}
            {new Date(end).toLocaleString(undefined, options)} arası
          </p>
          {diffDays && room?.category.price ? (
            <div
              className="my-4
 text-3xl font-normal"
            >
              Toplam : {room?.category.price * diffDays}₺ ({diffDays} gün x{" "}
              {room?.category.price}₺)
            </div>
          ) : null}
          <input
            value={"Rezervasyonu Ekle"}
            className="btn w-full"
            type="submit"
            onClick={generateRezervData}
          />
        </div>
      </form>
    </section>
  );
}

export default AddBooking;
