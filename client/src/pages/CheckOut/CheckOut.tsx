import { API_URL } from "src/config/config";
import "./CheckOut.css";

const CheckOut = () => {
  return (
    <>
      <section className="text-white text-2xl">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="flex-1 min-w-[370px]">
            {/* Yetişkin */}
            <div className="mb-10">
              <p className="text-3xl mb-3">1. Yetişkin</p>
              <div className="my-1">
                <input
                  type="text"
                  placeholder="adı soyadı"
                  className="bg-transparent w-full placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                />
              </div>
              <div className="my-1">
                <input
                  type="text"
                  maxLength={11}
                  placeholder="tc kimlik no"
                  className="bg-transparent w-full placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                />
              </div>
            </div>
            {/* Yetişkin */}
            <div className="mb-10">
              <p className="text-3xl mb-3">2. Yetişkin</p>
              <div className="my-1">
                <input
                  type="text"
                  placeholder="adı soyadı"
                  className="bg-transparent w-full placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                />
              </div>
              <div className="my-1">
                <input
                  type="text"
                  maxLength={11}
                  placeholder="tc kimlik no"
                  className="bg-transparent w-full placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                />
              </div>
            </div>
            {/* Çocuk */}
            <div className="mb-10">
              <p className="text-3xl mb-3">1. Çocuk</p>
              <div className="my-1">
                <input
                  type="text"
                  placeholder="adı soyadı"
                  className="bg-transparent w-full placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                />
              </div>
              <div className="flex items-center gap-5">
                <div className="my-1 flex-1">
                  <input
                    type="text"
                    maxLength={11}
                    placeholder="tc kimlik no"
                    className="bg-transparent w-full placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                  />
                </div>
                <div className="my-1 flex-1">
                  <input
                    type="number"
                    maxLength={2}
                    placeholder="yaş"
                    className="bg-transparent w-full placeholder-[#dcc69c99] border-b p-2 py-3 text-[1.8rem] selection:text-[#2b1103] text-[#dcc69c] border-[#dcc69c4d] mb-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[370px]">
            <h3 className="text-3xl font-semibold text-[#dcc69c]">Özet</h3>
            <p className="my-4 text-3xl">Deluxe Oda</p>
            <span className="my-4 text-3xl">2 Yetişkin - 1 Çocuk</span>
            <p className="my-4 text-3xl">21 Nisan - 26 Nisan arası</p>
            <p className="my-4 text-3xl">Toplam : 2449.98₺</p>
            <button className="btn w-full">Ödeme Yap</button>
          </div>
        </div>

        {/* <form action={`${API_URL}/api/payment`} method="POST">
          <input type="hidden" name="product_name" value="test_product" />
          <input type="hidden" name="price" value={89.99 * 100} />
          <button className="btn-checkout" type="submit">
            Checkout
          </button>
        </form> */}
      </section>
    </>
  );
};

export default CheckOut;
