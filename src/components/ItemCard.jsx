import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CAT_CONFIG } from "../data/catalog";
import { useState } from "react";

export default function ItemCard({ item, index = 0 }) {
  const navigate = useNavigate();
  const cfg = CAT_CONFIG[item.category];
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => navigate(`/item/${encodeURIComponent(item.itemname)}`)}
      style={{
        background: "#111115",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18,
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = cfg.border;
        e.currentTarget.style.boxShadow = `0 12px 40px ${cfg.bg}, 0 0 0 1px ${cfg.border}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div style={{ width: "100%", height: 175, overflow: "hidden", background: "#1a1a22", position: "relative", flexShrink: 0 }}>
        {!imgError ? (
          <motion.img
            src={item.image}
            alt={item.itemname}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.8rem" }}>
            {cfg.icon}
          </div>
        )}
        {/* Category badge */}
        <div style={{
          position: "absolute", top: 10, left: 10,
          background: cfg.bg, border: `1px solid ${cfg.border}`,
          color: cfg.color, padding: "3px 10px", borderRadius: 100,
          fontSize: 10, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
          backdropFilter: "blur(8px)",
        }}>
          {item.category}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{
          fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.95rem",
          letterSpacing: "-0.02em", marginBottom: 10, color: "#eeeef2",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {item.itemname}
        </div>

        {/* Props preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
          {item.itemprops.slice(0, 3).map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: "#6b6b82", fontWeight: 400 }}>{p.label}</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: "#9999b0", textAlign: "right", maxWidth: "58%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "auto",
        padding: "10px 16px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 11, color: "#6b6b82" }}>View details</span>
        <div style={{
          width: 26, height: 26, borderRadius: 7,
          background: "#1a1a22", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ArrowRight size={12} color="#9999b0" />
        </div>
      </div>
    </motion.div>
  );
}
