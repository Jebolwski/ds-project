import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/context";
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

const stripe_key = REACT_APP_STRIPE_KEY;
const stripePromise = loadStripe(stripe_key);
function App() {
  return (
    <div className="font-sans">
      <GoogleOAuthProvider clientId={GOOGLE_ID}>
        <Router>
          <Elements stripe={stripePromise}>
            <AuthProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bookrec" element={<BookRoomRec />} />
                <Route path="/checkout/" index element={<CheckOut />} />
                <Route path="/checkout/success/" element={<Success />} />
                <Route path="/checkout/failed/" element={<Cancel />} />
                <Route element={<AuthProtect />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
              </Routes>
              <Footer />
            </AuthProvider>
          </Elements>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
