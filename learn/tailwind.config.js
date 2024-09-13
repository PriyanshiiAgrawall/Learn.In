/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        'richblack-800': '#0A0B0D',
        'richblack-5': '#F1F2F3',
        'richblack-900': '#CCCCCC',
        'richblack-700': '#101114',
        'richblack-400': '#2C2E33',
      },
    },
  },
  plugins: [require('tailwindcss'),
  require('autoprefixer'),],
}

