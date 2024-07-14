/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        loginPage: "#4FD1C5",
        border: "#E2E8F0",
        color1: "#4FD1C5",
        color2: "#F8F9FA",
        color3: "#A0AEC0",
        "green-custom": "#48BB78",
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        default: "250px 1fr",
      },
      gridTemplateRows: {
        default: "70px 1fr",
      },
      gridRow: {
        "span-sidebar": "span 3 / span 3",
      },
      gridColumn: {
        "span-sidebar": "span 1 / span 2",
        "span-content": " 2 /  -2",
      },
    },
  },
  plugins: [],
};
