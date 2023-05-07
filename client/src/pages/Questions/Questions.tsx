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
            <div>
              <p>
                Otel rezervasyonunuzu iptal etmek için aşağıdaki adımları takip
                edebilirsiniz:
              </p>
              <p>
                1. Otel web sitemize giriş yapın ve “Rezervasyonlarım” bölümüne
                gidin.
              </p>
              <p>
                2. İptal etmek istediğiniz rezervasyonunuzu seçin. “İptal Et”
                butonuna tıklayın.
              </p>
              <p>
                3. İptal işleminizi tamamlamak için İptal Et” butonuna tıklayın.
              </p>
              <p>
                4. Lütfen iptal işlemi için son iptal tarihini geçirmeden önce
                işlem yapın, aksi takdirde iptal işlemi gerçekleştirilemeyebilir
                veya ücret iadesi yapılmayabilir.
              </p>
            </div>
          </div>
          <div className="box">
            <h3>Boş oda var mı?</h3>
            <p>
              Bunun için anasayfadan gerekli verileri girerek müsait odaları
              görebilirsiniz.
            </p>
          </div>
          <div className="box">
            <h3>Ödeme yöntemleri neler?</h3>
            <div>
              <p>
                Otellerimizde konaklamalarınız için çeşitli ödeme yöntemleri
                sunmaktayız. Kabul ettiğimiz ödeme yöntemleri şunlardır:
              </p>
              <p>
                Kredi kartı: Otelimizde konaklamanız için kredi kartı ile ödeme
                yapabilirsiniz. Kabul ettiğimiz kredi kartları Visa, Mastercard
                ve American Express'tir. Kredi kartı ile ödeme yapmak isteyen
                müşterilerimiz, web sitemizdeki ödeme sayfasında kredi kartı
                bilgilerini girmeleri gerekmektedir.
              </p>
              <p>
                Banka havalesi: Konaklama için ödeme yapmak için banka havalesi
                yöntemini de kabul etmekteyiz. Banka havalesi ile ödeme yapmak
                isteyen müşterilerimiz, otelimiz tarafından sağlanan banka hesap
                bilgilerine gönderme yapabilirler.
              </p>
              <p>
                Ön ödemeli kartlar: Bazı otellerimiz ön ödemeli kartlarla ödeme
                yapmanıza izin vermektedir. Bu kartlar ödeme yapmadan önce
                yüklendiği için, güvenli bir ödeme yöntemi olarak kabul edilir.
              </p>
              <p>
                Lütfen dikkat edin: Kabul ettiğimiz ödeme yöntemleri otelimize
                göre farklılık gösterir. Ödeme yöntemlerinin değişebileceğini
                unutmayın, bu nedenle web sitemizdeki ödeme sayfasını ziyaret
                etmeden önce en güncel bilgiler için bizimle iletişime geçin.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
                ipsam neque quaerat mollitia ratione? Soluta!
              </p>
            </div>
          </div>

          <div className="box">
            <h3>Yaş gereksinimi nedir?</h3>
            <p>
              0-12 yaş arası çocuk olarak kabul edilir. 12 yaşından büyükler
              yetişkin olarak kabul edilir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Questions;
