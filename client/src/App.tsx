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
                  </Route>
                  {/* Sadece Resepsiyon ve Yönetici */}
                  <Route element={<ReceptionistProtect />}>
                    {/* Rezervasyon Detay */}
                    <Route
                      path="/rezervation/:id"
                      element={<RezervationDetail />}
                    />
                    {/* Oda Ekle */}
                    <Route path="/room/add/" element={<AddRoom />} />
                    {/* Kategori Ekle */}
                    <Route
                      path="/room-category/add/"
                      element={<AddRoomCategory />}
                    />
                  </Route>
                  <Route path="/checkout/success/" element={<Success />} />
                  <Route path="/checkout/failed/" element={<Cancel />} />
                  <Route
                    path="/search-room/:start/:end/:children/:adult"
                    element={<SearchRoom />}
                  />
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
