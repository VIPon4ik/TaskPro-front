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
        'primary-black': '#161616',
        'secondary-black': '#232323',
        'green': '#BEDBB0'
      },
      screens: {
        'mobile': '375px'
      },
      colors: {
        'primary-black': '#161616',
        'danger': '#ff8769',
      }
    },
  },
  plugins: [],
}

