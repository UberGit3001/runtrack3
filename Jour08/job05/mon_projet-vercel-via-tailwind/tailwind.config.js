/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media", // active le mode sombre automatique
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        "seb-purple": "#6b21a8",
        "seb-dark": "#0f172a",
        "seb-gray": "#1e293b",
        "seb-light-gray": "#f3f4f6",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
