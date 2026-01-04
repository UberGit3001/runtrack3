<?php
// api/send_code.php
require_once '../config/config.php'; // Ta connexion BDD

header('Content-Type: application/json');

// 1. Récupérer l'email
$data = json_decode(file_get_contents('php://input'), true);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email invalide']);
    exit;
}

// 2. Générer un code alphanumérique aléatoire de 6 caractères
// On évite les caractères qui se ressemblent (0/O, 1/I/l)
$chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
$code = substr(str_shuffle(str_repeat($chars, 3)), 0, 6);

// 3. Stocker en BDD
try {
    // On nettoie les vieux codes de cet email
    $pdo->prepare("DELETE FROM verification_codes WHERE user_email = ?")->execute([$email]);
    
    // On insère le nouveau (valide 15 minutes)
    $stmt = $pdo->prepare("INSERT INTO verification_codes (user_email, code, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))");
    $stmt->execute([$email, $code]);
    
    // 4. Envoyer l'email (Ici on peux utiliser EmailJS côté front OU mail() PHP)
    // Pour la sécurité, c'est mieux d'envoyer via PHP ici.
    $subject = "Votre code de validation Portfolio";
    $message = "Votre code de sécurité est : " . $code;
    // mail($email, $subject, $message); // à Décommenter sur un vrai serveur

    echo json_encode(['success' => true, 'message' => 'Code généré (Simulation: ' . $code . ')']); // En dev, on renvoie le code pour tester

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur serveur']);
}
?>