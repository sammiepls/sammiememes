module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      body: ['Inconsolata', 'ui-monospace'],
    },
    colors: {
      purple: '#DDCCED',
      white: '#fff',
      black: '#000',
      yellow: '#FAFED1',
      coral: '#F68181',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
