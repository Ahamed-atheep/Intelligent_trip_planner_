import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/Landingpage";
import Form from "./Pages/Form.jsx";
// import TripDetail from "./pages/TripDetail";

export default function App() {
  // you’ll later fetch real trip by id for TripDetail
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<Form />} />
        {/* <Route path="/trip/:id" element={<TripDetail />} />  */}
      </Routes>
    </BrowserRouter>
  );
}
