/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        richblack: {
          900: '#your-color-code-here',
        },
      },
    },
  },
  plugins: [require('tailwindcss'),
  require('autoprefixer'),],
}

