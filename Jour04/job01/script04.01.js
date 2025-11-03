// Version simplifiée  

document.getElementById("button").addEventListener("click", () => {

    fetch("expression.txt") // On demande le fichier au serveur
        .then(response => response.text())  // On transforme la réponse en texte lisible
        .then(data => {
            document.getElementById("expression").textContent = data; // On met le texte du fichier dans le paragraphe existant
        })
        .catch(error => console.error("Erreur :", error)); // Gestion d’erreur
});
      

