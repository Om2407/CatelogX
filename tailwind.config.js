/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        bg: { DEFAULT: "#08080a", 2: "#111115", 3: "#1a1a22", 4: "#22222c" },
        "border-subtle": "rgba(255,255,255,0.07)",
        "border-strong": "rgba(255,255,255,0.13)",
        muted: { DEFAULT: "#6b6b82", 2: "#9999b0" },
        cars: "#f5a623",
        bikes: "#e8366e",
        phones: "#36c9e8",
        computers: "#7c6af5",
      },
    },
  },
  plugins: [],
};
