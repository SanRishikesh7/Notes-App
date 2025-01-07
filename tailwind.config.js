// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#000000',
          component: '#282828',
        }
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
}