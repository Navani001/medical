/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gr: '#E3E3E3',
        p_green:"#007965"
      },
     
    },
  },
  plugins: [],
}