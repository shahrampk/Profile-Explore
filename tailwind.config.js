/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "fira-code": '"Fira Code",monospace',
      },
      minWidth: {
        aside: "350px",
      },
      maxHeight: {
        main: "160vh",
      },
      height: {
        searchBar: "60px",
      },
      width: {
        searchBar: "60px",
      },
    },
  },
  plugins: [],
};
