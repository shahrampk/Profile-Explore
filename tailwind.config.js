/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      fontFamily: {
        "fira-code": '"Fira Code",monospace',
      },
      minWidth: {
        aside: "350px",
      },
      height: {
        main: "160vh",
        searchBar: "60px",
      },
      width: {
        searchBar: "60px",
      },
    },
  },
  plugins: [],
};
