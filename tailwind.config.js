/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      xs: "390px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      backgroundImage: {
        "bg-image": "url('../dist/img/bg.jpeg')",
      },
      fontFamily: {
        body: ["Roboto Mono", "monospace"],
      },
      colors: {
        "mm-orange": "rgba(255,92,0,1)",
        "mm-black": "rgba(0, 0, 0, 1)",
        "mm-white": "rgba(83,86,90)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
