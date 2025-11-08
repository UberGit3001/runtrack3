<?php
session_start();
require_once 'databases.php';

// Génération Token
if (empty($_SESSION['csrf_token_connexion'])) {
    $_SESSION['csrf_token_connexion'] = bin2hex(random_bytes(32));
}

$message = "";

// Envoi du formulaire
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

     // Vérifier Token CSRF
    if (!isset($_POST['csrf_token']) ||
        !hash_equals($_SESSION['csrf_token_connexion'], $_POST['csrf_token'])) {
        $message = "<p class='alert error'> Sécurité CSRF !</p>";
    } else {

    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, hash: $user['password'])) {

        unset($_SESSION['csrf_token_connexion']); // Régénérer après usage

        $_SESSION['id'] = $user['id'];
        $_SESSION['prenom'] = $user['prenom'];

        $_SESSION['csrf_token'] =  $user['password'];

        header("Location: index.php");
        exit;
    } else {
        $message = "Email ou mot de passe incorrect.";
    }

}
if (isset($_GET["inscription"]) && $_GET["inscription"] === "success") {
    $message = "<p class='alert success'> Compte créé, connectez-vous</p>";
}
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<viewport content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="form.css">
<!-- <link rel="stylesheet" href="style-err.css"> -->
<link rel="stylesheet" href="style.css">
<!-- <script src="./script05.01.js" defer></script> -->
<script src="./script05.js" defer></script>

<title>Connexion</title>
</head>
<body>
<div class="form-container">
<h2>Connexion</h2>
<!-- <p style="color:red;"><?= htmlspecialchars($message) ?></p> -->
 <!-- Remplacer inline style par une classe -->
<p class="error" role="alert" aria-live="assertive">
  <?= htmlspecialchars($message) ?>
</p>


<form id="formConnexion" method="POST" action="">
    <input type="email" name="email" placeholder="Email" required>
    <p id="errEmailConnexion" class="error"></p>

    <input type="password" name="password" placeholder="Mot de passe" required>
    <p id="errPasswordConnexion" class="error"></p>

     <!--  Token CSRF -->
    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token_connexion']) ?>">

    <button type="submit">Se connecter</button>
</form>
    <p style="text-align:center;margin-top:10px;">
        Pas encore inscrit&nbsp;?&nbsp;&nbsp;<a href="inscription.php">Créer un compte</a>
    </p>
</div>

</body>
</html>
