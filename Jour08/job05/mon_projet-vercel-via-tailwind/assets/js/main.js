/**
 * TOUTES LES FONCTIONNALITÉS : 
 * 1. EmailJS Config & Init
 * 2. Désactivation du bouton "Envoyer" si champs vides (Live)
 * 3. Envoi du formulaire avec état "Envoi en cours..."
 * 4. Validation Regex de l'email
 * 5. Menu Mobile complet (Toggle, Icones, Liens, Clic Extérieur)
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. INITIALISATION ---
    if (typeof EMAILJS_CONFIG === 'undefined' || !EMAILJS_CONFIG.publicKey) {
        console.error('ERREUR : Configuration EmailJS non trouvée.');
        return;
    }
    
    try {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialisé');
    } catch (e) { console.error(e); }

    // --- 2. GESTION DU FORMULAIRE ET DU BOUTON ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

        // Fonction pour activer/désactiver le bouton selon le remplissage
        function toggleButtonState() {
            let isAllFilled = true;
            inputs.forEach(input => {
                if (!input.value.trim()) isAllFilled = false;
            });
            
            submitBtn.disabled = !isAllFilled;
            // Style visuel pour le bouton bloqué
            submitBtn.style.opacity = isAllFilled ? "1" : "0.5";
            submitBtn.style.cursor = isAllFilled ? "pointer" : "not-allowed";
        }

        // Écouter chaque frappe de touche dans le formulaire
        contactForm.addEventListener('input', toggleButtonState);
        
        // Lancer une vérification au départ
        toggleButtonState();

        // --- 3. ENVOI DU FORMULAIRE ---
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log('Tentative d\'envoi...');

            const formData = new FormData(this);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                message: formData.get('message'),
                to_email: EMAILJS_CONFIG.recipientEmail,
                reply_to: formData.get('email')
            };

            // Validation Email
            if (!validateEmail(templateParams.from_email)) {
                alert('Veuillez entrer un email valide');
                return;
            }

            // Changement d'état du bouton pendant l'envoi
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';

            try {
                const response = await emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    templateParams
                );
                console.log('Succès:', response);
                alert('Message envoyé avec succès !');
                contactForm.reset();
                toggleButtonState(); // On re-bloque le bouton après le reset
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue.');
            } finally {
                submitBtn.textContent = originalText;
            }
        });
    }

    // --- 4. GESTION DU MENU MOBILE ---
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

// --- 5. FONCTIONS GLOBALES ---
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==========================================================
// ==========================================================

// 1. GÉNÉRATEUR DE CAPTCHA MATHÉMATIQUE
function initCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1; // Entre 1 et 10
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '*']; 
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let result;
    if(operator === '+') result = num1 + num2;
    else result = num1 * num2; // Multiplication pour corser un peu
    
    // On affiche la question dans le HTML
    const captchaLabel = document.getElementById('captcha-label');
    if(captchaLabel) {
        captchaLabel.textContent = `Prouvez que vous êtes humain : Combien font ${num1} ${operator} ${num2} ?`;
        
        // On stocke la vraie réponse dans un attribut data (ou une variable cachée)
        // Note: En sécurité max, la vérification se fait côté serveur, mais pour l'UX c'est déjà bien.
        document.getElementById('captcha-input').dataset.correctAnswer = result;
    }
}

// 2. VÉRIFICATION DU CAPTCHA
function verifyCaptcha() {
    const input = document.getElementById('captcha-input');
    const userAnswer = parseInt(input.value);
    const correctAnswer = parseInt(input.dataset.correctAnswer);
    const step2Div = document.getElementById('step-2-email-verification');
    
    if (userAnswer === correctAnswer) {
        // Succès : On affiche la suite (le champ email et bouton code)
        input.classList.remove('border-red-500');
        input.classList.add('border-green-500');
        step2Div.classList.remove('hidden'); // On dévoile la suite
        input.disabled = true; // On fige le captcha
    } else {
        input.classList.add('border-red-500');
        alert('Calcul incorrect, réessayez !');
        initCaptcha(); // On relance un nouveau calcul
        input.value = '';
    }
}

// Lancer au chargement
document.addEventListener('DOMContentLoaded', initCaptcha);