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
    },
  },
  plugins: [],
};
