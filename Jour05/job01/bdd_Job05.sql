CREATE DATABASE IF NOT EXISTS utilisateurs2 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE utilisateurs2;

CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR (255) NOT NULL
);
INSERT INTO utilisateurs (nom, prenom, email, PASSWORD) VALUES
('Dupont', 'Jean', 'dj@gmail.com','12345678')
, ('Martin', 'Sophie', 'marsoph@gmail.com', '12345678')
, ('Bernard', 'Luc', 'bernard.luc@gmail.com','12345678');





INSERT INTO utilisateurs (nom, prenom, email, PASSWORD) VALUES
('Durand', 'Claire', 'durand.claire@hotmail.fr', '12345678'),
('Leroy', 'Paul', 'popole@free.fr', '12345678'),
('Moreau', 'Julie', 'julie.marceau@gmail.com', '12345678'),
('Simon', 'David', 'dvd@utlook.fr', '12345678');