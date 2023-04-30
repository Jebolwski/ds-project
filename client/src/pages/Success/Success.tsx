import { Link } from "react-router-dom";

const Success = () => {
  return (
    <>
      <section className="text-white">
        <h3 className="text-center text-[2.3rem]">
          Ödeme başarıyla gerçekleştirildi! ✨
        </h3>
        <div className="text-center">
          <Link to={"/"} className="btn mt-10">
            Anasayfaya dön
          </Link>
        </div>
      </section>
    </>
  );
};

export default Success;
