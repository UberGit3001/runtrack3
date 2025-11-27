/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.php",           // Tous les fichiers PHP à la racine
    "./inc/*.php",       // Tous les fichiers PHP dans le dossier inc
    "./**/*.php",        // Tous les fichiers PHP dans les sous-dossiers
    // Si j'ai des fichiers JS, à ajouter aussi
  ], // Ajuster en fonction de la structure de mes fichiers
  theme: {
    extend: {
      // Ici vous pouvez étendre le thème par défaut
    },
  },
  plugins: [],
}