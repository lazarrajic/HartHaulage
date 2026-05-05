/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#E91E8C',
          dark: '#C4167A',
        },
        charcoal: {
          black: '#0A0A0A',
          dark: '#111111',
          mid: '#1C1C1C',
          light: '#2A2A2A',
        },
        muted: '#888888',
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
