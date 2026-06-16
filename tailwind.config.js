/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        primary: '#E8FF00',
        surface: '#111111',
        success: '#6BBF7A',
        warning: '#F4B942',
        danger: '#F25F5C',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        branding: '0.18em',
      }
    },
  },
  plugins: [],
}
