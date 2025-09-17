/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
        sx: "400px",
      },
      fontFamily: {
        Lato: '"Lato", sans-serif',
      },
      minWidth: {
        aside: "350px",
      },
      height: {
        main: "140vh",
        searchBar: "60px",
      },
      backgroundColor: {
        primary: "#051422",
        background: "#090C9B",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right bottom,#090C9B ,#1b1b35)",
      },
      width: {
        searchBar: "60px",
      },
      boxShadowColor: {
        primary: "#051422",
      },
    },
  },
  plugins: [],
};
