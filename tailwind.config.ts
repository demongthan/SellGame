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
      custom:'rgba(0, 0, 0, 0.18) 0px 6px 12px'
    },
    colors:{...colors,
      ...{
        s2blue1:"#007bff",
        s2blue2:"#2579f2",
        s2yellow1:"#f1c40f",
        s2cyan1:"#32c5d2",
        s2cyan2:"#d1ecf1",
        s2gray1:"#ccc",
        s2gray2:"#ced4da",
        s2gray3:"#2c3137",
        s2gray4:"#505050",
        s2gray5:"#1f2227",
        s2gray6:"#dee2e6",
        s2slate1:"#3f444a",
        s2slate2:"#f2f2f2",
        s2slate3:"#0c5460",
        s2red1:"#db3869",
        s2red2:"#dc3545"
      }
    }

  },
  plugins: [],
};
export default config;
