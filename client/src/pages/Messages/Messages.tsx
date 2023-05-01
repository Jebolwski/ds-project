import { useState, useEffect } from "react";
import { Message as MessageI } from "../../interfaces/Message";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserSecret } from "react-icons/fa";
import { Link } from "react-router-dom";

function Messages() {
  const [messages, setMessages] = useState<MessageI[]>();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/message/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (resp: Response) => {
      if (resp.status == 200) {
        let data: any = await resp.json();
        setMessages(data.data);
      }
    });
  }, []);

  return (
    <section className="text-white text-3xl">
      {messages && messages?.length > 0 ? (
        <h3 className="font-semibold">Mesajlar</h3>
      ) : null}
      {messages && messages?.length > 0 ? (
        messages.map((message: MessageI) => {
          return (
            <Link
              to={`/message/${message.id}`}
              state={{ message: message }}
              className="bg-[#421c08]/50 block mt-5 p-5 rounded-lg shadow-md hover:shadow-lg duration-200"
            >
              <div className="flex flex-wrap sm:justify-between justify-center gap-4 items-center mb-4">
                <div className="flex items-center gap-2">
                  <FaUserSecret />
                  <span>{message.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{message.mail}</span>
                  <AiOutlineMail />
                </div>
              </div>
              {message.message.length > 75 ? (
                <p className="italic">{message.message.slice(0, 75)}...</p>
              ) : (
                <p className="italic">{message.message}</p>
              )}
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

export default Messages;
