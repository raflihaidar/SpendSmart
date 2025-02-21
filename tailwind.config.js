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
        border: "#D9D9D9",
        main: "#F5F7F9",
        secondary: "#FDFDFD",
        third: "#00A00D",
        fourth: "#EFF1F3",
        charcoal: "#495057",
        "txt-secondary": "#9B9EA1",
        "green-pastel": "#E2F4E9",
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        default: "330px 1fr",
      },
      gridTemplateRows: {
        default: "1fr",
      },
      gridRow: {
        "span-sidebar": "span 3 / span 3",
      },
      gridColumn: {
        "span-sidebar": " 1 /  2",
        "span-sidebar-mobile": "-1 / 2",
        "span-content": " 2 /  -2",
        "span-content-mobile": "1 / -2",
      },
    },
  },
  plugins: [],
};
