import { Message as MessageI } from "../../interfaces/Message";
import { useLocation } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdChildFriendly } from "react-icons/md";
import { BsPersonVcardFill } from "react-icons/bs";
function RoomCategory() {
  const location = useLocation();
  const { category } = location.state;
  console.log(category);

  return (
    <section className="text-white text-3xl">
      <div className="bg-[#421c08]/50 mt-5 p-5 rounded-lg shadow-md hover:shadow-lg duration-200">
        <h3 className="font-semibold mb-3">{category.name}</h3>
        <p className="italic mb-3">{category.desc}</p>
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
      </div>
    </section>
  );
}

export default RoomCategory;
