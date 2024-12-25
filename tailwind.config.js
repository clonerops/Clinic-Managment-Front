/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "primary": "#120078",
      "secondary": "#FD3A69",
      "violtly": "#9D0191",
      "white": "#FFFFFF",
      "grayLight": "#FBFBFB",
      "gray": "#E9E9E9",
      "grayLight1": "#F0F0F0",
      "grayLight2": "#FAFAFA",
      "black" : "#000000",
      "blackMedium" : "#707070",
      "blueLight" : "#E6EDFB",
      "green" : "#2CA87F",
      "greenLight" : "#EAF6F2",
      "yellow" : "#FECD1A",
      "yellow1" : "#DEAF03",
    },
    fontFamily: {
      "peyda-bold": "Peyda_Bold",
      "peyda-reqular": "Peyda_Reqular",
      "peyda-medium": "Peyda_Medium",
      "peyda-thin": "Peyda_Thin",
    },
    extend: {
      backgroundImage: {
        'login-pattern': "url(../../../../public/pictures/images/login-bg.png)",
      }

    },
  },
  plugins: [],
}

