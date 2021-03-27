DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania;
USE groupomania;

CREATE TABLE groupe (
                nom VARCHAR(100) NOT NULL,
                description TEXT,
                PRIMARY KEY (nom)
);


CREATE TABLE participation (
                id INT AUTO_INCREMENT NOT NULL,
                titre VARCHAR(200) NOT NULL,
                preview TEXT,
                article TEXT,
                importance TINYINT ZEROFILL,
                createur VARCHAR(256) NOT NULL,
                date_creation DATETIME NOT NULL,
                groupe_nom VARCHAR(100) NOT NULL,
                PRIMARY KEY (id)
);


CREATE INDEX participation_idx_groupe_titre
 ON participation (titre, groupe_nom);


CREATE TABLE departement (
                nom VARCHAR(100) NOT NULL,
                PRIMARY KEY (nom)
);


CREATE TABLE utilisateur (
                nom VARCHAR(256) NOT NULL,
                email VARCHAR(256) NOT NULL,
                password VARCHAR(60) NOT NULL,
                departement_nom VARCHAR(100) NOT NULL,
                prenom VARCHAR(256) NOT NULL,
                PRIMARY KEY (email)
);


CREATE INDEX utilisateur_idx_nom_prenom
 ON utilisateur (nom, prenom);
 

CREATE TABLE utilisateur_participant (
                utilisateur_email VARCHAR(256) NOT NULL,
                participation_id INT NOT NULL,
                admin BOOLEAN NOT NULL,
                PRIMARY KEY (utilisateur_email, participation_id)
);


CREATE TABLE commentaire (
                contenu TEXT NOT NULL,
                date_creation DATETIME NOT NULL,
                participation_id INT NOT NULL,
                utilisateur_email VARCHAR(256) NOT NULL,
                PRIMARY KEY (utilisateur_email, participation_id, date_creation)
);


CREATE TABLE utilisateur_groupe (
                utilisateur_email VARCHAR(256) NOT NULL,
                groupe_nom VARCHAR(100) NOT NULL,
                membre BOOLEAN NOT NULL,
                admin BOOLEAN NOT NULL,
                PRIMARY KEY (utilisateur_email, groupe_nom)
);


ALTER TABLE utilisateur_groupe ADD CONSTRAINT t_groupe_membre_fk
FOREIGN KEY (groupe_nom)
REFERENCES groupe (nom)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE participation ADD CONSTRAINT t_groupe_t_participation_fk
FOREIGN KEY (groupe_nom)
REFERENCES groupe (nom)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE commentaire ADD CONSTRAINT t_participation_t_commentaire_fk
FOREIGN KEY (participation_id)
REFERENCES participation (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE utilisateur_participant ADD CONSTRAINT t_participation_partcipant_fk
FOREIGN KEY (participation_id)
REFERENCES participation (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE utilisateur ADD CONSTRAINT t_departement_t_utilisateur_fk
FOREIGN KEY (departement_nom)
REFERENCES departement (nom)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE utilisateur_groupe ADD CONSTRAINT t_utilisateur_membre_fk
FOREIGN KEY (utilisateur_email)
REFERENCES utilisateur (email)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE commentaire ADD CONSTRAINT t_utilisateur_t_commentaire_fk
FOREIGN KEY (utilisateur_email)
REFERENCES utilisateur (email)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE utilisateur_participant ADD CONSTRAINT t_utilisateur_partcipant_fk
FOREIGN KEY (utilisateur_email)
REFERENCES utilisateur (email)
ON DELETE NO ACTION
ON UPDATE NO ACTION;