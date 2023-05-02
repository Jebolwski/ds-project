import { useEffect, useState } from "react";
import { Category as CategoryI } from "../../interfaces/Booking";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddRoom() {
  const [categorys, setCategorys] = useState<CategoryI[]>();
  const [categoryId, setCategoryId] = useState<string>();
  const [file1, setFile1] = useState<Blob | undefined>();
  const [file2, setFile2] = useState<Blob | undefined>();
  const [file3, setFile3] = useState<Blob | undefined>();
  const [file4, setFile4] = useState<Blob | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/room-category/all", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("key"),
      },
    }).then(async (resp: Response) => {
      let data: { data: CategoryI[] } = await resp.json();
      setCategorys(data.data);
    });
  }, []);

  const addRoom = async () => {
    let formdata: FormData = new FormData();
    formdata.append("category", categoryId!);
    if (file1) {
      formdata.append("image1", file1!, file1?.name);
    }
    if (file2) {
      formdata.append("image2", file2!, file2?.name);
    }
    if (file3) {
      formdata.append("image3", file3!, file3?.name);
    }
    if (file4) {
      formdata.append("image4", file4!, file4?.name);
    }
    await fetch("http://127.0.0.1:8000/api/room/add", {
      method: "POST",
      headers: {
        Authorization: "Token " + localStorage.getItem("key"),
      },
      body: formdata,
    }).then(async (resp: Response) => {
      let data = await resp.json();
      if (resp.status == 200) {
        navigate("/room/all");
        toast.success(data.msg_tr);
      } else {
        toast.error(data.msg_tr);
      }
    });
  };

  return (
    <section className="text-[#DCC69C] text-3xl">
      <div>
        <div className="flex flex-wrap gap-10">
          <div className="flex-1">
            <h4 className="mb-2 text-[#dcc69c]">Oda Kategorisi*</h4>
            <select
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
              className="border-b w-full border-[#dcc69c4d] h-14 bg-transparent p-1 shadow-md hover:shadow-lg duration-300"
            >
              {categorys
                ? categorys?.map((category: CategoryI) => {
                    return (
                      <option
                        value={category.id}
                        key={category.id}
                        className="bg-[#2b1103]"
                      >
                        {category.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="flex-1">
            <p className="mb-4 text-[#dcc69c]">Fotoğraf 1*</p>
            <input
              type="file"
              onChange={(e) => {
                setFile1(e.target.files ? e?.target?.files[0] : undefined);
              }}
              className="border border-[#dcc69c4d] rounded-xl text-[#dcc69c] shadow-md hover:shadow-xl duration-300"
            />
          </div>
          <div className="flex-1">
            <p className="mb-4 text-[#dcc69c]">Fotoğraf 2</p>
            <input
              type="file"
              onChange={(e) => {
                setFile2(e.target.files ? e?.target?.files[0] : undefined);
              }}
              className="border border-[#dcc69c4d] rounded-xl text-[#dcc69c] shadow-md hover:shadow-xl duration-300"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-10 mt-8">
          <div className="flex-1">
            <p className="mb-4 text-[#dcc69c]">Fotoğraf 3</p>
            <input
              type="file"
              onChange={(e) => {
                setFile3(e.target.files ? e?.target?.files[0] : undefined);
              }}
              className="border border-[#dcc69c4d] rounded-xl text-[#dcc69c] shadow-md hover:shadow-xl duration-300"
            />
          </div>
          <div className="flex-1">
            <p className="mb-4 text-[#dcc69c]">Fotoğraf 4</p>
            <input
              type="file"
              onChange={(e) => {
                setFile4(e.target.files ? e?.target?.files[0] : undefined);
              }}
              className="border border-[#dcc69c4d] rounded-xl text-[#dcc69c] shadow-md hover:shadow-xl duration-300"
            />
          </div>
        </div>
      </div>
      <button className="btn mt-5" onClick={addRoom}>
        Oda Ekle
      </button>
    </section>
  );
}

export default AddRoom;
