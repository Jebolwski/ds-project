import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Room as RoomI } from "../../interfaces/Room";
import { toast } from "react-toastify";
function DeleteRoom() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRoom();
  }, []);

  const [room, setRoom] = useState<RoomI | undefined | null>(undefined);

  const getRoom = async () => {
    await fetch("http://127.0.0.1:8000/api/room/" + params.id, {
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

  const deleteRoom = async () => {
    await fetch("http://127.0.0.1:8000/api/room/" + params.id + "/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
    }).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data = await resp.json();
        navigate("/room/all");
        toast.success(data.msg_tr);
      }
    });
  };

  return (
    <section className="text-white text-[2rem] mt-8">
      {room != null && room != undefined ? (
        <div>
          <h3 className="text-center font-semibold">
            '{room?.category.name + " " + room?.id}' odasını silmek istediğnize
            emin misiniz?
          </h3>
          <div className="mt-16 flex items-center justify-evenly gap-5">
            <Link to={"/room/all"} className="btn">
              Geri Dön
            </Link>
            <button className="btn" onClick={deleteRoom}>
              Sil
            </button>
          </div>
        </div>
      ) : room == null ? (
        <h3 className="text-center font-semibold">Oda bulunamadı. 😅</h3>
      ) : (
        <h3 className="text-center font-semibold">Yükleniyor... ⚡</h3>
      )}
    </section>
  );
}

export default DeleteRoom;
