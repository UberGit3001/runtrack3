/**
 * Fichier : assets/js/main.js
 * Rôle : Double Authentification (Maths + Images), EmailJS, et Formulaire
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- CONFIGURATION ---
    // Liste des icônes disponibles pour le captcha visuel
    // Tu peux en ajouter d'autres si elles existent dans FontAwesome
    const CAPTCHA_ICONS = [
        { name: 'Voiture', class: 'fa-car' },
        { name: 'Maison', class: 'fa-home' },
        { name: 'Avion', class: 'fa-plane' },
        { name: 'Étoile', class: 'fa-star' },
        { name: 'Cœur', class: 'fa-heart' },
        { name: 'Clé', class: 'fa-key' },
        { name: 'Bombe', class: 'fa-bomb' },
        { name: 'Feuille', class: 'fa-leaf' }
    ];

    // --- VARIABLES D'ÉTAT ---
    let mathCaptchaValid = false;
    let imageCaptchaValid = false;
    let mathResult = 0;

    // --- ÉLÉMENTS DOM ---
    const contactForm = document.getElementById('contact-form');
    const notificationBar = document.getElementById('top-notification-bar');
    
    // Captcha Maths
    const mathInput = document.getElementById('captcha-input');
    const mathQuestion = document.getElementById('captcha-question');
    const mathStatus = document.getElementById('captcha-status');

    // Captcha Image (Modal)
    const modal = document.getElementById('image-captcha-modal');
    const modalContent = document.getElementById('captcha-modal-content');
    const targetNameSpan = document.getElementById('target-icon-name');
    const iconsGrid = document.getElementById('icons-grid');
    const imageStatus = document.getElementById('image-captcha-status');

    // Bouton Submit
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    // Si on n'est pas sur la page contact, on arrête
    if (!contactForm) return;

    // ============================================================
    // 1. INITIALISATION DU CAPTCHA MATHS
    // ============================================================
    function generateMathCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 5) + 1;
        
        if (Math.random() > 0.5) {
            mathResult = num1 + num2;
            mathQuestion.textContent = `${num1} + ${num2} = ?`;
        } else {
            mathResult = num1 * num2;
            mathQuestion.textContent = `${num1} x ${num2} = ?`;
        }
        
        // Reset des états
        mathInput.value = '';
        mathCaptchaValid = false;
        imageCaptchaValid = false; // On reset aussi l'image si on recommence
        updateSubmitButton();
    }

    // ============================================================
    // 2. GESTION DU CAPTCHA IMAGES (MODAL)
    // ============================================================
    function openImageCaptcha() {
        // Préparer le jeu
        const targetIndex = Math.floor(Math.random() * CAPTCHA_ICONS.length);
        const targetIcon = CAPTCHA_ICONS[targetIndex];
        
        // Afficher la consigne
        targetNameSpan.textContent = targetIcon.name;
        
        // Mélanger et prendre 4 icônes (dont la bonne)
        let gameIcons = [targetIcon];
        while (gameIcons.length < 4) {
            const randomIcon = CAPTCHA_ICONS[Math.floor(Math.random() * CAPTCHA_ICONS.length)];
            if (!gameIcons.includes(randomIcon)) {
                gameIcons.push(randomIcon);
            }
        }
        // Mélanger l'ordre des boutons pour ne pas que la bonne réponse soit toujours en premier
        gameIcons.sort(() => Math.random() - 0.5);

        // Générer le HTML des boutons
        iconsGrid.innerHTML = '';
        gameIcons.forEach(icon => {
            const btn = document.createElement('button');
            btn.type = 'button'; // Important pour ne pas soumettre le formulaire
            btn.className = "p-4 text-3xl bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-600 rounded-lg transition-all duration-200 border-2 border-transparent hover:border-purple-300 focus:outline-none";
            btn.innerHTML = `<i class="fas ${icon.class}"></i>`;
            
            // Clic sur une icône
            btn.addEventListener('click', () => checkImageAnswer(icon, targetIcon, btn));
            
            iconsGrid.appendChild(btn);
        });

        // Afficher la modal avec animation
        imageStatus.textContent = "";
        modal.classList.remove('hidden');
        setTimeout(() => {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
    }

    function checkImageAnswer(clickedIcon, targetIcon, btnElement) {
        if (clickedIcon.name === targetIcon.name) {
            // -- SUCCÈS --
            imageCaptchaValid = true;
            
            // UI Succès dans la modal
            btnElement.classList.add('bg-green-100', 'text-green-600', 'border-green-500');
            imageStatus.textContent = "Authentification réussie !";
            imageStatus.className = "h-6 text-sm font-bold text-green-600 animate-bounce";

            // Fermer la modal après 1 seconde
            setTimeout(() => {
                modal.classList.add('hidden');
                showNotification("Sécurité validée. Vous pouvez envoyer.", "success");
                updateSubmitButton(); // C'est ici que le bouton s'active enfin !
            }, 1000);

        } else {
            // -- ÉCHEC --
            imageCaptchaValid = false;
            btnElement.classList.add('bg-red-100', 'text-red-600', 'border-red-500', 'animate-shake');
            imageStatus.textContent = "Mauvaise icône. Essayez encore.";
            imageStatus.className = "h-6 text-sm font-bold text-red-600";
            
            // Petite punition : on reset l'animation shake après 0.5s
            setTimeout(() => btnElement.classList.remove('animate-shake'), 500);
        }
    }

    // ============================================================
    // 3. LOGIQUE GÉNÉRALE & VALIDATION
    // ============================================================
    
    // Écouteur sur le Maths Captcha
    mathInput.addEventListener('input', function() {
        const val = parseInt(this.value);
        if (val === mathResult) {
            // Si le maths est bon...
            mathCaptchaValid = true;
            this.classList.remove('border-red-500');
            this.classList.add('border-green-500', 'bg-green-50');
            mathStatus.innerHTML = '<i class="fas fa-check"></i> OK';
            mathStatus.className = "text-green-600 text-sm font-bold ml-2";

            // ... ON LANCE IMMÉDIATEMENT LA MODAL (si pas déjà validée)
            if (!imageCaptchaValid) {
                mathInput.blur(); // Enlève le focus du champ input
                openImageCaptcha();
            }

        } else {
            mathCaptchaValid = false;
            // Si l'utilisateur change sa réponse et qu'elle devient fausse, on re-verrouille tout
            imageCaptchaValid = false; 
            if (this.value.length > 0) this.classList.add('border-red-500');
            mathStatus.textContent = "";
            updateSubmitButton();
        }
    });

    // Gestion du bouton Submit
    function updateSubmitButton() {
        // On vérifie aussi que les champs texte sont remplis
        const requiredInputs = contactForm.querySelectorAll('input[required], textarea[required]');
        let fieldsFilled = true;
        requiredInputs.forEach(inp => { if(!inp.value.trim()) fieldsFilled = false; });

        // CONDITION ULTIME : Maths OK + Image OK + Champs OK
        if (mathCaptchaValid && imageCaptchaValid && fieldsFilled) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-gray-400');
            submitBtn.classList.add('bg-purple-600', 'hover:bg-purple-700', 'cursor-pointer', 'transform', 'hover:scale-105', 'transition-all');
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed', 'bg-gray-400');
            submitBtn.classList.remove('bg-purple-600', 'hover:bg-purple-700', 'cursor-pointer', 'transform', 'hover:scale-105');
        }
    }

    // Écouteur sur les autres champs pour mettre à jour le bouton
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        if (input !== mathInput) {
            input.addEventListener('input', updateSubmitButton);
        }
    });

    // ============================================================
    // 4. NOTIFICATIONS BAR (Succès / Erreur)
    // ============================================================
    function showNotification(message, type) {
        notificationBar.textContent = message;
        notificationBar.classList.remove('hidden', '-translate-y-full', 'bg-green-500', 'bg-red-500');
        
        if (type === 'success') {
            notificationBar.classList.add('bg-green-500');
        } else {
            notificationBar.classList.add('bg-red-500');
        }

        // Faire apparaître
        requestAnimationFrame(() => {
            notificationBar.classList.remove('-translate-y-full');
        });

        // Faire disparaître après 4 secondes
        setTimeout(() => {
            notificationBar.classList.add('-translate-y-full');
        }, 4000);
    }

    // ============================================================
    // 5. ENVOI FINAL (EmailJS)
    // ============================================================
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        if (!mathCaptchaValid || !imageCaptchaValid) {
            showNotification("Veuillez compléter les sécurités.", "error");
            return;
        }

        // Configuration EmailJS (reprend celle du footer)
        if (typeof EMAILJS_CONFIG === 'undefined') {
            showNotification("Erreur de configuration EmailJS", "error");
            return;
        }

        // UI Chargement
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

        try {
            await emailjs.sendForm(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                this // Envoie le formulaire directement
            );
            
            showNotification("Message envoyé avec succès !", "success");
            contactForm.reset();
            generateMathCaptcha(); // On reset tout
            
        } catch (error) {
            console.error('Erreur:', error);
            showNotification("Erreur lors de l'envoi du message.", "error");
        } finally {
            submitBtn.innerHTML = originalBtnContent;
            updateSubmitButton(); // Re-désactive le bouton
        }
    });

    // Lancer le premier captcha au chargement
    if(mathInput) generateMathCaptcha();
});