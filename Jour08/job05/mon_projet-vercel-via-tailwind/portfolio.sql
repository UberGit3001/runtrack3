-- Création de la base
CREATE DATABASE IF NOT EXISTS portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio;

-- 1. TABLE DES RÔLES (Pour définir les permissions)
-- Ex: 1=Admin (Toi), 2=Recruteur (Accès CV), 3=Client (Accès Devis/Projets en cours)
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- 'admin', 'recruiter', 'client'
    permissions JSON DEFAULT NULL -- Stocke ce qu'ils ont le droit de faire ex: {"download_cv": true}
);

-- Insérer les rôles de base
INSERT INTO roles (name) VALUES ('admin'), ('recruiter'), ('client') ON DUPLICATE KEY UPDATE name=name;

-- 2. TABLE DES UTILISATEURS / INVITÉS
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    pseudo VARCHAR(100),
    role_id INT DEFAULT 2, -- Par défaut 'recruiter'
    is_verified TINYINT(1) DEFAULT 0, -- 0 = email non confirmé, 1 = confirmé
    ip_address VARCHAR(45), -- Pour bannir si besoin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- 3. TABLE DES CODES DE VÉRIFICATION (Le code à 6 chiffres)
CREATE TABLE IF NOT EXISTS verification_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(150) NOT NULL,
    code VARCHAR(6) NOT NULL, -- Ex: 'A7B2X9'
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLE DES LOGS (Traçabilité : Qui a téléchargé quoi ?)
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255) NOT NULL, -- Ex: 'DOWNLOAD_CV', 'VIEW_PROJECT_X'
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 5. TABLE DES CONTACTS (Messages)
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL, -- Optionnel : rempli seulement si le mec est connecté
    name VARCHAR(100) NOT NULL, -- Obligatoire pour les anonymes
    email VARCHAR(150) NOT NULL, -- Obligatoire pour les anonymes
    message TEXT NOT NULL,
    status ENUM('nouveau', 'lu', 'archivé') DEFAULT 'nouveau',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);