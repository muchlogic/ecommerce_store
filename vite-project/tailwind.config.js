import { Opacity } from "@mui/icons-material";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        revealer: "reveal 5s ease 1",
        slide_in_out: "slide_in_out 5s ease 1 forwards",
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
      },
    },
    fontFamily: {
      raleway: ["Raleway"],
    },
  },
  plugins: [],
};
