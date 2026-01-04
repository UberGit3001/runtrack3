/**
 * GESTION DU MENU MOBILE
 * Se lance uniquement quand le DOM est chargé
 */
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        const menuIcon = mobileMenuButton.querySelector('i');

        // Ouverture / Fermeture au clic sur le bouton
        mobileMenuButton.addEventListener('click', function (e) {
            e.stopPropagation(); // Empêche de déclencher le clic extérieur immédiatement
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('block');
            
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            } else {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            }
        });

        // Fermer quand on clique sur un lien (Navigation)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('block');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            });
        });

        // Fermer quand on clique n'importe où ailleurs sur l'écran
        document.addEventListener('click', function(event) {
            const isClickInside = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuButton.contains(event.target);
            
            if (!isClickInside && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('block');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
});
// ==========================================================
