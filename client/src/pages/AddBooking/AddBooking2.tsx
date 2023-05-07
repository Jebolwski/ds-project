import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddBooking2() {
  const navigate = useNavigate();
  return (
    <section className="availability text-white text-3xl" id="availability">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let start: Date = e.target.check_in.value;
          let end: Date = e.target.check_out.value;
          if (start > end) {
            toast.error("Giriş tarihi çıkış tarihinden büyük olamaz. 😶");
            return;
          } else if (new Date(start) < new Date(Date.now())) {
            toast.error("Geçmiş bir tarihe rezervasyon alınamaz. 😞");
            return;
          }
          let adult: number = e.target.adult.value;
          let children: number = e.target.children.value;
          navigate(`/search-room/${start}/${end}/${children}/${adult}/2`);
        }}
      >
        <div className="flex">
          <div className="box">
            <p>
              Rezervasyon Giriş <span>*</span>
            </p>
            <input
              type="date"
              name="check_in"
              className="input h-[50px]"
              required
            />
          </div>
          <div className="box">
            <p>
              Rezervasyon Çıkış <span>*</span>
            </p>
            <input
              type="date"
              name="check_out"
              className="input h-[50px]"
              required
            />
          </div>
          <div className="box">
            <p>
              Yetişkin sayısı <span>*</span>
            </p>
            <select name="adult" className="input h-[50px]" required>
              <option value="1">1 Yetişkin </option>
              <option value="2">2 Yetişkin</option>
              <option value="3">3 Yetişkin</option>
              <option value="4">4 Yetişkin</option>
              <option value="5">5 Yetişkin</option>
              <option value="6">6 Yetişkin</option>
            </select>
          </div>
          <div className="box">
            <p>
              Çocuk Sayısı <span>*</span>
            </p>
            <select name="children" className="input h-[50px]" required>
              <option value="0">0 Çocuk</option>
              <option value="1">1 Çocuk</option>
              <option value="2">2 Çocuk</option>
              <option value="3">3 Çocuk</option>
              <option value="4">4 Çocuk</option>
              <option value="5">5 Çocuk</option>
              <option value="6">6 Çocuk</option>
            </select>
          </div>
        </div>
        <input
          type="submit"
          value="Müsaitliği kontrol et"
          name="check"
          className="btn"
        />
      </form>
    </section>
  );
}

export default AddBooking2;
