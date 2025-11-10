document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menuToggle"); // Bouton (☰ et ✖)
    const menu = document.getElementById("mobileMenu"); // Menu mobile

    if (!toggle || !menu) return console.warn("Menu introuvable !");

    // Ouverture / fermeture du menu
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        toggle.classList.toggle("active");
        menu.classList.toggle("active");
    });

    // Fermer en cliquant en dehors du menu
    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Fermer avec la touche Echap
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    // Si on dépasse 768px → menu desktop visible → réinitialisation
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) closeMenu();
    });

    function closeMenu() {
        toggle.classList.remove("active");
        menu.classList.remove("active");
    }
});
