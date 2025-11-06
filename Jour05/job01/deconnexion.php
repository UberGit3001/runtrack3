<?php
session_start();

// Supprime toutes les données de session
$_SESSION = [];

// Supprime le cookie de session côté client si existe
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Détruit complètement la session côté serveur
session_destroy();

// Protection UX : redirection
header("Location: index.php?logout=success");
exit;

