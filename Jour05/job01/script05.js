// script05.01.js
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formInscription");
    if (!form) return;

    // Inputs (on utilise name="" du form)
    const inputs = {
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        password: form.password,
        confirm: form.confirm_password
    };

    // Spans message d'erreur
    const errors = {
        nom: document.getElementById("errNom"),
        prenom: document.getElementById("errPrenom"),
        email: document.getElementById("errEmail"),
        password: document.getElementById("errPassword"),
        confirm: document.getElementById("errConfirm")
    };

    // État de validation
    const valid = {
        nom: false,
        prenom: false,
        email: false,
        password: false,
        confirm: false
    };

    // Bouton submit
    const btnSubmit = form.querySelector("button[type='submit']");
    if (!btnSubmit) return;

    btnSubmit.disabled = true; // Bloqué par défaut

    // Met à jour l'état du bouton submit
    const toggleSubmit = () => {
        btnSubmit.disabled = !Object.values(valid).every(v => v);
    };

    // Validation nom
    function validateNom() {
        valid.nom = inputs.nom.value.trim().length >= 2;
        errors.nom.textContent = valid.nom ? "" : "Nom trop court (2 caractères min).";
        toggleSubmit();
    }

    // Validation prénom
    function validatePrenom() {
        valid.prenom = inputs.prenom.value.trim().length >= 2;
        errors.prenom.textContent = valid.prenom ? "" : "Prénom trop court (2 caractères min).";
        toggleSubmit();
    }

    // Validation mot de passe
    function validatePassword() {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        valid.password = regex.test(inputs.password.value);
        errors.password.textContent = valid.password ? "" : "8 caractères min, 1 majuscule et 1 chiffre.";
        // Revalider la confirmation si le mot de passe change
        validateConfirm(false); // false = ne pas toggler encore (toggle fait ensuite)
    }

    // Validation confirmation mot de passe
    // param toggle = whether to call toggleSubmit() at the end
    function validateConfirm(toggle = true) {
        valid.confirm = inputs.password.value === inputs.confirm.value && valid.password;
        errors.confirm.textContent = valid.confirm ? "" : "Les mots de passe ne correspondent pas.";
        if (toggle) toggleSubmit();
    }

    // Vérification email via AJAX (renvoie la promesse)
    function checkEmailAjax() {
        const emailVal = inputs.email.value.trim();
        // simple validation client-side rapide
        const simpleEmailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!simpleEmailRe.test(emailVal)) {
            valid.email = false;
            errors.email.textContent = "Format d'email invalide.";
            toggleSubmit();
            return Promise.resolve(); // retourne une promesse résolue
        }

        errors.email.textContent = "Vérification...";
        // IMPORTANT : return fetch pour que la promesse soit gérée correctement
        return fetch("check_email.php", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: "email=" + encodeURIComponent(emailVal)
        })
        .then(res => res.text())
        .then(isAvailable => {
            // check_email.php doit retourner strictement "true" ou "false"
            if (isAvailable.trim() === "false") {
                errors.email.textContent = "Email déjà utilisé.";
                valid.email = false;
            } else {
                errors.email.textContent = "";
                valid.email = true;
            }
            toggleSubmit();
        })
        .catch(() => {
            errors.email.textContent = "Erreur serveur lors de la vérification.";
            valid.email = false;
            toggleSubmit();
        });
    }

    // Debounce helper (pour empêcher plusieurs blur rapides — optionnel)
    function debounce(fn, wait = 300) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    // Écouteurs - validation live
    inputs.nom.addEventListener("input", validateNom);
    inputs.prenom.addEventListener("input", validatePrenom);
    inputs.password.addEventListener("input", validatePassword);
    inputs.confirm.addEventListener("input", () => validateConfirm(true));
    // Vérif email au blur — debounced si tu veux
    inputs.email.addEventListener("blur", () => checkEmailAjax());

    // Submit vérification finale
    form.addEventListener("submit", (e) => {
        // dernier check rapide côté client (sûreté)
        if (!Object.values(valid).every(v => v)) {
            e.preventDefault();
            alert("Veuillez corriger les erreurs avant de soumettre.");
            // optional: focus sur le premier champ invalide
            const firstInvalid = Object.keys(valid).find(k => !valid[k]);
            if (firstInvalid && inputs[firstInvalid]) inputs[firstInvalid].focus();
            return;
        }

        // Empêcher double soumission côté UI
        btnSubmit.textContent = "Inscription...";
        btnSubmit.disabled = true;
        // Laisse le navigateur envoyer le formulaire normalement (POST)
    });

});