/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Ajustá esto según tu estructura
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            dark: "#132A13",
            forest: "#31572C",
            olive: "#4F772D",
            lime: "#90A955",
            cream: "#ECF39E",
          },
        },
      },
    },
    plugins: [],
  }
  