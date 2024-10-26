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
    },
  },
  plugins: [],
};
export default config;
