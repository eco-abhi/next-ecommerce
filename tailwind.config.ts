import { Josefin_Sans, Yantramanav } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          body: '#E7EAED',
          nav: '#242c3d',
          navFixed: "#FFFFFF",
          topBar: "#FFFFFF",
          gray: '#EFF0ED'
        },
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
        },
        'text-color': {
          primary: '#2F4858',
          higlighted: '#508334'
        }
      },
      padding: {
        '10p': '10%',
        '20p': '20%',
        '30p': '30%'
      },
      screens: {
        smaller: '500px',
        tablet: '850px',
        laptop: '1024px',
        desktop: '1280px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        josefin_sans: ["Josefin Sans", "sans-serif"],
        geograph: ["Geograph", "sans-serif"]
      },
      keyframes: {
        'slide-up': {
          '0%': {
            transform: 'translateY(100%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },
        'slide-down': {
          '0%': {
            transform: 'translateY(0)'
          },
          '100%': {
            transform: 'translateY(100%)'
          }
        },
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'slide-up': 'slide-up 0.6s ease-in-out forwards',
        'slide-down': 'slide-down 0.6s ease-in-out forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
