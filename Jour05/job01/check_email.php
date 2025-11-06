<?php
require_once 'databases.php';

$email = $_POST['email'] ?? '';

$stmt = $pdo->prepare("SELECT id FROM utilisateurs WHERE email = ?");
$stmt->execute([$email]);

echo $stmt->rowCount() > 0 ? "false" : "true";
