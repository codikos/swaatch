module.exports = {
  important: true,
  content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
