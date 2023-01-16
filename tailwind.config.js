/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        99: "50rem",
      },
      colors: {
        blue: "rgb(0 21 42)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
