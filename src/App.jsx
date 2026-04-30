import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

export default function App() {
  const location = useLocation();
  return (
    <div style={{ minHeight:"100vh", background:"#08080a" }}>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/item/:name" element={<DetailPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
