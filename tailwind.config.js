/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#2D3142',
        'green': '#5DFDCB',
        'blue': '#48ACF0',
        'peach': '#F4B393',
        'safron': '#EEC643'
      },
      fontFamily: {
        'cedarville-cursive': ['"Cedarville Cursive"', 'cursive']
      }
    },
  },
  plugins: [],
}