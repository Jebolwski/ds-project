import { useContext, useEffect } from "react";
import HotelContext from "../../context/hotelcontext";
function Questions() {
  useEffect(() => {
    let box = document.querySelectorAll(".contact .row .faq .box");
    if (box.length > 0) {
      box.forEach((faqBox: any) => {
        faqBox.onclick = () => {
          faqBox.classList.toggle("active");
        };
      });
    }
  });
  const { sendMessage }: any = useContext(HotelContext);
  return (
    <section className="contact" id="contact">
      <div className="row">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            let name: string = e.target.name.value;
            let email: string = e.target.email.value;
            let number: number = e.target.number.value;
            let message: string = e.target.msg.value;
            sendMessage(name, email, number, message);
            e.target.msg.value = "";
            e.target.email.value = "";
            e.target.number.value = "";
            e.target.name.value = "";
          }}
          className="selection:bg-[#dcc69c] selection:text-[#2b1103]"
        >
          <h3>Bize mesaj gönderin</h3>
          <input
            type="text"
            name="name"
            placeholder="isim ve soyisminizi girin"
            required
            maxLength={70}
            className="box"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="email adresinizi girin"
            maxLength={100}
            className="box"
          />
          <input
            type="text"
            pattern="\d*"
            name="number"
            placeholder="numaranızı girin"
            required
            maxLength={11}
            className="box"
          />
          <textarea
            name="msg"
            className="box"
            required
            placeholder="mesajınızı girin"
            cols={30}
            rows={10}
            maxLength={150}
          ></textarea>
          <input
            type="submit"
            value="mesajı gönder"
            name="send"
            className="btn"
          />
        </form>

        <div className="faq">
          <h3 className="title">SIKÇA SORULAN SORULAR</h3>
          <div className="box active">
            <h3>Nasıl iptal ederim?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              sunt aspernatur excepturi eos! Quibusdam, sapiente.
            </p>
          </div>
          <div className="box">
            <h3>Boş oda var mı?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
              ipsam neque quaerat mollitia ratione? Soluta!
            </p>
          </div>
          <div className="box">
            <h3>Ödeme yöntemleri neler?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
              ipsam neque quaerat mollitia ratione? Soluta!
            </p>
          </div>
          <div className="box">
            <h3>Kupon kodumu nasıl kullanabilirim?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
              ipsam neque quaerat mollitia ratione? Soluta!
            </p>
          </div>
          <div className="box">
            <h3>Yaş gereksinimi nedir?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
              ipsam neque quaerat mollitia ratione? Soluta!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Questions;
