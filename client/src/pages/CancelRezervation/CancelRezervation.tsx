import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Room as RoomI } from "../../interfaces/Room";
import { toast } from "react-toastify";
import { Booking as BookingI } from "../../interfaces/Booking";

function CancelRezervation() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBooking();
  }, []);

  const [booking, setBooking] = useState<BookingI | undefined | null>(
    undefined
  );

  const getBooking = async () => {
    await fetch("http://127.0.0.1:8000/api/booking/" + params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
    }).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: any = await resp.json();
        setBooking(data.data);
      } else {
        setBooking(null);
      }
    });
  };

  const deleteRezervation = async () => {
    await fetch("http://127.0.0.1:8000/api/booking/" + params.id + "/cancel", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
    }).then(async (resp: Response) => {
      let data = await resp.json();
      if (resp.status == 200) {
        navigate("/rezervation/my");
        toast.success(data.msg_tr);
      } else if (resp.status == 400) {
        toast.error(data.msg_tr);
      }
    });
  };
  return (
    <section className="text-white text-3xl my-5">
      {booking != null && booking != undefined ? (
        <div>
          <h3 className="text-center font-semibold">
            '{booking?.room.category.name + " " + booking?.room.id}'
            rezervasyonunu iptal etmek istediğnize emin misiniz?
          </h3>
          <div className="mt-16 flex items-center justify-evenly gap-5">
            <Link to={"/rezervation/my"} className="btn">
              Geri Dön
            </Link>
            <button className="btn" onClick={deleteRezervation}>
              İptal Et
            </button>
          </div>
        </div>
      ) : booking == null ? (
        <h3 className="text-center font-semibold">
          Rezervasyon bulunamadı. 😞
        </h3>
      ) : (
        <h3 className="text-center font-semibold">Yükleniyor... ⚡</h3>
      )}
    </section>
  );
}

export default CancelRezervation;
