/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        revealer: "reveal 3s ease-out 1",
      },
      keyframes: {
        reveal: {
          "0%": { width: "0px" },
          "100%": { width: "1000px" },
        },
      },
    },
    fontFamily: {
      raleway: ["Raleway"],
    },
  },
  plugins: [],
};
