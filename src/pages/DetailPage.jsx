import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { CATALOG, CAT_CONFIG } from "../data/catalog";

export default function DetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const item = CATALOG.find(d => d.itemname === decodeURIComponent(name));
  if (!item) {
    return (
      <div style={{ textAlign: "center", padding: "8rem 2rem", color: "#6b6b82" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😕</div>
        <p>Item not found.</p>
        <button onClick={() => navigate("/")} style={{ marginTop: "1rem", color: "#7c6af5", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>
          ← Back to catalog
        </button>
      </div>
    );
  }

  const cfg = CAT_CONFIG[item.category];
  const related = CATALOG.filter(d => d.category === item.category && d.itemname !== item.itemname).slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ambient glow behind the page */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "50vh", pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse 60% 40% at 60% 0%, ${cfg.bg} 0%, transparent 70%)`,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "2.5rem clamp(1rem,4vw,2.5rem) 3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Image column */}
          <motion.div variants={childVariants}>
            <div style={{
              borderRadius: 20,
              overflow: "hidden",
              background: "#1a1a22",
              border: `1px solid ${cfg.border}`,
              aspectRatio: "4/3",
              boxShadow: `0 20px 60px ${cfg.bg}`,
            }}>
              {!imgError ? (
                <img
                  src={item.image}
                  alt={item.itemname}
                  onError={() => setImgError(true)}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem" }}>
                  {cfg.icon}
                </div>
              )}
            </div>
          </motion.div>

          {/* Info column */}
          <div>
            {/* Category badge */}
            <motion.div variants={childVariants}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: cfg.bg, border: `1px solid ${cfg.border}`,
                borderRadius: 100, padding: "5px 13px", marginBottom: "1.2rem",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: cfg.color }}>
                  {item.category}
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={childVariants} style={{
              fontFamily: "Syne, sans-serif", fontWeight: 800,
              fontSize: "clamp(1.8rem,4vw,2.4rem)",
              lineHeight: 1.08, letterSpacing: "-0.04em",
              color: "#eeeef2", marginBottom: "2rem",
            }}>
              {item.itemname}
            </motion.h1>

            {/* Specs label */}
            <motion.div variants={childVariants} style={{
              fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#6b6b82", marginBottom: "0.9rem",
            }}>
              Specifications
            </motion.div>

            {/* Specs list — dynamic from itemprops */}
            <motion.div variants={childVariants}>
              {item.itemprops.map((prop, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "13px 0",
                    borderBottom: i < item.itemprops.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <span style={{ fontSize: 13.5, color: "#9999b0", fontWeight: 400 }}>{prop.label}</span>
                  <span style={{
                    fontSize: 13.5, fontWeight: 600, color: "#eeeef2",
                    background: cfg.bg, border: `1px solid ${cfg.border}`,
                    padding: "3px 10px", borderRadius: 6,
                  }}>
                    {prop.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Total props count */}
            <motion.div variants={childVariants} style={{ marginTop: "1.5rem" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "#1a1a22", border: "1px solid rgba(255,255,255,0.08)",
                padding: "6px 14px", borderRadius: 8, fontSize: 12, color: "#6b6b82",
              }}>
                <span style={{ color: cfg.color, fontWeight: 600 }}>{item.itemprops.length}</span>
                &nbsp;spec{item.itemprops.length !== 1 ? "s" : ""} listed
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Related Items */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{ maxWidth: 960, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem) 5rem" }}
          >
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: "2rem", marginBottom: "1.25rem",
            }}>
              <h3 style={{
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem",
                letterSpacing: "-0.02em", color: "#9999b0",
              }}>
                More in <span style={{ color: "#eeeef2" }}>{item.category}</span>
              </h3>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 12,
            }}>
              {related.map((r, i) => (
                <motion.div
                  key={r.itemname}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  onClick={() => { navigate(`/item/${encodeURIComponent(r.itemname)}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{
                    background: "#111115",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12, overflow: "hidden", cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = cfg.border}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                >
                  <div style={{ height: 110, overflow: "hidden", background: "#1a1a22" }}>
                    <img
                      src={r.image} alt={r.itemname}
                      onError={e => { e.target.style.display = "none"; }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s" }}
                    />
                  </div>
                  <div style={{
                    padding: "9px 11px", display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <span style={{
                      fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.78rem",
                      letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      color: "#eeeef2", maxWidth: "80%",
                    }}>
                      {r.itemname}
                    </span>
                    <ArrowRight size={10} color="#6b6b82" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
