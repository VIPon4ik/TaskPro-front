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
        'sidebar': '#121212',
        'primary-black': '#161616',
        'secondary-black': '#232323',
        'accent-black': '#1F1F1F',
        'green': '#BEDBB0',
        'green-drk':'#a1c291',
        'disabled': '#404040',
        'disabled-drk': '#363636'
      },
      colors: {
        'primary-black': '#161616',
        'danger': '#ff8769',
        'green': '#BEDBB0',
      },
      borderColor: {
        'danger': '#ff8769',
        'green': '#BEDBB0',
        'white-zero': 'rgba(255,255,255,0.1)',
      },
      outlineColor: {
        'green': '#BEDBB0',
      },
      fill: {
        'black': '#1F1F1F',
      }
    },
  },
  plugins: [],
}

