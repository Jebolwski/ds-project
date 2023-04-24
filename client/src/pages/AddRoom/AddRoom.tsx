import React from "react";

function AddRoom() {
  return (
    <section className="text-white text-3xl">
      <div>
        <div className="flex flex-wrap gap-10">
          <div className="flex-1">
            <h4 className="mb-2 text-[#dcc69c]">Oda Kategorisi*</h4>
            <select className="border-b w-full border-[#dcc69c4d] h-14 bg-transparent p-1 shadow-md hover:shadow-lg duration-300">
              <option value="1" className="bg-[#2b1103]">
                Deluxe Oda
              </option>
              <option value="2" className="bg-[#2b1103]">
                2 Yataklı Oda
              </option>
              <option value="3" className="bg-[#2b1103]">
                Tekli Oda
              </option>
            </select>
          </div>
          <div className="flex-1">
            <p className="mb-4 text-[#dcc69c]">Fotoğraf 1*</p>
            <input
              type="file"
              className="border border-[#dcc69c4d] rounded-xl text-[#dcc69c] shadow-md hover:shadow-xl duration-300"
            />
          </div>
          <div className="flex-1">
            <p className="mb-4 text-[#dcc69c]">Fotoğraf 2</p>
            <input
              type="file"
              className="border border-[#dcc69c4d] rounded-xl text-[#dcc69c] shadow-md hover:shadow-xl duration-300"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-10 mt-8">
          <div className="flex-1">
            <p className="mb-4 text-[#dcc69c]">Fotoğraf 3</p>
            <input
              type="file"
              className="border border-[#dcc69c4d] rounded-xl text-[#dcc69c] shadow-md hover:shadow-xl duration-300"
            />
          </div>
          <div className="flex-1">
            <p className="mb-4 text-[#dcc69c]">Fotoğraf 4</p>
            <input
              type="file"
              className="border border-[#dcc69c4d] rounded-xl text-[#dcc69c] shadow-md hover:shadow-xl duration-300"
            />
          </div>
        </div>
      </div>
      <button className="btn mt-5">Oda Ekle</button>
    </section>
  );
}

export default AddRoom;
