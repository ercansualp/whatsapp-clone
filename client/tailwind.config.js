/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      "1440": "1440px",
      "1301": "1301px",
      "901": "901px",
      "1025": "1025px"
    },
  },
  plugins: [],
}

