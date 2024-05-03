/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'welcome-page': 'linear-gradient(180deg, rgba(196, 196, 196, 0) 25%, #BEDBB0 92.19%)',
      },
      backgroundColor: {
        'black': '#161616',
        'green': '#BEDBB0'
      },
      screens: {
        'mobile': '375px'
      },
      colors: {
        'black': '#161616',
      }
    },
  },
  plugins: [],
}

