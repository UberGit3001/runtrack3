<?php
session_start();
require_once 'databases.php';
?>

<?php if (isset($_GET['logout']) && $_GET['logout'] === 'success'): ?>
    <p class="logout-success">Vous êtes bien déconnecté. À bientôt </p>
<?php endif; ?>


<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta viewport="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="style.css">
<script src="script05.01.js" defer></script>
<title>Accueil</title>
</head>
<body>

<h2>

    <?php if (isset($_SESSION['prenom'])): ?>
    <p> Bonjour <?= htmlspecialchars($_SESSION['prenom']) ?></p> 
    <a href="deconnexion.php">Déconnexion</a>
    <?php else: ?>
        <a href="inscription.php">Inscription</a> |
        <a href="connexion.php">Connexion</a>
    <?php endif; ?>

</h2>
</body>
</html>





