/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        prof:'#d4d4d4',
        dash:'#fff7ed',
        bill:'#bae6fd'
      }
    },
  },
  plugins: [],
}

