/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#000000',
        'secondary-black': '#121212',
        'dark-gray': '#1E1E1E',
        'accent-gray': '#2D2D2D',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A0A0',
      },
    },
  },
  plugins: [],
}