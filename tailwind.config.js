/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'button': '#74779c',
        'hover': '#585875',
        'light-indigo': '#F0F1F5',
        'border': '#D8DBE5',
        'red-button':'#A72828',
        'red-button-text':'#FFF1F1',
	      'red-button-hover':'#D24242',
        'title':'#292929',
        'input-text':'#989898',
        'input-border':'#DCDCDC',
        'modal-text': '#464646'

      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        geologica: ['Geologica', 'sans-serif'],        
      },
      fontSize:{
        xs: ['0.625rem', '0.75rem'],
        sm: ['0.75rem', '0.875rem'],
        md: ['0.875rem', '1rem']
      },
      fontWeight:{
        light:300,
        normal:400,
        medium:500,
        semibold:600,
        bold:700,
      }
    },
    
  },
  plugins: [],
};
