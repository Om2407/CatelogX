import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetail = location.pathname.startsWith("/item/");

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(1rem,4vw,2.5rem)", height: 58,
      background: "rgba(8,8,10,0.88)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.03em" }}
      >
        <span style={{ color: "#eeeef2" }}>Catalog</span>
        <span style={{ color: "#7c6af5" }}>X</span>
      </div>

      {/* Back button on detail page */}
      <AnimatePresence>
        {isDetail && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => navigate("/")}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "rgba(26,26,34,0.9)", border: "1px solid rgba(255,255,255,0.12)",
              color: "#9999b0", padding: "7px 14px", borderRadius: 9,
              fontSize: 12, fontFamily: "Inter, sans-serif", cursor: "pointer",
              letterSpacing: "0.02em", transition: "all 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#eeeef2"; e.currentTarget.style.background = "#22222c"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#9999b0"; e.currentTarget.style.background = "rgba(26,26,34,0.9)"; }}
          >
            <ArrowLeft size={13} />
            Back to Catalog
          </motion.button>
        )}
      </AnimatePresence>
    </nav>
  );
}
