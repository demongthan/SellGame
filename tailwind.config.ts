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
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        "1p": "1%",
        "2p": "2%",
        "3p": "3%",
        "4p": "4%",
        "5p": "5%",
        "6p": "6%",
        "7p": "7%",
        "8p": "8%",
        "9p": "9%",
        "10p": "10%",
        "11p": "11%",
        "12p": "12%",
        "13p": "13%",
        "14p": "14%",
        "15p": "15%",
        "16p": "16%",
        "17p": "17%",
        "18p": "18%",
        "19p": "19%",
        "20p": "20%",
        "21p": "21%",
        "22p": "22%",
        "23p": "23%",
        "24p": "24%",
        "25p": "25%",
        "26p": "26%",
        "27p": "27%",
        "28p": "28%",
        "29p": "29%",
        "30p": "30%",
        "31p": "31%",
        "32p": "32%",
        "33p": "33%",
        "34p": "34%",
        "35p": "35%",
        "36p": "36%",
        "37p": "37%",
        "38p": "38%",
        "39p": "39%",
        "40p": "40%",
        "41p": "41%",
        "42p": "42%",
        "43p": "43%",
        "44p": "44%",
        "45p": "45%",
        "46p": "46%",
        "47p": "47%",
        "48p": "48%",
        "49p": "49%",
        "50p": "50%",
        "51p": "51%",
        "52p": "52%",
        "53p": "53%",
        "54p": "54%",
        "55p": "55%",
        "56p": "56%",
        "57p": "57%",
        "58p": "58%",
        "59p": "59%",
        "60p": "60%",
        "61p": "61%",
        "62p": "62%",
        "63p": "63%",
        "64p": "64%",
        "65p": "65%",
        "66p": "66%",
        "67p": "67%",
        "68p": "68%",
        "69p": "69%",
        "70p": "70%",
        "71p": "71%",
        "72p": "72%",
        "73p": "73%",
        "74p": "74%",
        "75p": "75%",
        "76p": "76%",
        "77p": "77%",
        "78p": "78%",
        "79p": "79%",
        "80p": "80%",
        "81p": "81%",
        "82p": "82%",
        "83p": "83%",
        "84p": "84%",
        "85p": "85%",
        "86p": "86%",
        "87p": "87%",
        "88p": "88%",
        "89p": "89%",
        "90p": "90%",
        "91p": "91%",
        "92p": "92%",
        "93p": "93%",
        "94p": "94%",
        "95p": "95%",
        "96p": "96%",
        "97p": "97%",
        "98p": "98%",
        "99p": "99%",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        primary: "20px",
      },
      transitionProperty:{
        'input':'border-color, box-shadow',
        'button':'color, background-color, border-color, box-shadow'
      },
    },
    
    boxShadow:{
      custom:'rgba(0, 0, 0, 0.18) 0px 6px 12px',
      custom1:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
    },
    screens: {
      sm: "576px",
      "sm-max": { max: "576px" },
      md: "768px",
      "md-max": { max: "768px" },
      lg: "992px",
      "lg-max": { max: "992px" },
      xl: "1200px",
      "xl-max": { max: "1200px" },
      "2xl": "1320px",
      "2xl-max": { max: "1320px" },
      "3xl": "1600px",
      "3xl-max": { max: "1600px" },
      "4xl": "1850px",
      "4xl-max": { max: "1850px" },
    },
    colors:{...colors,
      ...{
        s2blue1:"#007bff",
        s2blue2:"#2579f2",
        s2blue3:"#E0EBF9",
        s2yellow1:"#f1c40f",
        s2cyan1:"#32c5d2",
        s2cyan2:"#d1ecf1",
        s2cyan3: "rgba(209,239,241, 0.7)",
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
        s2green1:"#3CB878",
        lightPrimary: "#F4F7FE",
        model: "rgba(0, 0, 0, 0.5)",
        navy: {
          50: "#d0dcfb",
          100: "#aac0fe",
          200: "#a3b9f8",
          300: "#728fea",
          400: "#3652ba",
          500: "#1b3bbb",
          600: "#24388a",
          700: "#1B254B",
          800: "#111c44",
          900: "#0b1437",
        },
        brand: {
          50: "#E9E3FF",
          100: "#C0B8FE",
          200: "#A195FD",
          300: "#8171FC",
          400: "#7551FF",
          500: "#422AFB",
          600: "#3311DB",
          700: "#2111A5",
          800: "#190793",
          900: "#11047A",
        }
      }
    }

  },
  plugins: [],
};
export default config;
