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
      style={{ marginBottom: "4rem" }}
    >
      {/* Section Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        marginBottom: "1.4rem",
      }}>
        {/* Colored left bar */}
        <div style={{ width: 4, height: 36, borderRadius: 4, background: cfg.color, flexShrink: 0 }} />

        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: cfg.bg, border: `1px solid ${cfg.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0,
          }}>
            {cfg.icon}
          </div>
          <div>
            <div style={{
              fontFamily: "Syne, sans-serif", fontWeight: 800,
              fontSize: "1.25rem", letterSpacing: "-0.03em", color: "#eeeef2", lineHeight: 1,
            }}>
              {category}
            </div>
            <div style={{ fontSize: 11, color: cfg.color, fontWeight: 500, marginTop: 2 }}>
              {items.length} item{items.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div style={{
          flex: 1, height: 1,
          background: `linear-gradient(90deg, ${cfg.border}, transparent)`,
          marginLeft: 4,
        }} />
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))",
        gap: 14,
      }}>
        {items.map((item, i) => (
          <ItemCard key={item.itemname} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  );
}