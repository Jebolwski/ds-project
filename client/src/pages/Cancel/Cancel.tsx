import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <>
      <section className="text-white">
        <h3 className="text-center text-[2.3rem]">Ödeme başarısız oldu! 😒</h3>
        <div className="text-center">
          <Link to={"/"} className="btn mt-10">
            Anasayfaya dön
          </Link>
        </div>
      </section>
    </>
  );
};

export default Cancel;
