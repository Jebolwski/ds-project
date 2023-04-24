import React from "react";

function AddRoomCategory() {
  return (
    <section className="text-white text-3xl">
      <div>
        <div className="flex flex-wrap gap-10">
          <div className="flex-1">
            <h4 className="mb-2 text-[#dcc69c] whitespace-nowrap">
              Kategori Adı*
            </h4>
            <input
              type="text"
              className="bg-transparent text-[#dcc69c] h-14 border-b w-full border-[#dcc69c4d]"
            />
          </div>
          <div className="flex-1">
            <p className="mb-2 text-[#dcc69c] whitespace-nowrap">
              Maksimum Yetişkin Sayısı*
            </p>
            <select className="border-b w-full border-[#dcc69c4d] h-14 bg-transparent p-1 shadow-md hover:shadow-lg duration-300">
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
            <select className="border-b w-full border-[#dcc69c4d] h-14 bg-transparent p-1 shadow-md hover:shadow-lg duration-300">
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
              type="number"
              maxLength={2}
              className="bg-transparent h-14 w-full placeholder-[#dcc69c99] border-b p-1 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
            />
          </div>
        </div>
        <div className="mt-10">
          <h4 className="mb-2 text-[#dcc69c]">Açıklama*</h4>
          <textarea className="w-full bg-transparent border-b border-[#dcc69c4d]"></textarea>
        </div>
      </div>
      <button className="btn">Kategori Ekle</button>
    </section>
  );
}

export default AddRoomCategory;
