/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // tailwind.config.js
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        orangeCustom: '#ffca7a',
        blueCustom:'#51d4ff',
        violetCustom:'#dd81ff'
      },
    },
  },

}
