/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'button': '#74779c',
        'hover': '#585875'
      },
      fontFamily: {
        geologica: ['Geologica', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif']
      }
    },
    
  },
  plugins: [],
};
