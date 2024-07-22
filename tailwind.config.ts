import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    fontFamily:{
      customFont:['"Roboto Condensed"', 'sans-serif']
    },
    transitionProperty:{
      'input':'border-color, box-shadow',
      'button':'color, background-color, border-color, box-shadow'
    },
    boxShadow:{
      custom:'rgba(0, 0, 0, 0.18) 0px 6px 12px',
      custom1:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
    },
    colors:{...colors,
      ...{
        s2blue1:"#007bff",
        s2blue2:"#2579f2",
        s2blue3:"#E0EBF9",
        s2yellow1:"#f1c40f",
        s2cyan1:"#32c5d2",
        s2cyan2:"#d1ecf1",
        s2gray1:"#ccc",
        s2gray2:"#ced4da",
        s2gray7:"rgba(95,96,96, 0.2)",
        s2gray3:"#2c3137",
        s2gray4:"##a8a29e",
        s2gray5:"#1f2227",
        s2gray6:"#dee2e6",
        s2gray8:"#5F6060",
        s2slate1:"#3f444a",
        s2slate2:"#f2f2f2",
        s2slate3:"#0c5460",
        s2red1:"#db3869",
        s2red2:"#dc3545",
        s2red3:"#D03631",
        s2red4:"#FB236A",
        s2green1:"#3CB878"
      }
    }

  },
  plugins: [],
};
export default config;
