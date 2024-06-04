/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily:{
sans : "Roboto Mono, mpnospace"
    },
    extend: {
      fontSize: {
        huge: ['8rem', { lineHeight: '1' }]
      },
      height : {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        full: '100%',
        screen: '100dvh',
        svh: '100svh',
        lvh: '100lvh',
        dvh: '100dvh',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      }
    },
  },
  plugins: [],
};
