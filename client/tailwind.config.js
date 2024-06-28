/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.6rem",
      },
      colors: {
        beige: {
          100: "#FFFCE0",
          200: "#FCF4D7",
          300: "#FAEDCD",
          400: "#E7C8A0",
          500: "#D4A373",
          600: "#C3B091",
          700: "#C8AD7F",
          800: "#A67B5B",
        },
        "purple-haze": "#B9A7BB",
        "raw-purple": "#603F8B",
        "gunmetal-gray": "#616C59",
        "grey-blue": "#667fae",
        sakura: "#9a8c98",
        "sakura-hover": "#c9ada7",
        "sakura-hover-text": "#22223b",
        "navy-purple": "#4a4e69",
      },
      translate: {
        55: "220px",
      },
      width: {
        124: "31rem",
      },
      inset: {
        18: "4.5rem",
      },
      borderRadius: {
        "4xl": "28px",
        "5xl": "32px",
      },
    },
  },
  plugins: [],
};
