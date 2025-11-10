// On sélectionne les éléments HTML dont on a besoin
const hamburger = document.querySelector('.hamburger'); // Le bouton hamburger (☰)
const navLinks = document.querySelector('.nav-links'); // La liste des liens du menu

// ✅ Sécurité : si jamais les éléments ne sont pas trouvés → on arrête le script
if (!hamburger || !navLinks) {
    console.warn("Les éléments du menu ne sont pas trouvés !");
} else {

    // Fonction qui permet d'ouvrir/fermer le menu
    function toggleMenu() {
        // .active → fait apparaître les liens
        navLinks.classList.toggle('active');
    }

    // ✅ Lorsque l'utilisateur clique sur le bouton hamburger
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Empêche le clic de se propager au document
        toggleMenu(); // On ouvre ou ferme le menu
    });

    // ✅ Si on clique n'importe où à l'extérieur du menu → on ferme
    document.addEventListener('click', function(e) {
        const clickDansMenu = navLinks.contains(e.target);
        const clickDansBouton = hamburger.contains(e.target);

        // Si menu ouvert et qu'on clique ailleurs → fermer
        if (!clickDansMenu && !clickDansBouton && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // ✅ Si l’utilisateur appuie sur la touche "Échap" → fermer le menu
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // ✅ Si on redimensionne la fenêtre → sécurité
    window.addEventListener('resize', function() {
        // Si on est sur un écran > 767px → menu toujours visible par défaut (donc on enlève active)
        if (window.innerWidth > 767) {
            navLinks.classList.remove('active');
        }
    });
}
