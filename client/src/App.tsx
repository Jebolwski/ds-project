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
import BookRoomRec from "./pages/BookRoomRec/BookRoomRec";
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

const stripe_key = REACT_APP_STRIPE_KEY;
const stripePromise = loadStripe(stripe_key);
function App() {
  return (
    <div className="font-sans">
      <GoogleOAuthProvider clientId={GOOGLE_ID}>
        <Router>
          <Elements stripe={stripePromise}>
            {/* Same as */}
            <HotelProvider>
              <AuthProvider>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/bookrec" element={<BookRoomRec />} />
                  <Route path="/checkout/" index element={<CheckOut />} />
                  {/* Sadece Yönetici */}
                  <Route element={<SuperUserProtect />}>
                    {/* Oda Silme */}
                    <Route path="/room/:id/delete" element={<DeleteRoom />} />
                    <Route
                      path="/rezervation/all"
                      element={<AllRezervations />}
                    />
                  </Route>
                  {/* Sadece Resepsiyon ve Yönetici */}
                  <Route element={<ReceptionistProtect />}>
                    {/* Rezervasyon Detay */}
                    <Route
                      path="/rezervation/:id"
                      element={<RezervationDetail />}
                    />
                    <Route path="/room/all" element={<Rooms />} />
                    <Route path="/room/:id" element={<Room />} />

                    <Route
                      path="/room-category/all"
                      element={<RoomCategories />}
                    />
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
                    <Route path="/message/all" element={<Messages />} />
                    <Route path="/message/:id" element={<Message />} />
                  </Route>
                  <Route path="/checkout/success/" element={<Success />} />
                  <Route path="/checkout/failed/" element={<Cancel />} />
                  <Route
                    path="/search-room/:start/:end/:children/:adult"
                    element={<SearchRoom />}
                  />
                  <Route path="/rezervation/my" element={<MyRezervations />} />
                  {/* Sadece Giriş Yapmamışlar */}
                  <Route element={<AuthProtect />}>
                    {/* Giriş */}
                    <Route path="/login" element={<Login />} />
                    {/* Kayıt */}
                    <Route path="/register" element={<Register />} />
                  </Route>
                </Routes>
                <Footer />
              </AuthProvider>
            </HotelProvider>
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
