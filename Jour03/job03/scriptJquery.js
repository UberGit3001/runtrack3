// Dès que le DOM est prêt (tous les éléments de la page chargés), on exécute la fonction.
// Pourquoi : s'assurer que #board, #restartBtn, etc. existent avant d'essayer de les manipuler.
$(document).ready(function () {

    // tableau représentant l'état des tuiles sur le plateau (ordre courant)
    // 1..8 = tuiles normales, 9 = case vide
    // Pourquoi : c'est la source de vérité de l'état du jeu.
    let tiles = [1,2,3,4,5,6,7,8,9];
    
    // index (0..8) où se trouve actuellement la case vide dans l'array `tiles`.
    // Pourquoi : on a besoin de savoir où est la case vide pour savoir quels mouvements sont permis.
    let emptyIndex = 8;

    // Fonction qui mélange le tableau `tiles` au hasard (Fisher-Yates).
    // Pourquoi : pour lancer une partie avec un ordre aléatoire.
    function shuffle() {
        // boucle depuis la fin vers le début
        for (let i = tiles.length - 1; i > 0; i--) {
            // choisir un index aléatoire j entre 0 et i inclus
            let j = Math.floor(Math.random() * (i + 1));
            // échanger tiles[i] et tiles[j]
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
        // mettre à jour l'index de la case vide après le mélange
        emptyIndex = tiles.indexOf(9);
    }
    
    // Fonction qui dessine (met à jour) le plateau dans le DOM à partir du tableau `tiles`.
    // Pourquoi : on réconcilie l'UI avec l'état (c'est le principe d'un render).
    function render() {
        // vider le conteneur #board avant d'ajouter les tuiles (re-render propre)
        $("#board").empty();
        
        // parcourir chaque valeur dans tiles : num = valeur (1..9), i = position actuelle (0..8)
        tiles.forEach((num, i) => {
            // créer dynamiquement une balise <img> pour la tuile
            let tile = $("<img>")
                .attr("src", "images/" + num + ".png") // source de l'image correspondant à num
                .addClass("tile");                     // classe CSS pour le style
            
            // si c'est la case vide (num === 9), on ajoute une classe pour gérer opacité/clic
            if (num === 9) tile.addClass("blank");
            
            // on associe le clic de la tuile à la fonction moveTile en transmettant l'index i
            tile.on("click", () => moveTile(i));
            // on ajoute la tuile dans le DOM
            $("#board").append(tile);
            // log pour debug : montre l'état courant du tableau tiles dans la console
        });
    }
    
    // Fonction appelée quand on clique sur une tuile : tente de déplacer la tuile si possible.
    function moveTile(index) {
        // on calcule les indices adjacents potentiels dans la logique 1D (gauche, droite, haut, bas)
        const adjacent = [index - 1, index + 1, index - 3, index + 3];
        
        // si la position de la case vide se trouve dans la liste des adjacents, on peut échanger
        if (adjacent.includes(emptyIndex)) {
            // swap : échange la valeur entre la tuile cliquée et la tuile vide
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            // mettre à jour où se trouve la case vide (nouvel index)
            emptyIndex = index;
            // re-dessiner le plateau pour refléter le nouvel état
            render();
            // vérifier si la partie est gagnée après ce mouvement
            checkWin();
        }
    }
    
    // Vérifie si l'ordre courant correspond à 1..9 => victoire
    function checkWin() {
        // every retourne true si pour chaque element tiles[i] === i+1
        let won = tiles.every((num, i) => num === i + 1);
        
        if (won) {
            // afficher le message gagnant et verrouiller les interactions
            $("#message").text(" Vous avez gagné !").css("color", "green");
            $(".tile").css("pointer-events", "none"); // empêche tout nouveau clic
        } else {
            // sinon on nettoie le message
            $("#message").text("");
            console.log(tiles);
        }
    }

    // Ré-initialiser / relancer la partie : mélange et rend à nouveau
    function restart() {
        shuffle();
        render();
        $("#message").text("").css("color", "");
        $(".tile").css("pointer-events", "auto");
    }

    // Lier le bouton 'Recommencer' à la fonction restart
    $("#restartBtn").on("click", restart);

    // Au chargement : lancer directement une partie
    restart();
});
