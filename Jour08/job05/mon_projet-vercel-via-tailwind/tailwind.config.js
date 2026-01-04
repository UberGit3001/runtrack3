/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.php",           // Tous les fichiers PHP à la racine
    "./inc/*.php",       // Tous les fichiers PHP dans le dossier inc
    "./**/*.php",        // Tous les fichiers PHP dans les sous-dossiers
    "./**/*.html",
    "./**/*.js",         // Si j'ai des fichiers JS, à ajouter aussi
  ], // Ajuster en fonction de la structure de mes fichiers
// tailwind.config.js

  theme: {
    extend: {

      boxShadow: {
        // Vous pouvez étendre les ombres pour inclure des couleurs personnalisées
        'purple-lg': '0 10px 15px -3px rgba(147, 51, 234, 0.3)',
        'purple-xl': '0 20px 25px -5px rgba(147, 51, 234, 0.4)',
      },

      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
  
// npx tailwind init --full