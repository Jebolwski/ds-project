import React from "react";
import { Message as MessageI } from "../../interfaces/Message";
import { useLocation } from "react-router-dom";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";

function Message() {
  const location = useLocation();
  const { message } = location.state;
  console.log(message);

  return (
    <section className="text-white text-3xl">
      <div className="bg-[#421c08]/50 mt-5 p-5 rounded-lg shadow-md hover:shadow-lg duration-200">
        <h3 className="font-semibold mb-3">{message.name}</h3>
        <p>{message.message}</p>
        <div className="flex justify-between flex-wrap items-center">
          <div className="flex gap-3 mt-3 items-center">
            <AiOutlineMail />
            <span>{message.mail}</span>
          </div>
          <div className="flex gap-3 mt-3 items-center">
            <AiFillPhone />
            <span>{message.number}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Message;
