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
      screens: {
        'mobile': '375px'
      },
      backgroundColor: {
        'primary-black': '#161616',
        'secondary-black': '#232323',
        'input-black': '#1F1F1F',
        'green': '#BEDBB0',
        'green-darker':'#abcc9b',
        'disabled': '#404040',
        'disabled-darker': '#363636'
      },
      colors: {
        'primary-black': '#161616',
        'danger': '#ff8769',
      },
      borderColor: {
        'danger': '#ff8769',
        'green': '#BEDBB0',
      },
      outlineColor: {
        'green': '#BEDBB0',
      },
    },
  },
  plugins: [],
}

