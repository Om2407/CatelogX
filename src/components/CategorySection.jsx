import { motion } from "framer-motion";
import ItemCard from "./ItemCard";
import { CAT_CONFIG } from "../data/catalog";

export default function CategorySection({ category, items }) {
  const cfg = CAT_CONFIG[category];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ marginBottom: "3.5rem" }}
    >
      {/* Section Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "1.25rem", paddingBottom: "1rem",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Icon chip */}
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: cfg.bg, border: `1px solid ${cfg.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>
            {cfg.icon}
          </div>
          <span style={{
            fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem",
            letterSpacing: "-0.02em", color: "#eeeef2",
          }}>
            {category}
          </span>
          <span style={{ fontSize: 12, color: "#6b6b82", fontWeight: 400, fontFamily: "Inter, sans-serif" }}>
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Colored accent line */}
        <div style={{ width: 32, height: 2, borderRadius: 2, background: cfg.color, opacity: 0.6 }} />
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
        gap: 14,
      }}>
        {items.map((item, i) => (
          <ItemCard key={item.itemname} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
