import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/context";
import { HotelProvider } from "./context/hotelcontext";
import Login from "./pages/Login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import AuthProtect from "./pages/Protected/AuthProtect";
import Footer from "./components/Footer/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { REACT_APP_STRIPE_KEY, GOOGLE_ID } from "./config/config";
import CheckOut from "./pages/CheckOut/CheckOut";
import Success from "./pages/Success/Success";
import Cancel from "./pages/Cancel/Cancel";
import Register from "./pages/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchRoom from "./pages/SearchRoom/SearchRoom";
import RezervationDetail from "./pages/RezervationDetail/RezervationDetail";
import AddRoom from "./pages/AddRoom/AddRoom";
import AddRoomCategory from "./pages/AddRoomCategory/AddRoomCategory";
import ReceptionistProtect from "./pages/Protected/ReceptionistProtect";
import SuperUserProtect from "./pages/Protected/SuperUserProtect";
import DeleteRoom from "./pages/DeleteRoom/DeleteRoom";
import DeleteCategory from "./pages/DeleteCategory/DeleteCategory";
import AllRezervations from "./pages/AllRezervations/AllRezervations";
import Messages from "./pages/Messages/Messages";
import Rooms from "./pages/Rooms/Rooms";
import RoomCategories from "./pages/RoomCategories/RoomCategories";
import Message from "./pages/Message/Message";
import RoomCategory from "./pages/RoomCategory/RoomCategory";
import Room from "./pages/Room/Room";
import MyRezervations from "./pages/MyRezervations/MyRezervations";
import LoggedIn from "./pages/Protected/LoggedIn";
import Questions from "./pages/Questions/Questions";
import AddBooking2 from "./pages/AddBooking/AddBooking2";
import AddBooking from "./pages/AddBooking/AddBooking";
import SearchRoom2 from "./pages/SearchRoom/SearchRoom2";
import CancelRezervation from "./pages/CancelRezervation/CancelRezervation";
import DeleteRezervation from "./pages/DeleteRezervation/DeleteRezervation";

const stripe_key = REACT_APP_STRIPE_KEY;
const stripePromise = loadStripe(stripe_key);
function App() {
  return (
    <div className="font-sans">
      <GoogleOAuthProvider clientId={GOOGLE_ID}>
        <Router>
          <Elements stripe={stripePromise}>
            {/* Same as */}
            <AuthProvider>
              <HotelProvider>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* Sadece Yönetici */}
                  <Route element={<SuperUserProtect />}>
                    {/* Oda Silme */}
                    <Route path="/room/:id/delete" element={<DeleteRoom />} />
                    <Route
                      path="/rezervation/all"
                      element={<AllRezervations />}
                    />
                    {/* Rezervasyonu Sil */}
                    <Route
                      path="/rezervation/:id/delete"
                      element={<DeleteRezervation />}
                    />
                  </Route>
                  {/* Sadece Resepsiyon ve Yönetici */}
                  <Route element={<ReceptionistProtect />}>
                    {/* Rezervasyon Detay */}
                    <Route
                      path="/rezervation/:id"
                      element={<RezervationDetail />}
                    />

                    {/* Bütün Odalar */}
                    <Route path="/room/all" element={<Rooms />} />

                    {/* Bütün Oda Kategorileri */}
                    <Route
                      path="/room-category/all"
                      element={<RoomCategories />}
                    />
                    {/* Oda Kategorisi Detay */}
                    <Route
                      path="/room-category/:id"
                      element={<RoomCategory />}
                    />

                    {/* Oda Ekle */}
                    <Route path="/room/add/" element={<AddRoom />} />
                    {/* Kategori Ekle */}
                    <Route
                      path="/room-category/add/"
                      element={<AddRoomCategory />}
                    />
                    {/* Oda Sil */}
                    <Route path="/room/:id/delete" element={<DeleteRoom />} />
                    {/* Kategori Sil */}
                    <Route
                      path="/room-category/:id/delete"
                      element={<DeleteCategory />}
                    />
                    {/* Bütün Mesajlar */}
                    <Route path="/message/all" element={<Messages />} />
                    {/* Mesaj Detay */}
                    <Route path="/message/:id" element={<Message />} />
                    {/* Add Rezervation */}
                    <Route
                      path="/rezervation/add/select"
                      element={<AddBooking2 />}
                    />
                    <Route path="/rezervation/add" element={<AddBooking />} />
                    {/* Odaları Arama */}
                    <Route
                      path="/search-room/:start/:end/:children/:adult/2"
                      element={<SearchRoom2 />}
                    />
                  </Route>
                  {/* Müşteriler */}
                  <Route element={<LoggedIn />}>
                    {/* Ödeme Başarılıysa */}
                    <Route path="/checkout/success/" element={<Success />} />
                    {/* Ödeme Başarısızsa */}
                    <Route path="/checkout/failed/" element={<Cancel />} />
                    {/* Kendi Rezervasyonlarım */}
                    <Route
                      path="/rezervation/my"
                      element={<MyRezervations />}
                    />
                    {/* Ödeme sayfası */}
                    <Route path="/checkout/" element={<CheckOut />} />
                    {/* Rezervasyonun İptali */}
                    <Route
                      path="/rezervation/:id/cancel"
                      element={<CancelRezervation />}
                    />
                  </Route>
                  {/* Müsait oda bakma */}
                  <Route
                    path="/search-room/:start/:end/:children/:adult"
                    element={<SearchRoom />}
                  />
                  {/* Oda Detay */}
                  <Route path="/room/:id" element={<Room />} />
                  {/* Sadece Giriş Yapmamışlar */}
                  <Route element={<AuthProtect />}>
                    {/* Giriş */}
                    <Route path="/login" element={<Login />} />
                    {/* Kayıt */}
                    <Route path="/register" element={<Register />} />
                  </Route>
                  <Route path="/questions" element={<Questions />} />
                </Routes>
                <Footer />
              </HotelProvider>
            </AuthProvider>
          </Elements>
        </Router>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
