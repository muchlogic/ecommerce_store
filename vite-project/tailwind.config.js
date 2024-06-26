import { Opacity } from "@mui/icons-material";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        revealer: "reveal 5s ease 1",
        slide_in_out: "slide_in_out 5s ease 1 forwards",
        slide_left: "slide_left 25s linear infinite",
        wiggle: "wiggle 1s linear 1",
        sliding_underline: "sliding_underline 1s linear 1",
      },
      keyframes: {
        reveal: {
          "0%": { transform: "translateX(-1000px)" },
          "100%": { transform: "translateX(0)" },
        },
        slide_in_out: {
          "0%, 100%": {
            transform: "translateX(-500px)",
          },
          "40%, 80%": { transform: "translateX(0px)" },
        },
        slide_left: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        wiggle: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(10deg)",
          },
          "75%": {
            transform: "rotate(-10deg)",
          },
        },
        sliding_underline: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
    fontFamily: {
      raleway: ["Raleway"],
    },
  },
  plugins: [],
};
