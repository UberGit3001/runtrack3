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

  // Pourcentage de scroll (0 → 100)
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
