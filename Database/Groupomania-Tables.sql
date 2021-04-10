DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania;
USE groupomania;

CREATE TABLE groupe (
                nom VARCHAR(200) NOT NULL,
                description TEXT,
                PRIMARY KEY (nom)
);

CREATE TABLE participation (
                id INT UNSIGNED AUTO_INCREMENT NOT NULL,
                titre VARCHAR(400) NOT NULL,
                preview TEXT,
                article TEXT,
                importance TINYINT ZEROFILL,
                createur VARCHAR(100),
                date_creation DATETIME NOT NULL,
                groupe_nom VARCHAR(200) NOT NULL,
                PRIMARY KEY (id)
);

CREATE INDEX participation_idx_groupe_titre
 ON participation (titre, groupe_nom);


CREATE TABLE departement (
                nom VARCHAR(50) NOT NULL,
                PRIMARY KEY (nom)
);

CREATE TABLE utilisateur (
                nom VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(60) NOT NULL,
                departement_nom VARCHAR(50),
                prenom VARCHAR(100) NOT NULL,
                PRIMARY KEY (email)
);

CREATE INDEX utilisateur_idx_nom_prenom
 ON utilisateur (nom, prenom);

CREATE TABLE utilisateur_participation (
                utilisateur_email VARCHAR(100) NOT NULL,
                participation_id INT UNSIGNED NOT NULL,
                admin BOOLEAN NOT NULL,
                PRIMARY KEY (utilisateur_email, participation_id)
);

CREATE TABLE utilisateur_groupe (
                utilisateur_email VARCHAR(100) NOT NULL,
                groupe_nom VARCHAR(200) NOT NULL,
                membre BOOLEAN NOT NULL,
                admin BOOLEAN NOT NULL,
                PRIMARY KEY (utilisateur_email, groupe_nom)
);

ALTER TABLE participation ADD CONSTRAINT t_participation_t_groupe_fk
FOREIGN KEY (groupe_nom)
REFERENCES groupe (nom)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE utilisateur ADD CONSTRAINT t_utilisateur_t_departement_fk
FOREIGN KEY (departement_nom)
REFERENCES departement (nom)
ON DELETE SET NULL
ON UPDATE CASCADE;

ALTER TABLE utilisateur_groupe ADD CONSTRAINT t_utilisateur_groupe_t_groupe_fk
FOREIGN KEY (groupe_nom)
REFERENCES groupe (nom)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE utilisateur_groupe ADD CONSTRAINT t_utilisateur_groupe_t_utilisateur_fk
FOREIGN KEY (utilisateur_email)
REFERENCES utilisateur (email)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE utilisateur_participation ADD CONSTRAINT t_utilisateur_participation_t_participation_fk
FOREIGN KEY (participation_id)
REFERENCES participation (id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE utilisateur_participation ADD CONSTRAINT t_utilisateur_participation_t_utilisateur_fk
FOREIGN KEY (utilisateur_email)
REFERENCES utilisateur (email)
ON DELETE CASCADE
ON UPDATE CASCADE;