/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        creepster: ['Creepster', 'system-ui']
      },
      colors: {
        blue: { custom: '#202329' },
        yellow: { custom: '#BFDE42' },
        red: { custom: '#A1140A' },
        green: { custom: '#08C952' }
      }
    }
  },
  plugins: []
}
