import { Josefin_Sans, Yantramanav } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        '10p': '10%', // 10% padding
        '20p': '20%', // 20% padding
        '30p': '30%', // 30% padding
      },
      screens: {
        'smaller': '500px', // Custom screen size at 500px
        'tablet': '850px',   // Custom screen size at 768px (like md)
        'laptop': '1024px',  // Custom screen size at 1024px (like lg)
        'desktop': '1280px', // Custom screen size at 1280px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        metamorphous: ["Metamorphous", "sans-serif"],
        yantramanav: ["Yantramanav", "sans-serif"],
        josefin_sans: ["Josefin Sans", "sans-serif"],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.6s ease-in-out forwards',
        'slide-down': 'slide-down 0.6s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
