/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        violet: '#6520A8',
        violetBright: '#9A0DFE',
        violetDeep: '#35104F',
        ink: '#242027',
        paper: '#FFFFFF',
        lilac: '#F4EDF9'
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};
