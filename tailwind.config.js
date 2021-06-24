module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      gray: '#aaa',
      darkgray: '#555',
      cyan: '#00d2d3',
      darkcyan: '#01a3a4',
      darkblue: '#228cdc',
      darkgreen: '#10ac84',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
