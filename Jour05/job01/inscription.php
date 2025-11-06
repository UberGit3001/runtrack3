<?php
session_start();
require_once 'databases.php'; // fichier connexion sécurisé

// Génération token CSRF
if (empty($_SESSION['csrf_token_inscription'])) {
    $_SESSION['csrf_token_inscription'] = bin2hex(random_bytes(32));
}

// Soumission
$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Vérification CSRF obligatoire
    if (!isset($_POST['csrf_token']) ||
        !hash_equals($_SESSION['csrf_token_inscription'], $_POST['csrf_token'])) {
        $message = "<p class='alert error'> Sécurité CSRF !</p>";
    } else {

        $nom = trim($_POST["nom"]);
        $prenom = trim($_POST["prenom"]);
        $email = trim($_POST["email"]);
        $password = $_POST["password"];
        $confirm_password = $_POST["confirm_password"];

        // Validation des mots de passe
        if ($password !== $confirm_password) {
            $message = "<p class='alert error'>Les mots de passe ne correspondent pas !</p>";
        } 
        // Validation de la force du mot de passe
        elseif (strlen($password) < 8) {
            $message = "<p class='alert error'>Le mot de passe doit contenir au moins 8 caractères !</p>";
        }
        else {
            $password = password_hash($password, PASSWORD_ARGON2ID);

            // Vérifier email unique
            $check = $pdo->prepare("SELECT id FROM utilisateurs WHERE email = ?");
            $check->execute([$email]);

            if ($check->rowCount() > 0) {
                $message = "<p class='alert error'>Email déjà utilisé !</p>";
            } else {
                // Préparation de la requête d'insertion
                $stmt = $pdo->prepare("INSERT INTO utilisateurs (nom,prenom,email,password) VALUES (?,?,?,?)");
                
                // Exécution de la requête
                if ($stmt->execute([$nom, $prenom, $email, $password])) {
                    unset($_SESSION['csrf_token_inscription']); //  Régénérer après usage
                    header("Location: connexion.php?register=success");
                    exit;
                } else {
                    $message = "<p class='alert error'>Erreur interne</p>";
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Inscription</title>
<link rel="stylesheet" href="style.css">
<!-- <link rel="stylesheet" href="form.css"> -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<script src="script05.01.js" defer></script>
</head>

<body>
<div class="form-container">
    <h2>Créer un compte</h2>

    <?= $message ?>

    <form method="POST">

        <input type="text" name="nom" placeholder="Nom" required>
        <input type="text" name="prenom" placeholder="Prénom" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Mot de passe" required>
        <span id="errPassword" class="error-message"></span>
        <input type="password" name="confirm_password" placeholder="Confirmer le mot de passe" required>
        <span id="errConfirm" class="error-message"></span>

        <!-- Token CSRF -->
        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token_inscription']; ?>">

        <button type="submit">S'inscrire</button>
    </form>

    <p style="text-align:center;margin-top:10px;">
        Déjà un compte ? <a href="connexion.php">Connexion</a>
    </p>
</div>
</body>
</html>