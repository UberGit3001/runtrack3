document.addEventListener("DOMContentLoaded", () => {

    const formInscription = document.getElementById("formInscription");

    if (formInscription) {
        const nom = formInscription.nom;
        const prenom = formInscription.prenom;
        const email = formInscription.email;
        const password = formInscription.password;
        const confirm = formInscription.confirm_password;

        const errNom = document.getElementById("errNom");
        const errPrenom = document.getElementById("errPrenom");
        const errEmail = document.getElementById("errEmail");
        const errPassword = document.getElementById("errPassword");
        const errConfirm = document.getElementById("errConfirm");

        let valid = {
            nom: false,
            prenom: false,
            email: false,
            password: false,
            confirm: false
        };

        function checkEmailAjax() {
            fetch("check_email.php", {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: "email=" + encodeURIComponent(email.value)
            })
            .then(res => res.text())
            .then(isAvailable => {
                if (isAvailable === "false") {
                    errEmail.textContent = "Email déjà utilisé.";
                    valid.email = false;
                } else {
                    errEmail.textContent = "";
                    valid.email = true;
                }
            });
        }

        email.addEventListener("input", () => {
            const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;            
            if (!regex.test(email.value)) {
                errEmail.textContent = "Format d'email invalide.";
                valid.email = false;
            } else {
                checkEmailAjax();
            }
        });

        password.addEventListener("input", () => {
            // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d).{8,}$/;
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!regex.test(password.value)) {
                errPassword.textContent = "8 caractères min, 1 majuscule et 1 chiffre.";
                valid.password = false;
            } else {
                errPassword.textContent = "";
                valid.password = true;
            }
        });

        confirm.addEventListener("input", () => {
            if (confirm.value !== password.value) {
                errConfirm.textContent = "Les mots de passe ne correspondent pas.";
                valid.confirm = false;
            } else {
                errConfirm.textContent = "";
                valid.confirm = true;
            }
        });

        // Bloquer le submit si une validation est fausse
        formInscription.addEventListener("submit", (e) => {
            if (!Object.values(valid).every(v => v)) {
                e.preventDefault();
                alert("Veuillez corriger les erreurs.");
            }
        });
    }
});
