/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        99: "50rem",
      },
      colors: {
        blue: "rgb(0 21 42)",
        pink: "rgba(255,56,92)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
