/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    fontSize: {
      sm: '0.9rem',
      sm2: '1.05rem',
      base: '1.25rem',
      l: '1.35rem',
      xl: '1.55rem',
      '2xl': '1.863rem',
      '3xl': '2.053rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '3.750rem',
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald',],
      'body': ['"Open Sans"', ],
      'logo': ['Alkatra', 'cursive'],
      'lily' : ['Lily Script One', 'cursive'],
      'ubuntu' : ['Ubuntu', 'sans-serif'],
       'bruno': ['Bruno Ace SC', 'cursive']
    },
    extend: {},
  },
  plugins: [],
}
