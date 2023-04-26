import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
function BookRoomRec() {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [child, setChild] = useState(0);

  function addAgeInput() {
    let ages = document.querySelector(".ages");
    ages!.innerHTML += `<input
          type="number"
          max="13"  
          min="0"
          placeholder="age"
          class="border border-1"
        />`;
  }

  function createagesList() {
    let ages = document.querySelector(".ages");
    let arr: any = [];
    ages?.childNodes.forEach((element: any) => {
      arr.push(parseInt(element.value));
    });
    return arr;
  }

  const bookRoom = async () => {
    createagesList();
    let resp = await fetch("http://127.0.0.1:8000/api/room/book-rec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 778b5ddfc21779014cf4f303a04acb2e544797eb",
      },
      body: JSON.stringify({
        startDate: value.startDate,
        endDate: value.endDate,
        child: child,
        ages: createagesList(),
      }),
    });
  };

  function removeAgeInput() {
    let ages = document.querySelector(".ages");
    ages?.removeChild(ages.lastChild!);
  }

  const handleValueChange = (newValue: any) => {
    setValue({
      startDate: new Date(newValue.startDate),
      endDate: new Date(newValue.endDate),
    });
  };

  return (
    <>
      <Datepicker value={value} onChange={handleValueChange} />
      <div className="flex gap-2 font-semibold">
        <div
          className="cursor-pointer"
          onClick={() => {
            if (child > 0) {
              setChild(child - 1);
              removeAgeInput();
            }
          }}
        >
          -
        </div>
        <div>{child}</div>
        <div
          className="cursor-pointer"
          onClick={() => {
            if (child < 6) {
              setChild(child + 1);
              addAgeInput();
            }
          }}
        >
          +
        </div>
      </div>
      <div className="ages"></div>
      <div onClick={bookRoom}>book</div>
    </>
  );
}

export default BookRoomRec;
