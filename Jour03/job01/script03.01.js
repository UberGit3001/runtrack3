// On sélectionne les éléments du DOM
const btnShow = document.getElementById("btn-show");
const btnHide = document.getElementById("btn-hide");
const citation = document.getElementById("citation");

// Bouton pour afficher la phrase
btnShow.addEventListener("click", () => {
  citation.style.display = "block";
});

// Bouton pour cacher la phrase
btnHide.addEventListener("click", () => {
  citation.style.display = "none";
});
