/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
    maxWidth: {
      '1/3': '33%',
      '1/5': '20%'
    },
    height: {
      '1/4h': '25vh',
      '3/4h': '75vh',
    }
  },
  plugins: [],
}

