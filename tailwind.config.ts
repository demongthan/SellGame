import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily:{
      customFont:['"Roboto Condensed"', 'sans-serif']
    },
    transitionProperty:{
      'input':'border-color, box-shadow',
    },
    boxShadow:{
      custom:'rgba(0, 0, 0, 0.18) 0px 6px 12px'
    },
    colors:{
      black:"#000000",
      white:"#fff",
      yellow:{
        450:"#f1c40f"
      },
      blue:{
        650:"#007bff",
        750:"#2579f2"
      },
      cyan:{
        450:"#32c5d2"
      },
      gray:{
        250:"#ccc",
        350:"#ced4da",
        750:"#2c3137",
        760:"#505050",
        850:"#1f2227"
      },
      slate:{
        450:"#3f444a",
        150:"#f2f2f2",
      },
      red:{
        750:"#db3869",
        650:"#dc3545"
      }
    }

  },
  plugins: [],

};
export default config;
