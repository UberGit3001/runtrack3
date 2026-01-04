/**
 * Fichier : assets/js/main.js
 * Rôle : Gestion du formulaire, EmailJS, Captcha Mathématique et Menu Mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. CONFIGURATION EMAILJS
    // ============================================
    if (typeof EMAILJS_CONFIG === 'undefined' || !EMAILJS_CONFIG.publicKey) {
        console.error('ERREUR : Configuration EmailJS introuvable.');
        return;
    }
    
    try {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS chargé.');
    } catch (e) { console.error(e); }

    // ============================================
    // 2. GESTION DU FORMULAIRE & CAPTCHA
    // ============================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        // On sélectionne tous les champs requis (inputs et textarea)
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        // Éléments du Captcha
        const captchaInput = document.getElementById('captcha-input');
        const captchaQuestion = document.getElementById('captcha-question');
        const captchaStatus = document.getElementById('captcha-status');
        
        // Variables d'état
        let captchaCorrectAnswer = 0;
        let isCaptchaValid = false;

        // --- A. Générer le calcul ---
        function generateCaptcha() {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 5) + 1; // Petits chiffres pour que ce soit facile
            
            // Pile ou face pour l'opération (+ ou *)
            if (Math.random() > 0.5) {
                captchaCorrectAnswer = num1 + num2;
                captchaQuestion.textContent = `Combien font ${num1} + ${num2} ?`;
            } else {
                captchaCorrectAnswer = num1 * num2;
                captchaQuestion.textContent = `Combien font ${num1} x ${num2} ?`;
            }
            
            // Reset visuel
            if(captchaInput) {
                captchaInput.value = '';
                captchaInput.classList.remove('border-green-500', 'border-red-500', 'bg-green-50');
            }
            if(captchaStatus) captchaStatus.classList.add('hidden');
            isCaptchaValid = false;
            checkGlobalValidity();
        }

        // --- B. Vérifier tout le formulaire ---
        function checkGlobalValidity() {
            let allFieldsFilled = true;
            
            // 1. Vérifier les champs classiques
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    allFieldsFilled = false;
                }
            });

            // 2. Vérifier le Captcha
            // Note : isCaptchaValid est mis à jour dans l'écouteur 'input' du captcha plus bas
            
            // 3. Activer ou Désactiver le bouton
            if (allFieldsFilled && isCaptchaValid) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-gray-400');
                submitBtn.classList.add('bg-purple-600', 'hover:bg-purple-700', 'cursor-pointer');
            } else {
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-50', 'cursor-not-allowed', 'bg-gray-400');
                submitBtn.classList.remove('bg-purple-600', 'hover:bg-purple-700', 'cursor-pointer');
            }
        }

        // --- C. Initialisation ---
        if (captchaInput) {
            generateCaptcha(); // Lance le calcul au chargement

            // Écouteur sur le champ Captcha
            captchaInput.addEventListener('input', function() {
                const userAnswer = parseInt(this.value);
                
                if (userAnswer === captchaCorrectAnswer) {
                    isCaptchaValid = true;
                    this.classList.remove('border-gray-300', 'border-red-500');
                    this.classList.add('border-green-500', 'bg-green-50');
                    
                    captchaStatus.textContent = "Correct !";
                    captchaStatus.className = "text-sm font-bold text-green-600 ml-2 animate-bounce block";
                } else {
                    isCaptchaValid = false;
                    if (this.value.length > 0) {
                        this.classList.add('border-red-500');
                        this.classList.remove('border-green-500');
                        captchaStatus.textContent = "";
                    }
                }
                checkGlobalValidity();
            });
        }

        // Écouteur sur les autres champs (Nom, Email, Message)
        inputs.forEach(input => {
            input.addEventListener('input', checkGlobalValidity);
        });

        // --- D. Envoi du Formulaire (Submit) ---
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Double sécurité : si captcha faux, on bloque
            if (!isCaptchaValid) {
                alert("Veuillez résoudre le calcul de sécurité.");
                return;
            }

            // Préparation EmailJS
            const formData = new FormData(this);
            const templateParams = {
                from_name: formData.get('name'), // Assure-toi que ton input a name="name"
                from_email: formData.get('email'),
                message: formData.get('message'),
                to_email: EMAILJS_CONFIG.recipientEmail,
                reply_to: formData.get('email')
            };

            // UI : Bouton en chargement
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

            try {
                await emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    templateParams
                );
                alert('Message envoyé avec succès !');
                contactForm.reset();
                generateCaptcha(); // On génère un nouveau calcul pour le prochain message
            } catch (error) {
                console.error('Erreur EmailJS:', error);
                alert('Une erreur est survenue lors de l\'envoi.');
            } finally {
                submitBtn.innerHTML = originalText;
                checkGlobalValidity(); // Le bouton se désactive car champs vides
            }
        });
    }

    // ============================================
    // 3. GESTION DU MENU MOBILE
    // ============================================
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        const menuIcon = mobileMenuButton.querySelector('i');

        mobileMenuButton.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            // Changement d'icône
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            } else {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            }
        });

        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                if(menuIcon) menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // fonction qui demande le code a six carateres via une API
async function demanderCodeVerification(emailUtilisateur) {
    try {
        // L'appel API (Le pont entre JS et PHP)
        // Attention au chemin : on part de la racine du site web
        const response = await fetch('api/send_code.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailUtilisateur })
        });

        const data = await response.json(); // On lit la réponse JSON du PHP

        if (data.success) {
            console.log("Code envoyé !");
            // Ici tu affiches le champ pour entrer le code
        } else {
            console.error("Erreur PHP : " + data.message);
        }

    } catch (error) {
        console.error("Erreur réseau", error);
    }
}
});