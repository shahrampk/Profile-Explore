/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "fira-code": '"Fira Code",monospace',
      },
      height: {
        main: "150vh",
      },
      minWidth: {
        aside: "350px",
      },
    },
  },
  plugins: [],
};
