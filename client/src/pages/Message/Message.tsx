import { useLocation, useNavigate } from "react-router-dom";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineMail, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
function Message() {
  const location = useLocation();
  const { message } = location.state;
  const navigate = useNavigate();

  const deleteMessage = async (id: string) => {
    await fetch(`http://127.0.0.1:8000/api/message/${id}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: "Token " + localStorage.getItem("key"),
        "content-type": "application/json",
      },
    }).then(async (resp: Response) => {
      if (resp.status === 200) {
        navigate("/message/all");
        let data = await resp.json();
        toast.success(data.msg_tr);
      }
    });
  };

  return (
    <section className="text-white text-3xl">
      <div className="bg-[#421c08]/50 mt-5 p-5 rounded-lg shadow-md hover:shadow-lg duration-200">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold mb-3">{message.name}</h3>
          <AiFillDelete
            className="cursor-pointer"
            onClick={() => {
              deleteMessage(message.id);
            }}
          />
        </div>
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
