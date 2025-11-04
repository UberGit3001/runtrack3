CREATE DATABASE IF NOT EXISTS utilisateurs CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE utilisateurs;

CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL
);
INSERT INTO utilisateurs (nom, prenom, email) VALUES
('Dupont', 'Jean', 'dj@gmail.com')
, ('Martin', 'Sophie', 'marsoph@gmail.com')
, ('Bernard', 'Luc', 'bernard.luc@gmail.com');





INSERT INTO utilisateurs (nom, prenom, email) VALUES
('Durand', 'Claire', 'durand.claire@hotmail.fr'),
('Leroy', 'Paul', 'popole@free.fr'),
('Moreau', 'Julie', 'julie.marceau@gmail.com'),
('Simon', 'David', 'dvd@utlook.fr');