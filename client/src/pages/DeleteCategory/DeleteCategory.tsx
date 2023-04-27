import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Category as CategoryI } from "../../interfaces/Booking";
function DeleteCategory() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategory();
  }, []);

  const [category, setCategory] = useState<CategoryI | undefined | null>(
    undefined
  );

  const getCategory = async () => {
    await fetch("http://127.0.0.1:8000/api/room-category/" + params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: any = await resp.json();
        setCategory(data.data);
      } else {
        setCategory(null);
      }
    });
  };

  const deleteCategory = async () => {
    await fetch(
      "http://127.0.0.1:8000/api/room-category/" + params.id + "/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("key"),
        },
      }
    ).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data = await resp.json();
        navigate("/");
        toast.success(data.msg_tr);
      }
    });
  };

  return (
    <section className="text-white text-[2rem] mt-8">
      {category != null && category != undefined ? (
        <div>
          <h3 className="text-center font-semibold">
            '{category.name}' oda kategorisini silmek istediğnize emin misiniz?
          </h3>
          <div className="mt-16 flex items-center justify-evenly gap-5">
            <Link to={"/"} className="btn">
              Geri Dön
            </Link>
            <button className="btn" onClick={deleteCategory}>
              Sil
            </button>
          </div>
        </div>
      ) : category == null ? (
        <h3 className="text-center font-semibold">Oda bulunamadı. 😅</h3>
      ) : (
        <h3 className="text-center font-semibold">Yükleniyor... ⚡</h3>
      )}
    </section>
  );
}

export default DeleteCategory;
