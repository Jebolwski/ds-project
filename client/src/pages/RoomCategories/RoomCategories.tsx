import { useContext, useState, useEffect } from "react";
import { Category, Room } from "../../interfaces/Room";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdChildFriendly, MdOutlineBedroomChild } from "react-icons/md";
import { BsPersonVcardFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import AuthContext from "../../context/context";
import { AiFillDelete } from "react-icons/ai";

function RoomCategories() {
  const [roomCategories, setRoomCategories] = useState<Category[]>();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/room-category/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
    }).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: any = await resp.json();
        setRoomCategories(data.data);
      }
    });
  }, []);
  const { user }: any = useContext(AuthContext);

  return (
    <section className="text-white text-3xl">
      {roomCategories && roomCategories?.length > 0 ? (
        <div className="flex items-center flex-wrap gap-4 justify-between">
          <h3 className="font-semibold">Oda Kategorileri</h3>
          <Link
            to={"/room-category/add"}
            className="font-semibold flex items-center gap-4"
          >
            Oda Kategorisi Ekle
            <MdOutlineBedroomChild size={24} />
          </Link>
        </div>
      ) : null}
      {roomCategories && roomCategories?.length > 0 ? (
        roomCategories.map((category: Category) => {
          return (
            <Link
              to={`/room-category/${category.id}`}
              state={{ category: category }}
              className="bg-[#421c08]/50 block mt-5 p-5 rounded-lg shadow-md hover:shadow-lg duration-200"
              key={category.id}
            >
              <div className="flex justify-between items-center flex-wrap">
                <h3 className="mb-3">{category.name}</h3>
                {user && user.is_superuser ? (
                  <Link to={`/room-category/${category.id}/delete`}>
                    <AiFillDelete size={24} />
                  </Link>
                ) : null}
              </div>
              {category.desc.length > 75 ? (
                <p className="italic mb-3">{category.desc.slice(0, 75)}...</p>
              ) : (
                <p className="italic mb-3">{category.desc}</p>
              )}
              <div className="flex items-center flex-wrap sm:justify-between justify-center gap-10">
                <div className="flex items-center gap-3">
                  <BsPersonVcardFill />
                  <span>{category.max_adult}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMoneyBillWave />
                  <span>{category.price}₺</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{category.max_children}</span>
                  <MdChildFriendly />
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <h3 className="text-center mt-5">
          Herhangi bir mesaj gönderilmemiş. 😥
        </h3>
      )}
    </section>
  );
}

export default RoomCategories;
