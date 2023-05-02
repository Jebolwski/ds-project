import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddRoomCategory() {
  const [categoryName, setCategoryName] = useState<string>();
  const [maxAdult, setMaxAdult] = useState<string>("1");
  const [maxChildren, setMaxChildren] = useState<string>("0");
  const [price, setPrice] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const navigate = useNavigate();

  const addCategory = async () => {
    await fetch("http://127.0.0.1:8000/api/room-category/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
      body: JSON.stringify({
        name: categoryName,
        max_adult: maxAdult,
        max_children: maxChildren,
        price: price,
        desc: desc,
      }),
    }).then(async (resp: Response) => {
      let data = await resp.json();
      if (resp.status === 200) {
        console.log(data);
        navigate("/room-category/all");
        toast.success(data.msg_tr);
      } else {
        toast.error(data.msg_tr);
      }
    });
  };

  return (
    <section className="text-[#DCC69C] text-3xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCategory();
        }}
      >
        <div>
          <div className="flex flex-wrap gap-10">
            <div className="flex-1">
              <h4 className="mb-2 text-[#dcc69c] whitespace-nowrap">
                Kategori Adı*
              </h4>
              <input
                type="text"
                required
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
                className="bg-transparent text-[#dcc69c] h-14 border-b w-full border-[#dcc69c4d]"
              />
            </div>
            <div className="flex-1">
              <p className="mb-2 text-[#dcc69c] whitespace-nowrap">
                Maksimum Yetişkin Sayısı*
              </p>
              <select
                onChange={(e) => {
                  setMaxAdult(e.target.value);
                }}
                className="border-b w-full border-[#dcc69c4d] h-14 bg-transparent p-1 shadow-md hover:shadow-lg duration-300"
              >
                <option className="bg-[#2b1103]" value="1">
                  1
                </option>
                <option className="bg-[#2b1103]" value="2">
                  2
                </option>
                <option className="bg-[#2b1103]" value="3">
                  3
                </option>
                <option className="bg-[#2b1103]" value="4">
                  4
                </option>
              </select>
            </div>
            <div className="flex-1">
              <p className="mb-2 text-[#dcc69c] whitespace-nowrap">
                Maksimum Çocuk Sayısı*
              </p>
              <select
                onChange={(e) => {
                  setMaxChildren(e.target.value);
                }}
                className="border-b w-full border-[#dcc69c4d] h-14 bg-transparent p-1 shadow-md hover:shadow-lg duration-300"
              >
                <option className="bg-[#2b1103]" value="0">
                  0
                </option>
                <option className="bg-[#2b1103]" value="1">
                  1
                </option>
                <option className="bg-[#2b1103]" value="2">
                  2
                </option>
                <option className="bg-[#2b1103]" value="3">
                  3
                </option>
                <option className="bg-[#2b1103]" value="4">
                  4
                </option>
              </select>
            </div>
            <div className="flex-1">
              <p className="mb-2 text-[#dcc69c] whitespace-nowrap">Fiyat*</p>
              <input
                required
                type="number"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                maxLength={2}
                className="bg-transparent h-14 w-full placeholder-[#dcc69c99] border-b p-1 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
              />
            </div>
          </div>
          <div className="mt-10">
            <h4 className="mb-2 text-[#dcc69c]">Açıklama*</h4>
            <textarea
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              className="w-full bg-transparent border-b border-[#dcc69c4d]"
            ></textarea>
          </div>
        </div>
        <button className="btn">Kategori Ekle</button>
      </form>
    </section>
  );
}

export default AddRoomCategory;
