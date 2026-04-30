import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { CATALOG, CATEGORIES, CAT_CONFIG } from "../data/catalog";
import CategorySection from "../components/CategorySection";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return CATALOG.filter(item => {
      const matchCat = activeFilter === "All" || item.category === activeFilter;
      const matchSearch = !q ||
        item.itemname.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.itemprops.some(p => p.label.toLowerCase().includes(q) || p.value.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [query, activeFilter]);

  const groupedByCategory = useMemo(() => {
    const cats = activeFilter === "All" ? CATEGORIES : [activeFilter];
    return cats.map(cat => ({
      category: cat,
      items: filtered.filter(i => i.category === cat),
    })).filter(g => g.items.length > 0);
  }, [filtered, activeFilter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <div style={{
        padding: "clamp(3rem,8vw,5.5rem) clamp(1rem,4vw,2.5rem) 2.5rem",
        textAlign: "center",
        background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(124,106,245,0.18) 0%, transparent 65%)",
      }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(124,106,245,0.1)", border: "1px solid rgba(124,106,245,0.25)",
            borderRadius: 100, padding: "5px 14px 5px 10px", marginBottom: "1.5rem",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c6af5" }}
          />
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a09af5" }}>
            Multi-Category Catalog
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
            lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "1rem",
          }}
        >
          <span style={{ color: "#eeeef2" }}>Explore Every </span>
          <span style={{
            background: "linear-gradient(135deg, #7c6af5, #36c9e8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Category</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: "#9999b0", fontSize: "clamp(0.9rem,2vw,1rem)", maxWidth: 380, margin: "0 auto 2rem", lineHeight: 1.7, fontWeight: 300 }}
        >
          Browse Cars, Bikes, Phones & Computers — all in one sleek catalog
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: "0.5rem" }}
        >
          {CATEGORIES.map(cat => {
            const cfg = CAT_CONFIG[cat];
            const count = CATALOG.filter(i => i.category === cat).length;
            return (
              <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color }} />
                <span style={{ fontSize: 12, color: "#6b6b82" }}>{count} {cat}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ maxWidth: 500, margin: "0 auto 1.5rem", padding: "0 clamp(1rem,4vw,2.5rem)" }}
      >
        <div style={{
          position: "relative", display: "flex", alignItems: "center",
          background: "#111115", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 12, transition: "border-color 0.2s",
        }}
          onFocus={e => e.currentTarget.style.borderColor = "rgba(124,106,245,0.5)"}
          onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}
        >
          <Search size={16} color="#6b6b82" style={{ position: "absolute", left: 14, pointerEvents: "none" }} />
          <input
            type="text"
            placeholder="Search items, specs, categories…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: "100%", padding: "11px 14px 11px 42px",
              background: "transparent", border: "none", outline: "none",
              color: "#eeeef2", fontFamily: "Inter, sans-serif", fontSize: 13.5,
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{
              position: "absolute", right: 12, background: "none", border: "none",
              color: "#6b6b82", cursor: "pointer", fontSize: 16, lineHeight: 1,
            }}>✕</button>
          )}
        </div>
      </motion.div>

      {/* Filter Pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", padding: "0 1rem 2.5rem" }}
      >
        {["All", ...CATEGORIES].map(cat => {
          const isActive = activeFilter === cat;
          const cfg = cat !== "All" ? CAT_CONFIG[cat] : null;
          return (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(cat)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 18px", borderRadius: 100, fontSize: 12, fontWeight: 500,
                letterSpacing: "0.04em", cursor: "pointer", fontFamily: "Inter, sans-serif",
                border: isActive && cfg ? `1px solid ${cfg.border}` : "1px solid rgba(255,255,255,0.12)",
                background: isActive && cfg ? cfg.bg : isActive ? "#22222c" : "transparent",
                color: isActive && cfg ? cfg.color : isActive ? "#eeeef2" : "#9999b0",
                transition: "all 0.18s",
              }}
            >
              {cfg && <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color }} />}
              {cat}
              {cat !== "All" && (
                <span style={{ fontSize: 10, opacity: 0.7 }}>
                  ({CATALOG.filter(i => i.category === cat).length})
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Catalog content */}
      <div style={{ padding: "0 clamp(1rem,4vw,2.5rem) 5rem" }}>
        {groupedByCategory.length > 0 ? (
          groupedByCategory.map(({ category, items }) => (
            <CategorySection key={category} category={category} items={items} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", padding: "5rem 2rem", color: "#6b6b82" }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.4 }}>🔍</div>
            <p style={{ fontSize: 14 }}>No items match your search.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
