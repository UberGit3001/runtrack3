 // Création de la fonction d'incrémentation
    function addone() {
      // Récupèrer l'élément compteur
      let compteur = document.getElementById("compteur");

      // Convertit son contenu en ajoutant 1 à sa valeur actuelle
      compteur.textContent = parseInt(compteur.textContent) + 1;
      console.log(compteur.textContent);
    }
    
    // Ajout de l'écouteur sur le bouton (au lieu de l’utilisation de onclick dans le HTML)
    document.getElementById("button").addEventListener("click", addone);