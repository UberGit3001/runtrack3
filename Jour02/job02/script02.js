// Fonction permettant d'afficher ou cacher la citation
function showhide() {

  // récupèrer l'élément citation
  let citation = document.getElementById("citation");

  // récupèrer aussi le bouton pour changer son texte
  let button = document.getElementById("button");

  // récupèrer le style réel de l'élément (pas seulement le style inline)
  let style = getComputedStyle(citation).display;

  // Si la citation est cachée on l'affiche
  if (style === "none") {
    citation.style.display = "block";
    button.textContent = "Cacher la citation";
  }
  // Sinon on la cache
  else {
    citation.style.display = "none";
    button.textContent = "Afficher la citation";
  }
}
