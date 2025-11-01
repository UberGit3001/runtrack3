// ============================ FOOTER - COULEUR ====================================
const footer = document.querySelector("footer");

// Fonction qui met à jour la couleur selon le scroll
function updateFooterColor() {
  // Hauteur totale de la page scrollable
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Pourcentage de scroll (0 → 1)
  const scrollPercent = window.scrollY / scrollHeight;

  // On convertit en couleur (exemple : du rouge → vert)
  const red = Math.round(155 * (1 - scrollPercent));
  const green = Math.round(255 * scrollPercent);
  const blue = Math.round(255 *(scrollPercent));
  //  const blue = 0;

  footer.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

//   const gray = Math.round(255 * scrollPercent);
//   footer.style.backgroundColor = `rgb(${gray}, ${gray}, ${gray})`;

  // 0 → 360° sur la roue des couleurs (HSL)
// const hue = scrollPercent * 360;
// footer.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

}



// Événement scroll
window.addEventListener("scroll", updateFooterColor);

// Appel initial
updateFooterColor();


// ============================
// 1. On récupère la div qui sert de barre de progression
// ============================
const progress = document.getElementById("progress");



// ============================
// 2. Fonction qui met à jour la largeur de la barre
// ============================
function updateProgress() {
  // Hauteur totale scrollable de la page (page entière - hauteur fenêtre)
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Pourcentage de scroll (0 à 100)
  const scrollPercent = (window.scrollY / scrollHeight) * 100;

  // On applique ce pourcentage comme largeur de la barre
  progress.style.width = scrollPercent + "%";
}

// ============================
// 3. On écoute l'événement scroll pour mettre à jour la barre en temps réel
// ============================
window.addEventListener("scroll", updateProgress);

// ============================
// 4. On appelle la fonction une première fois au chargement
// ============================
updateProgress();
