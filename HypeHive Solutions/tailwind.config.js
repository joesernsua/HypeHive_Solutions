/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: '1rem',
  },
  screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
  },
  colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#08111F',
      primary: '#B45309',
      secondary: '#F59E0B', 
  },
    extend: {},
  },
  plugins: [],
}
